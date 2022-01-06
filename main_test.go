package main_test

import (
	"os"
	"testing"

	main "github.com/OutdoorFunNetwork/fms"
)

var a main.App

func TestMain(m *testing.M) {
	a.Initialize(
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"),
		os.Getenv("DB"),
	)

	code := m.Run()
	clearTable()
	os.Exit(code)
}

func clearTable() {
	a.DB.Exec("DELETE from posts WHERE slug = $1", "test")
	a.DB.Exec("Alter sequence posts_uid_seq RESTART WITH 4")
}