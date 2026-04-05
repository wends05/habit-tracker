package habits

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type EffortLevel string

const (
	EffortLevelLow    EffortLevel = "low"
	EffortLevelMedium EffortLevel = "medium"
	EffortLevelHigh   EffortLevel = "high"
)

// Base Habit
type Habit struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID      primitive.ObjectID `bson:"user_id" json:"user_id"`
	Name        string             `bson:"name" json:"name"`
	Color       string             `bson:"color" json:"color"`
	EffortLevel EffortLevel        `bson:"effort_level" json:"effort_level"`
	Category    string             `bson:"category" json:"category"`
	CreatedAt   time.Time          `bson:"created_at"      json:"createdAt"`
	UpdatedAt   time.Time          `bson:"updated_at"      json:"updatedAt"`
}

// Get Habits API
type GetHabitsOutput struct {
	Habits []Habit `json:"habits"`
}

type GetHabitOutput struct {
	Habit Habit `json:"habit"`
}

// Create Habit API
type CreateHabitInput struct {
	Name        string      `bson:"name" json:"name"`
	EffortLevel EffortLevel `bson:"effort_level" json:"effort_level"`
	Color       string      `bson:"color, omitempty" json:"color"`
	Category    string      `bson:"category" json:"category"`
}
type CreateHabitOutput struct {
	Habit Habit `json:"habit"`
}

// Update Habit API
type UpdateHabitInput struct {
	Name        *string      `bson:"name,omitempty" json:"name,omitempty"`
	EffortLevel *EffortLevel `bson:"effort_level,omitempty" json:"effort_level,omitempty"`
	Color       *string      `bson:"color,omitempty" json:"color,omitempty"`
	Category    *string      `bson:"category,omitempty" json:"category,omitempty"`
}
type UpdateHabitOutput struct {
	Habit Habit `json:"habit"`
}

// Delete Habit API
type DeleteHabitOutput struct {
	Message string `json:"message"`
}

// ---
// Helpers
// ---

func (e EffortLevel) IsValid() bool {
	switch e {
	case EffortLevelLow, EffortLevelMedium, EffortLevelHigh:
		return true
	default:
		return false
	}
}
