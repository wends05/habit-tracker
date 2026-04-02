package logs

import (
	"context"
	"fmt"

	encoreauth "encore.dev/beta/auth"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//encore:api auth method=POST path=/logs
func (s *Service) CreateLog(ctx *context.Context, log *CreateHabitLogInput) (*HabitLog, error) {
	userID, ok := encoreauth.UserID()
	if !ok {
		return nil, fmt.Errorf("Unauthorized")
	}

	// parse the userID into an ObjectID
	userObjectID, err := primitive.ObjectIDFromHex(string(userID))
	if err != nil {
		return nil, fmt.Errorf("invalid authenticated user ID: %w", err)
	}

	newLog, err := s.createLog(*ctx, userObjectID, log)
	return newLog, err
}
