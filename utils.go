package main

func ClearTable(a *App) {
	a.DB.Exec("DELETE from posts WHERE slug = $1", "test")
	a.DB.Exec("Alter sequence posts_uid_seq RESTART WITH 4")
}