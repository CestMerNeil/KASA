package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Product struct {
	SerialNumber string  `json:"serialNumber"`
	ProductName  string  `json:"productName"`
	Brand        string  `json:"brand"`
	Model        string  `json:"model"`
	Description  string  `json:"description"`
	Price        float64 `json:"price"`
	Image        string  `json:"image"`
	Clicks       int     `json:"clicks"`
	Type         string  `json:"type"`
}

func FetchProducts() ([]map[string]string, error) {
	resp, err := http.Get("http://localhost:5031/products")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var products []Product
	if err := json.Unmarshal(body, &products); err != nil {
		return nil, err
	}

	var message []map[string]string
	for _, product := range products {
		message = append(message, map[string]string{
			"role": "system",
			"content": fmt.Sprintf(
				"Product: %s, Price: %.2f, Type: %s, Description: %s",
				product.ProductName,
				product.Price,
				product.Type,
				product.Description,
			),
		})
	}
	return message, nil
}
