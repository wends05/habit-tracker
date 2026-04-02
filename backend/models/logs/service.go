package logs

import (
	"context"
	"fmt"
	"time"
	"wends05/habit-tracker/backend/models/habits"
	"wends05/habit-tracker/backend/shared/db"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// --- Initialization ---
var secrets struct {
	MONGO_URI  string
	JWT_SECRET string
}

//encore:service
type Service struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func initService() (*Service, error) {
	client, db, err := db.Connect(secrets.MONGO_URI)
	if err != nil {
		return nil, fmt.Errorf("mongodb connection error: %w", err)
	}
	return &Service{
		client:     client,
		collection: db.Collection("logs"),
	}, nil
}

// ---
// Database Operations
// ---
func (s *Service) createLog(ctx context.Context, userID primitive.ObjectID, log *CreateHabitLogInput) (*HabitLog, error) {
	// find the current habit snapshot
	habitSnapshot, err := habits.GetHabit(ctx, log.HabitID.String())
	if err != nil {
		return nil, fmt.Errorf("habit not found: %w", err)
	}

	habitLog := &HabitLog{
		HabitID:    log.HabitID,
		ID:         primitive.NewObjectID(),
		UserID:     userID,
		LoggedDate: time.Now(),
		Completed:  log.Completed,
		Note:       log.Note,
		HabitSnapshot: HabitSnapshot{
			Name:        habitSnapshot.Habit.Name,
			EffortLevel: habitSnapshot.Habit.EffortLevel,
			Category:    habitSnapshot.Habit.Category,
		},
		CreatedAt: time.Now(),
	}

	_, err = s.collection.InsertOne(ctx, habitLog)
	if err != nil {
		return nil, fmt.Errorf("failed to insert log: %w", err)
	}
	return habitLog, nil
}
