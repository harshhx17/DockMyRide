package types

import (
	"github.com/docker/docker/client"
	"golang.org/x/net/context"
)

// ApplicationConfig defines the config for various service apps
type ApplicationConfig struct {
	DockerImage  string
	ConfFunction func(string, map[string]interface{}) string
}

// ApplicationEnv defines the environment of the running app
type ApplicationEnv struct {
	Context     context.Context
	Client      *client.Client
	ContainerID string
}

// NewAppEnv returns a new ApplicationEnv
func NewAppEnv() (*ApplicationEnv, error) {
	ctx := context.Background()
	cli, err := client.NewEnvClient()
	if err != nil {
		return nil, err
	}
	return &ApplicationEnv{
		Context: ctx,
		Client:  cli,
	}, nil
}
