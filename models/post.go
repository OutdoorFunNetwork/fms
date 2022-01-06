package models

import (
	"database/sql"
	"errors"
)

type Post struct {
	Uid int `json:"uid"`
	Slug string `json:"slug"`
	Title string `json:"title"`
	Body string `json:"body"`
	Categories []Category `json:"categories"`
	Author User `json:"author"`
}

func (p *Post) getPost(db *sql.DB) error {
	return errors.New("Not implemented")
}

func (p *Post) updatePost(db *sql.DB) error {
	return errors.New("Not implemented")
}

func (p *Post) deletePost(db *sql.DB) error {
	return errors.New("Not implemented")
}

func (p *Post) createPost(db *sql.DB) error {
	return errors.New("Not implemented")
}

func getPosts(db *sql.DB, start, count int) ([]Post, error) {
	return nil, errors.New("Not implemented.")
}