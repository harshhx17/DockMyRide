package api

import (
	"../docker"
	"../types"
	"fmt"
	"os"
	"path/filepath"
)

// CreateBasicApplication spawns a new container with the application of a particular service
func CreateBasicApplication(name, url, httpPort, sshPort string, appContext map[string]interface{}, appConf *types.ApplicationConfig) (*types.ApplicationEnv, types.ResponseError) {
	appEnv, err := types.NewAppEnv()
	fmt.Println(appEnv)
	if err != nil {
		return nil, types.NewResErr(500, "", err)
	}

	var (
		storepath, _ = os.Getwd()
		workdir      = fmt.Sprintf("/SWS/%s", name)
		storedir     = filepath.Join(storepath, fmt.Sprintf("storage/%s", name))
	)

	// Step 2: create the container
	appEnv.ContainerID, err = docker.CreateContainer(appEnv.Context, appEnv.Client, appConf.DockerImage, httpPort, sshPort, workdir, storedir, name)
	if err != nil {
		return nil, types.NewResErr(500, "container not created", err)
	}

	// Step 4: start the container
	err = docker.StartContainer(appEnv.Context, appEnv.Client, appEnv.ContainerID)
	if err != nil {
		return appEnv, types.NewResErr(500, "container not started", err)
	}
	return appEnv, nil
}
