package main

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Problem loading the .env file.")
	}

	fmt.Println("Hello OFN Cult")
}