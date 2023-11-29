package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func main() {
  	r := gin.Default() 
	r.Static("/assets", "./assets") 
  	r.LoadHTMLGlob("templates/*")
	

	r.GET("/add", func(c *gin.Context) {   
		
		c.HTML(http.StatusOK, "add-user.html", gin.H{}) 
	})

	r.GET("/list", func(c *gin.Context) {   
		
		c.HTML(http.StatusOK, "user-list.html", gin.H{}) 
	})
//2. 실행 됨 
	r.GET("/edit", func(c *gin.Context) {   
		
		c.HTML(http.StatusOK, "edit-user.html", gin.H{}) 
	})

	type user struct {  
		Name string  `form:"name"` 
		Age int `form:"age"` 
		Gender int `form:"gender"` 
		Job string `form:"job"` 
	}

	users := []user{
		{"yujin", 27, 1, "백조"},
		{"suhyeon", 28, 1, "개발자"},
		{"river", 1, 0, "어린이"},
	} 
	
	//user 추가 함수 
	r.POST("/users", func(c *gin.Context) {
		var newUser user
		if err := c.Bind(&newUser); err != nil {
			return 
		}
		users = append(users,newUser)
		fmt.Println(users)
		// /list router call -> redirect
		// re(다시) + 지시하다(direct) 다시 지시하는 것을 말한다.
		c.Redirect(http.StatusFound, "/list")
		//안나타나니까 필요없음
		// c.JSON(http.StatusOK, gin.H{
		// 	"user" : newUser, 
		// })
	})
	
	//user 삭제 함수
	r.DELETE("/users/:id", func (c *gin.Context) {
		id,err:= strconv.Atoi (c.Param("id"))  
		fmt.Println(id, err)
		if err != nil {
			fmt.Println("경고")
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "올바르지 않은 ID입니다."})
			return
		}
		for index, a := range users {
			if index == id {
				c.IndentedJSON(http.StatusOK, a)

				users = append(users[:index],users[index+1:]...)
				return  
			}
		}
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
	})

	//user 수정함수 
	r.PUT("/edit/:id", func(c *gin.Context) {
		var editUser user
		if err := c.Bind(&editUser); err != nil {
			return 
		}
		
		id,err:= strconv.Atoi (c.Param("id"))  
		fmt.Println(id)
		if err != nil {
			fmt.Println("경고")
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "올바르지 않은 ID입니다."})
			return
		}

		users[id]=editUser
		
		c.JSON(http.StatusOK, gin.H{
			"user" : users[id], 
		})
	})

	//users 배열 가져오는 함수 
	r.GET("/users", func(c *gin.Context) {   
		fmt.Println(users)
		c.JSON(200, users)
		
	})

	//수정 요소만 내보내는 함수
	r.GET("/get", func(c *gin.Context) { 
		// /edit?name=yujin
		c.Query("name") // yujin
		// /get?id=1
		c.Query("id") //!index!! <- number 
		id,_:= strconv.Atoi (c.Query("id"))  
		fmt.Println(users[id])
		c.JSON(200, users[id])
	})
	r.Run()
}




