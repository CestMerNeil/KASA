package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	// "kommande-chatbot-backend/services"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/hello", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "Hello World!",
			})
		})
	}
}
