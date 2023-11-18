package main

import (
	"fmt"
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
)

func main() {
  	r := gin.Default() 
	r.Static("/assets", "./assets") // 정적(이미지 같이 수정되지 않는 파일) 파일 서비스
  	r.LoadHTMLGlob("templates/*")
	// 1. 밑에 주소를 브라우저로 접속하면 
	

	r.GET("/add", func(c *gin.Context) {   
		
		c.HTML(http.StatusOK, "add-user.html", gin.H{}) //맨끝에껀 신경 안써도 됨. (gin~)
	})

	r.GET("/list", func(c *gin.Context) {   
		
		c.HTML(http.StatusOK, "user-list.html", gin.H{}) 
	})

	type user struct {
		Name string  `form:"name"` 
		Age int `form:"age"` 
		Gender int `form:"gender"` 
		Job string `form:"job"` 
	}

	users := []user{} 
	//상황에 따라 라우터마다 컨텐츠 타입이 달라질 수 있음. 
	//제출하기 버튼을 누르면 이코드 실행됨. 
	r.POST("/users", func(c *gin.Context) {
		var newUser user
		if err := c.Bind(&newUser); err != nil {
			return 
		}
		users = append(users,newUser)
		fmt.Println(users)
		c.JSON(http.StatusOK, gin.H{
			
			"user" : newUser, 
		})
	})
	
	//user-list 삭제함수
	r.DELETE("/users/:id", func (c *gin.Context) {
		
				id,_ := strconv.Atoi (c.Param("id"))  
	
				for index, a := range users {
					if index == id {
						c.IndentedJSON(http.StatusOK, a)
		
						users = append(users[:index],users[index+1:]...)
						return  
					}
				}
				c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
			})




	//실제 users 배열을 가지고 오는 라우터를 만들어야 함.
	r.GET("/users", func(c *gin.Context) {   
		fmt.Println(users)
		c.JSON(200, users)
	})
	
	r.Run()
}