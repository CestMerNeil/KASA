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

		// Add role definition system message
		roleMessage := map[string]string{
			"role":    "system",
			"content": "You are KASA's customer service assistant. Your role is to help customers learn about our multimedia products, answer their questions, and provide helpful information about our PCs, mobile phones, tablets, and other devices. Be friendly, professional, and knowledgeable in your responses.",
		}

		productMessages, err := services.FetchProducts()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch product data"})
			return
		}
		
		// Combine messages: role definition first, then product info, then user messages
		combinedMessages := []map[string]string{roleMessage}
		combinedMessages = append(combinedMessages, productMessages...)
		combinedMessages = append(combinedMessages, messages...)

		response, err := services.SendToOpenAI(combinedMessages)
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
