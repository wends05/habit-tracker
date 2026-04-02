package users

import (
	"context"
)

//encore:api public method=POST path=/user/signup
func (s *Service) Signup(ctx context.Context, user *CreateUserInput) (*AuthResponse, error) {
	return s.signup(ctx, user)
}

//encore:api public method=POST path=/user/login
func (s *Service) Login(ctx context.Context, user *LoginUserInput) (*AuthResponse, error) {
	return s.login(ctx, user)
}

//encore:api auth method=GET path=/user/me
func (s *Service) Me(ctx context.Context) (*UserResponse, error) {
	return s.me(ctx)
}
