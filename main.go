package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
  	r := gin.Default()
	//밑에 함수는 옆에 있는 폴더에 있는 파일을 제공하겠다 라는 의미 -> 정적 파일 제공
	//굳이 파일을 만든 이유는? 서버에 보여줬을 때 보여줄 영역을 지정하기 위해 
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

	

	
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
		"message": "pong",
		})
	})

	r.POST("/users", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			//정상적으로 작동하면 밑에 메시지를 내보내겠다. 
		"message": "add!",
		})
	})
	
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}