package users

import (
	"context"
	"fmt"
	"time"
	authutils "wends05/habit-tracker/backend/shared/authutils"
	"wends05/habit-tracker/backend/shared/db"

	"encore.dev/beta/auth"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
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
		collection: db.Collection("users"),
	}, nil
}

// ---
// Database Operations
// ---
func (s *Service) findUserByID(ctx context.Context, id string) (*User, error) {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var user User
	err = s.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *Service) findUserByName(ctx context.Context, name string) (*User, error) {
	var user User
	err := s.collection.FindOne(ctx, bson.M{
		"name": name,
	}).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *Service) login(ctx context.Context, input *LoginUserInput) (*AuthResponse, error) {

	// find first the user by the given name
	dbUser, err := s.findUserByName(ctx, input.Name)
	if err != nil {
		return nil, err
	}

	// compare the hashed password with the input
	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(input.Password)); err != nil {
		return nil, err
	}

	// generate a JWT token
	token, err := authutils.CreateToken(secrets.JWT_SECRET, dbUser.ID.Hex(), dbUser.Name)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{
		Token: token,
		User: UserResponse{
			ID:        dbUser.ID.Hex(),
			Name:      dbUser.Name,
			CreatedAt: dbUser.CreatedAt,
		},
	}, nil

}

func (s *Service) signup(ctx context.Context, input *CreateUserInput) (*AuthResponse, error) {

	// check first if user exists
	existingUser, err := s.findUserByName(ctx, input.Name)
	if existingUser != nil {
		return nil, fmt.Errorf("user with name %s already exists", input.Name)
	}

	// encrypt password first
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// create a new User with the hashed password
	newUser := User{
		ID:        primitive.NewObjectID(),
		Name:      input.Name,
		Password:  string(hashedPassword),
		CreatedAt: time.Now(),
	}

	if _, err = s.collection.InsertOne(ctx, newUser); err != nil {
		return nil, err
	}

	// create an AuthResponse with the token and user details
	token, err := authutils.CreateToken(secrets.JWT_SECRET, newUser.ID.Hex(), newUser.Name)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{
		Token: token,
		User: UserResponse{
			ID:        newUser.ID.Hex(),
			Name:      newUser.Name,
			CreatedAt: newUser.CreatedAt,
		},
	}, nil
}

func (s *Service) me(ctx context.Context) (*UserResponse, error) {
	// get the user from the context
	userId, ok := auth.UserID()
	if !ok {
		return nil, fmt.Errorf("user not found")
	}
	// find the user by ID
	user, err := s.findUserByID(ctx, string(userId))
	if err != nil {
		return nil, err
	}

	return &UserResponse{
		ID:        user.ID.Hex(),
		Name:      user.Name,
		CreatedAt: user.CreatedAt,
	}, nil
}
