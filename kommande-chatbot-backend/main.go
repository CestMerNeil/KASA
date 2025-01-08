package main

import (
	"kommande-chatbot-backend/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	routes.RegisterChatRoutes(r)

	log.Println("Server is running on port 8080")
	r.Run(":8080")
}
