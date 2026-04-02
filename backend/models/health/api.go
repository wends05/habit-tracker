package health

import "context"

type HealthResponse struct {
	Message string `json:"message"`
}

//encore:api public method=GET path=/health/hello
func Hello(ctx context.Context) (*HealthResponse, error) {
	result := "Hello, World!"
	return &HealthResponse{
		Message: result,
	}, nil
}
