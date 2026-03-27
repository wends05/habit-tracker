package users

import (
	"context"
	"strconv"
)

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

//encore:api public method=POST path=/user
func CreateUser(ctx context.Context, user *User) (*User, error) {
	return user, nil
}

//encore:api public method=GET path=/user/:id
func GetUser(ctx context.Context, id int) (*User, error) {

	return &User{ID: strconv.Itoa(id)}, nil
}

//encore:api public method=GET path=/users
func GetUsers(ctx context.Context) (*GetUsersResponse, error) {
	return &GetUsersResponse{
		Users: []*User{
			{ID: "1", Name: "John Doe"},
			{ID: "2", Name: "Jane Doe"},
		},
	}, nil
}

type GetUsersResponse struct {
	Users []*User `json:"users"`
}
