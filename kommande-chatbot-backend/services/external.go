package services

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func FetchExternalData(input string) (string, error) {
	url := fmt.Sprintf("https://example.com/api?query=%s", input)

	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("external API returned status: %d", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
