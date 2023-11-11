package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
  	r := gin.Default()
	//밑에 함수는 옆에 있는 폴더에 있는 파일을 제공하겠다 라는 의미 -> 정적 파일 제공
	//굳이 파일을 만든 이유는? 서버에 보여줬을 때 보여줄 영역을 지정하기 위해 
	r.Static("/assets", "./assets") // 정적(이미지 같이 수정되지 않는 파일) 파일 서비스
  	r.LoadHTMLGlob("templates/*")
	// 1. 밑에 주소를 브라우저로 접속하면 
	r.GET("/", func(c *gin.Context) {   //localhost8080에서 / 없는 이유는? 뒤에 아무것도 안적고 싶으면 / 하나만 적으면 됨. => 루트경로
		//2. 이 파일을 보여 주겠다. 
		c.HTML(http.StatusOK, "index.html", gin.H{}) //맨끝에껀 신경 안써도 됨. (gin~)
	})
//브라우저 에서 클라이언트가 add로 들어가면 저 파일을 보여주겠다
	r.GET("/add", func(c *gin.Context) {   
		
		c.HTML(http.StatusOK, "add-user.html", gin.H{}) //맨끝에껀 신경 안써도 됨. (gin~)
	})

	r.GET("/list", func(c *gin.Context) {   
		
		c.HTML(http.StatusOK, "user-list.html", gin.H{}) 
	})

	//바디폼에 담긴 데이터를 객체에 추가하기위해서는 
	//키 이름을 맞춰줘야해서 밑에는 대문자니까 옆에 form:name이라고 적어줘야함
	type user struct {
		Name string  `form:"name"` 
		Age int `form:"age"` 
		Gender bool `form:"gender"` 
		Job string `form:"job"` 
	}
	users := []user{} 
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
	
	r.Run()
}