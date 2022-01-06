package models

type Post struct {
	Uid int `json:"uid"`
	Slug string `json:"slug"`
	Title string `json:"title"`
	Body string `json:"body"`
	Categories []Category `json:"categories"`
	Author User `json:"author"`
}