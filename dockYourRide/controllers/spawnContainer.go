package controllers

import (
	"../lib/api"
	"../lib/configs"
	"../lib/types"
	"../lib/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
)

// createApp function handles requests for making making new node app
func CreateApp(c *gin.Context) {
	var (
		data map[string]interface{}
	)

	c.BindJSON(&data)

	ports, err := utils.GetFreePorts(2)

	if err != nil {
		c.JSON(500, gin.H{
			"error": err,
		})
		return
	}

	if len(ports) < 2 {
		c.JSON(500, gin.H{
			"error": "Not Enough Ports",
		})
		return
	}

	sshPort := ports[0]
	httpPort := ports[1]

	context := data["context"].(map[string]interface{})

	appEnv, rer := api.CreateBasicApplication(
		data["name"].(string),
		data["url"].(string),
		strconv.Itoa(httpPort),
		strconv.Itoa(sshPort),
		context,
		&types.ApplicationConfig{
			DockerImage:  "nginx",
			ConfFunction: configs.CreateNodeContainerConfig,
		})

	fmt.Println(appEnv)
	fmt.Println(rer)

	// if rer != nil {
	// 	g.SendResponse(c, rer, gin.H{})
	// 	return
	// }
}

// func fetchDocs(c *gin.Context) {
// 	queries := c.Request.URL.Query()
// 	filter := utils.QueryToFilter(queries)

// 	filter["language"] = "node"

// 	c.JSON(200, gin.H{
// 		"data": mongo.FetchAppInfo(filter),
// 	})
// }

// func deleteApp(c *gin.Context) {
// 	queries := c.Request.URL.Query()
// 	filter := utils.QueryToFilter(queries)

// 	filter["language"] = "node"

// 	c.JSON(200, gin.H{
// 		"message": mongo.DeleteApp(filter),
// 	})
// }

// func updateApp(c *gin.Context) {
// 	queries := c.Request.URL.Query()
// 	filter := utils.QueryToFilter(queries)

// 	filter["language"] = "node"

// 	var (
// 		data map[string]interface{}
// 	)
// 	c.BindJSON(&data)

// 	c.JSON(200, gin.H{
// 		"message": mongo.UpdateApp(filter, data),
// 	})
// }
