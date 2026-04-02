package users

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Base User
type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name      string             `bson:"name" json:"name"`
	Password  string             `bson:"password" json:"password"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}

type UserResponse struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}

// Signup User API
type CreateUserInput struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

// Authentication Response Struct
type AuthResponse struct {
	Token string       `json:"token"`
	User  UserResponse `json:"user"`
}

// Login User API
type LoginUserInput struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

// ---
// Helpers
// ---

func (u *User) toUserResponse() *UserResponse {
	return &UserResponse{
		ID:        u.ID.Hex(),
		Name:      u.Name,
		CreatedAt: u.CreatedAt,
	}
}
