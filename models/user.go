package models

type User struct {
	Uid int `json:"uid"`
	Email string `json:"email"`
	DisplayName string `json:"displayName"`
	Location string `json:"location"`
	Avatar string `json:"avatar"`
	Bio string `json:"bio"`
	PrimaryActivity string `json:"primaryActivity"`
}