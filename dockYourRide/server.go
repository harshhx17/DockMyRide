package main

import (
	"./controllers"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.POST("/app", controllers.CreateApp)
	r.Run() // listen and serve on 0.0.0.0:8080
}
