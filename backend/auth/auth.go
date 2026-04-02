package auth

import (
	"context"
	"strings"
	authutils "wends05/habit-tracker/backend/shared/authutils"

	encoreauth "encore.dev/beta/auth"
	"encore.dev/beta/errs"
)

var secrets struct {
	JWT_SECRET string
}

type AuthParams struct {
	Authorization string `header:"Authorization"`
}

type AuthData struct {
	UserID string `json:"user_id"`
	Name   string `json:"name"`
}

//encore:authhandler
func Authenticate(ctx context.Context, params *AuthParams) (encoreauth.UID, *AuthData, error) {
	// check first if params are nil or empty
	if params == nil || params.Authorization == "" {
		return "", nil, errs.B().Code(errs.Unauthenticated).Msg("missing authorization header").Err()
	}

	// then check the Bearer token if it is valid
	token := strings.TrimPrefix(params.Authorization, "Bearer ")
	if token == "" || token == params.Authorization {
		return "", nil, errs.B().Code(errs.Unauthenticated).Msg("invalid token").Err()
	}

	// verify the token and return the user ID and data
	claims, err := authutils.ParseToken(secrets.JWT_SECRET, token)
	if err != nil {
		return "", nil, errs.B().Code(errs.Unauthenticated).Msg("invalid token").Err()
	}
	return encoreauth.UID(claims.UserID), &AuthData{UserID: claims.UserID, Name: claims.Name}, nil
}
