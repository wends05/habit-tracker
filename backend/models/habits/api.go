package habits

import (
	"context"
	"fmt"
	"wends05/habit-tracker/backend/shared"

	encoreauth "encore.dev/beta/auth"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//encore:api auth method=GET path=/habits
func (s *Service) GetHabits(ctx context.Context) (*GetHabitsOutput, error) {
	userID, ok := encoreauth.UserID()
	if !ok {
		return nil, fmt.Errorf("unauthenticated")
	}

	userObjectID, err := primitive.ObjectIDFromHex(string(userID))
	if err != nil {
		return nil, fmt.Errorf("invalid authenticated user ID: %w", err)
	}

	habits, err := s.findHabitsByUserID(ctx, userObjectID)
	if err != nil {
		return nil, err
	}
	return &GetHabitsOutput{Habits: habits}, nil
}

//encore:api auth method=GET path=/habits/:id
func (s *Service) GetHabit(ctx context.Context, id string) (*GetHabitOutput, error) {

	// validate the id
	habitID, err := shared.ToObjectId(id)
	if err != nil {
		return nil, fmt.Errorf("Invalid habit ID: %w", err)
	}

	habit, err := s.findHabitByID(ctx, habitID)
	if err != nil {
		return nil, err
	}
	return &GetHabitOutput{Habit: *habit}, nil
}

//encore:api auth method=POST path=/habits
func (s *Service) CreateHabit(ctx context.Context, habit *CreateHabitInput) (*CreateHabitOutput, error) {
	userID, ok := encoreauth.UserID()
	if !ok {
		return nil, fmt.Errorf("unauthenticated")
	}

	userObjectID, err := primitive.ObjectIDFromHex(string(userID))
	if err != nil {
		return nil, fmt.Errorf("invalid authenticated user ID: %w", err)
	}

	newHabit, err := s.createHabit(ctx, userObjectID, habit)
	if err != nil {
		return nil, err
	}
	return &CreateHabitOutput{Habit: *newHabit}, nil
}

//encore:api auth method=PUT path=/habits/:id
func (s *Service) UpdateHabit(ctx context.Context, id string, habit *UpdateHabitInput) (*UpdateHabitOutput, error) {
	// validate the id
	habitID, err := shared.ToObjectId(id)
	if err != nil {
		return nil, fmt.Errorf("Invalid habit ID: %w", err)
	}

	userID, ok := encoreauth.UserID()
	if !ok {
		return nil, fmt.Errorf("unauthenticated")
	}

	userObjectID, err := primitive.ObjectIDFromHex(string(userID))
	if err != nil {
		return nil, fmt.Errorf("invalid authenticated user ID: %w", err)
	}

	updatedHabit, err := s.updateHabit(ctx, habitID, userObjectID, habit)
	if err != nil {
		return nil, err
	}
	return &UpdateHabitOutput{Habit: *updatedHabit}, nil
}

//encore:api auth method=DELETE path=/habits/:id
func (s *Service) DeleteHabit(ctx context.Context, id string) (*DeleteHabitOutput, error) {
	// validate the id
	habitID, err := shared.ToObjectId(id)
	if err != nil {
		return nil, fmt.Errorf("Invalid habit ID: %w", err)
	}

	// get the userID
	//
	userID, ok := encoreauth.UserID()
	if !ok {
		return nil, fmt.Errorf("unauthenticated")
	}

	userObjectID, err := primitive.ObjectIDFromHex(string(userID))
	if err != nil {
		return nil, fmt.Errorf("invalid authenticated user ID: %w", err)
	}
	if err := s.deleteHabit(ctx, habitID, userObjectID); err != nil {
		return nil, err
	}
	return &DeleteHabitOutput{
		Message: "Habit Deleted",
	}, nil
}
