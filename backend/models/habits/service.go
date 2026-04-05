package habits

import (
	"context"
	"fmt"
	"time"
	"wends05/habit-tracker/backend/shared/db"

	"go.mongodb.org/mongo-driver/bson"
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
		collection: db.Collection("habits"),
	}, nil
}

// ---
// Database Operations
// ---
func (s *Service) findHabitsByUserID(ctx context.Context, userID primitive.ObjectID) ([]Habit, error) {

	cursor, err := s.collection.Find(ctx, bson.M{
		"user_id": userID,
	})

	if err != nil {
		return nil, fmt.Errorf("cannot find habits by userID: %w", err)
	}

	var habits []Habit

	if err := cursor.All(ctx, &habits); err != nil {
		return nil, fmt.Errorf("cannot decode habits: %w", err)
	}

	return habits, nil
}

func (s *Service) createHabit(ctx context.Context, userID primitive.ObjectID, habit *CreateHabitInput) (*Habit, error) {

	// validate the enum
	if !habit.EffortLevel.IsValid() {
		return nil, fmt.Errorf("Invalid effort level: %s", habit.EffortLevel)
	}

	newhabit := &Habit{
		ID:          primitive.NewObjectID(),
		UserID:      userID,
		Name:        habit.Name,
		EffortLevel: habit.EffortLevel,
		Color:       habit.Color,
		Category:    habit.Category,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	_, err := s.collection.InsertOne(ctx, newhabit)
	if err != nil {
		return nil, fmt.Errorf("Create habit error: %w", err)
	}

	return newhabit, nil
}

func (s *Service) findHabitByID(ctx context.Context, habitID primitive.ObjectID) (*Habit, error) {
	var habit Habit
	if err := s.collection.FindOne(ctx, bson.M{"_id": habitID}).Decode(&habit); err != nil {
		return nil, err
	}

	return &habit, nil
}

func (s *Service) updateHabit(ctx context.Context, habitID primitive.ObjectID, userID primitive.ObjectID, habit *UpdateHabitInput) (*Habit, error) {
	// validate the enum
	if habit.EffortLevel != nil && !habit.EffortLevel.IsValid() {
		return nil, fmt.Errorf("Invalid effort level: %s", *habit.EffortLevel)
	}

	// validate the input
	if habit.Name == nil && habit.EffortLevel == nil && habit.Category == nil {
		return nil, fmt.Errorf("No fields to update")
	}

	// check if the habit exists and is owned by the authenticated user
	var existingHabit Habit
	if err := s.collection.FindOne(ctx, bson.M{"_id": habitID, "user_id": userID}).Decode(&existingHabit); err != nil {
		return nil, fmt.Errorf("habit not found or not owned by user: %w", err)
	}

	// update the habit
	res, err := s.collection.UpdateByID(ctx, habitID, bson.M{"$set": habit})
	if err != nil {
		return nil, fmt.Errorf("Update habit error: %w", err)
	}

	if res.MatchedCount == 0 {
		return nil, fmt.Errorf("Habit not updated")
	}

	updatedHabit, err := s.findHabitByID(ctx, habitID)
	if err != nil {
		return nil, fmt.Errorf("Cannot find the error: %w", err)
	}

	return updatedHabit, nil
}

func (s *Service) deleteHabit(ctx context.Context, habitID primitive.ObjectID, userID primitive.ObjectID) error {

	res, err := s.collection.DeleteOne(ctx, bson.M{"_id": habitID, "user_id": userID})

	if err != nil {
		return fmt.Errorf("delete habit error: %w", err)
	}

	if res.DeletedCount == 0 {
		return fmt.Errorf("habit not found or not owned by user")
	}

	return nil
}
