package shared

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ToObjectId(habitID string) (primitive.ObjectID, error) {
	id, err := primitive.ObjectIDFromHex(habitID)
	if err != nil {
		return primitive.NilObjectID, fmt.Errorf("Invalid habit ID: %w", err)
	}
	return id, nil
}
