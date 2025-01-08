package routes

import (
	"kommande-chatbot-backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterChatRoutes(r *gin.Engine) {
	r.POST("/api/openai", func(c *gin.Context) {
		var messages []map[string]string

		if err := c.ShouldBindJSON(&messages); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
			return
		}

		productMessages, err := services.FetchProducts()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch product data"})
			return
		}
		messages = append(productMessages, messages...)

		response, err := services.SendToOpenAI(messages)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process chat"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"choices": []map[string]interface{}{
				{
					"message": map[string]string{
						"role":    "assistant",
						"content": response,
					},
				},
			},
		})
	})
}
