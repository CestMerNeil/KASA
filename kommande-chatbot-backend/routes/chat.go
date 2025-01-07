package routes

import (
	"kommande-chatbot-backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

var chatContext = make(map[string][]map[string]string)

func RegisterChatRoutes(r *gin.Engine) {
	r.POST("/chat", func(c *gin.Context) {
		var requestBody struct {
			UserID string `json:"user_id"`
			Input  string `json:"input"`
		}

		if err := c.ShouldBindJSON(&requestBody); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		messages := chatContext[requestBody.UserID]
		if messages == nil {
			productMessages, err := services.FetchProducts()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch product info"})
				return
			}
			messages = append([]map[string]string{
				{
					"role":    "system",
					"content": "You are a recommendation assistant. Based on the database, you will provide users with the best product recommendations.",
				},
			}, productMessages...)
			chatContext[requestBody.UserID] = messages
		}

		messages = append(messages, map[string]string{
			"role":    "user",
			"content": requestBody.Input,
		})

		response, err := services.SendToOpenAI(messages)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process chat"})
			return
		}

		messages = append(messages, map[string]string{
			"role":    "assistant",
			"content": response,
		})
		chatContext[requestBody.UserID] = messages

		c.JSON(http.StatusOK, gin.H{"response": response})
	})
}
