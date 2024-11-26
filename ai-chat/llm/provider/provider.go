package provider

import (
	"context"
	_ "embed"
	"fmt"
	"math/rand/v2"
	"strconv"
	"strings"
	"time"

	"github.com/cockroachdb/errors"

	botdb "encore.app/bot/db"
	chatdb "encore.app/chat/service/db"
	"encore.dev/pubsub"
	"encore.dev/rlog"
	"encore.dev/types/uuid"
)

type BotMessageType string

const (
	BotMessageTypeText   BotMessageType = "text"
	BotMessageTypeTyping BotMessageType = "typing"
)

// BotMessage is a response generated for a bot by the LLM.
type BotMessage struct {
	Bot     uuid.UUID
	Content string
	Time    time.Time
	Type    BotMessageType
}

type ContinueChatResponse struct {
	TaskID string
}

// ChatRequest is a request to the LLM to process the conversations in a chat channel
type ChatRequest struct {
	Bots      []*botdb.Bot
	Users     []*chatdb.User
	Messages  []*chatdb.Message
	Channel   *chatdb.Channel
	SystemMsg string
	Provider  string
	Type      TaskType

	// Cached maps to avoid repeated lookups
	botsByID   map[uuid.UUID]*botdb.Bot
	botsByName map[string]*botdb.Bot
	usersByID  map[uuid.UUID]*chatdb.User
	buffer     strings.Builder
}

var unknownUser = &chatdb.User{
	Name: "Unknown User",
}

func (req *ChatRequest) Format(msg *chatdb.Message) string {
	// Admin messages should not be formated
	if msg.AuthorID == uuid.Nil {
		return fmt.Sprintf("Admin: %s", msg.Content)
	}
	user, bot := req.UserForMessage(msg)
	name := user.Name
	if bot != nil {
		name = bot.Name
	}
	return fmt.Sprintf("%s %s/%s: %s", msg.Timestamp.Format("01-02 15:04"), req.Channel.Name, name, msg.Content)
}

// FromBot returns true if the message was sent by a bot.
func (req *ChatRequest) FromBot(msg *chatdb.Message) bool {
	_, bot := req.UserForMessage(msg)
	return bot != nil
}

// UserForMessage returns the user and bot associated with a message.
func (req *ChatRequest) UserForMessage(msg *chatdb.Message) (*chatdb.User, *botdb.Bot) {
	user, ok := req.UsersByID()[msg.AuthorID]
	if !ok {
		return unknownUser, nil
	}
	if user.BotID == nil {
		return user, nil
	}
	bot, ok := req.BotsByID()[*user.BotID]
	if !ok {
		return user, nil
	}
	return user, bot
}

// BotsByID returns a map of bots by ID and caches the result.
func (req *ChatRequest) BotsByID() map[uuid.UUID]*botdb.Bot {
	if req.botsByID != nil {
		return req.botsByID
	}
	req.botsByID = make(map[uuid.UUID]*botdb.Bot)
	for _, b := range req.Bots {
		req.botsByID[b.ID] = b
	}
	return req.botsByID
}
func (req *ChatRequest) BotsByName() map[string]*botdb.Bot {
	if req.botsByName != nil {
		return req.botsByName
	}
	req.botsByName = make(map[string]*botdb.Bot)
	for _, b := range req.Bots {
		req.botsByName[strings.ToLower(b.Name)] = b
	}
	return req.botsByName
}

// UsersByID returns a map of users by ID and caches the result.
func (req *ChatRequest) UsersByID() map[uuid.UUID]*chatdb.User {
	if req.usersByID != nil {
		return req.usersByID
	}
	req.usersByID = make(map[uuid.UUID]*chatdb.User)
	for _, u := range req.Users {
		req.usersByID[u.ID] = u
	}
	return req.usersByID
}

// LLMMessageTopic is a topic for messages generated by the LLM providers.
//
// This uses Encore's pubsub package, learn more: https://encore.dev/docs/go/primitives/pubsub
var LLMMessageTopic = pubsub.NewTopic[*BotResponse]("llm-messages", pubsub.TopicConfig{
	DeliveryGuarantee: pubsub.AtLeastOnce,
})

type BotResponse struct {
	TaskType TaskType
	Channel  *chatdb.Channel
	Messages []*BotMessage
}

type TaskType string

const (
	TaskTypeJoin        TaskType = "join"
	TaskTypeLeave       TaskType = "leave"
	TaskTypeContinue    TaskType = "continue"
	TaskTypeInstruct    TaskType = "instruct"
	TaskTypePrepopulate TaskType = "prepopulate"
)

func (s *ChatRequest) Write(ctx context.Context, p string) (err error) {
	lines := strings.Split(p, "\n")
	for i, line := range lines {
		if i == len(lines)-1 {
			s.buffer.WriteString(line)
			continue
		}
		if s.buffer.Len() > 0 {
			line = s.buffer.String() + line
			s.buffer.Reset()
		}
		if err = s.processLine(ctx, line); err != nil {
			return errors.Wrap(err, "process line")
		}
	}
	return nil
}

func (s *ChatRequest) processLine(ctx context.Context, line string) error {
	line = strings.TrimSpace(line)
	// skip start of code block
	if line == "```" {
		return nil
	}
	author, msg, ok := strings.Cut(line, ":")
	if !ok {
		rlog.Warn("invalid line", "line", line)
		return nil
	}
	botParts := strings.Split(author, "/")
	botID := strings.ToLower(botParts[len(botParts)-1])
	if botID == "none" {
		return nil
	}
	botIx, err := strconv.ParseInt(strings.TrimSpace(botID), 10, 64)
	if err != nil || botIx < 0 || int(botIx) >= len(s.Bots) {
		rlog.Warn("parse bot ID", "error", err, "botID", botID)
		return nil
	}

	unMsg, err := strconv.Unquote(strings.TrimSpace(msg))
	if err != nil {
		rlog.Warn("unquote message", "error", err, "msg", msg)
	} else {
		msg = unMsg
	}
	// Simulate the bot reading
	time.Sleep(time.Duration(1000+rand.IntN(2000)) * time.Millisecond)
	_, err = LLMMessageTopic.Publish(ctx, &BotResponse{
		TaskType: s.Type,
		Channel:  s.Channel,
		Messages: []*BotMessage{{
			Bot:     s.Bots[botIx].ID,
			Content: msg,
			Time:    time.Now(),
			Type:    BotMessageTypeTyping,
		}},
	})
	// Simulate the bot typing
	randBackoff := time.Duration(rand.IntN(1000)) * time.Millisecond
	time.Sleep(randBackoff + time.Duration(len(msg)*40)*time.Millisecond)
	rlog.Info("message", "content", msg)
	_, err = LLMMessageTopic.Publish(ctx, &BotResponse{
		TaskType: s.Type,
		Channel:  s.Channel,
		Messages: []*BotMessage{{
			Bot:     s.Bots[botIx].ID,
			Content: msg,
			Time:    time.Now(),
			Type:    BotMessageTypeText,
		}},
	})
	if err != nil {
		rlog.Warn("publish message", "error", err)
	}
	return nil
}
