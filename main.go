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

	r.GET("/edit", func(c *gin.Context) {   
		
		c.HTML(http.StatusOK, "edit-user.html", gin.H{}) 
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
		//Atoi = 문자를 숫자로 만들어 주는 함수
		//근데 문제가 생길 시 0 을 내보냄 
		id,err:= strconv.Atoi (c.Param("id"))  
		//err 가 나면 nil이 아닌 다른게 뜸
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

	r.PUT("/edit/:id", func(c *gin.Context) {
		var editUser user
		//Bind => 바디에 담긴 데이터를 구조체에 담아주는 함수.
		if err := c.Bind(&editUser); err != nil {
			return 
		}
		
		
		// 1. 주소로 인덱스 파라미터 받기
		// 2. users의 받은 인덱스의 요소를 출력
		id,err:= strconv.Atoi (c.Param("id"))  
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




	//실제 users 배열을 가지고 오는 라우터를 만들어야 함.
	r.GET("/users", func(c *gin.Context) {   
		fmt.Println(users)
		c.JSON(200, users)
		
	})



	
	getEditUser := []user{}
	r.POST("/sendEditUser", func(c *gin.Context) {
		//배열에 아무것도 없는데 작동시키면 에러나서 배열길이 0 일때는 작동 막음 
		for i:=1; i<=len(getEditUser); i++ {
			getEditUser = getEditUser[:len(getEditUser)-1]
		}
		fmt.Println(getEditUser)
		var editUser user
		if err := c.Bind(&editUser); err != nil {
			return 
		}
		getEditUser = append(getEditUser,editUser )
		// fmt.Println(editUser)
		c.JSON(http.StatusOK, gin.H{
			
			"user" : getEditUser, 

		})
		fmt.Println(getEditUser)
	})
	
	r.GET("/getEditUser", func(c *gin.Context) {   
		fmt.Println(getEditUser)
		c.JSON(200, getEditUser)
	})


	r.Run()
}