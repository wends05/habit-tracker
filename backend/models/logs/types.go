package logs

import (
	"time"
	"wends05/habit-tracker/backend/models/habits"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type HabitSnapshot struct {
	Name        string             `bson:"name" json:"name"`
	EffortLevel habits.EffortLevel `bson:"effort_level" json:"effort_level"`
	Category    string             `bson:"category" json:"category"`
}

// Base HabitLog
type HabitLog struct {
	ID      primitive.ObjectID `bson:"_id, omitempty" json:"_id"`
	HabitID primitive.ObjectID `bson:"habit_id, omitempty" json:"habit_id"`
	UserID  primitive.ObjectID `bson:"user_id, omitempty" json:"user_id"`

	LoggedDate    time.Time     `bson:"logged_date" json:"logged_date"`
	Completed     bool          `bson:"completed" json:"completed"`
	Note          string        `bson:"note, omitempty" json:"note"`
	HabitSnapshot HabitSnapshot `bson:"habit_snapshot" json:"habit_snapshot"`
	CreatedAt     time.Time     `bson:"created_at" json:"created_at"`
}

// Create Habit Log API
type CreateHabitLogInput struct {
	HabitID    primitive.ObjectID `bson:"habit_id" json:"habit_id"`
	LoggedDate time.Time          `bson:"logged_date" json:"logged_date"`
	Completed  bool               `bson:"completed" json:"completed"`
	Note       string             `bson:"note,omitempty" json:"note,omitempty"`
}
