package routes

import (
	"encoding/json"
	"kommande-chatbot-backend/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// Message 定义WebSocket消息结构
type Message struct {
	Messages []map[string]string `json:"messages"`
}

// WebSocket配置
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// 允许所有跨域请求
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func RegisterChatRoutes(r *gin.Engine) {
	// 保留原有的HTTP API端点
	r.POST("/api/openai", handleChatRequest)
	
	// 添加WebSocket端点
	r.GET("/ws/chat", handleWebSocket)
}

// WebSocket处理函数
func handleWebSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Failed to set websocket upgrade:", err)
		return
	}
	defer conn.Close()

	log.Println("New WebSocket connection established")

	for {
		// 读取消息
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}

		// 解析消息
		var message Message
		if err := json.Unmarshal(msg, &message); err != nil {
			log.Println("Error parsing message:", err)
			continue
		}

		// 处理聊天请求
		response, err := processChatRequest(message.Messages)
		if err != nil {
			// 发送错误响应
			errResp := map[string]string{"error": "Failed to process chat"}
			errMsg, _ := json.Marshal(errResp)
			conn.WriteMessage(websocket.TextMessage, errMsg)
			continue
		}

		// 发送响应
		responseMsg, _ := json.Marshal(map[string]interface{}{
			"choices": []map[string]interface{}{
				{
					"message": map[string]string{
						"role":    "assistant",
						"content": response,
					},
				},
			},
		})
		
		if err := conn.WriteMessage(websocket.TextMessage, responseMsg); err != nil {
			log.Println("Error writing message:", err)
			break
		}
	}
}

// HTTP API处理函数
func handleChatRequest(c *gin.Context) {
	var messages []map[string]string

	if err := c.ShouldBindJSON(&messages); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	response, err := processChatRequest(messages)
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
}

// 处理聊天请求的通用函数
func processChatRequest(messages []map[string]string) (string, error) {
	// 添加系统角色消息
	roleMessage := map[string]string{
		"role":    "system",
		"content": "You are KASA's customer service assistant. Your role is to help customers learn about our multimedia products, answer their questions, and provide helpful information about our PCs, mobile phones, tablets, and other devices. Be friendly, professional, and knowledgeable in your responses.",
	}

	// 获取产品信息
	productMessages, err := services.FetchProducts()
	if err != nil {
		return "", err
	}
	
	// 合并消息
	combinedMessages := []map[string]string{roleMessage}
	combinedMessages = append(combinedMessages, productMessages...)
	combinedMessages = append(combinedMessages, messages...)

	// 发送到OpenAI
	return services.SendToOpenAI(combinedMessages)
}
