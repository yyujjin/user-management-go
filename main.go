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


	//edit-user 페이지에서 input에 입력 다하고 눌렀을 때 적용되는 함수 
	r.PUT("/edit/:id", func(c *gin.Context) {
		var editUser user
		//Bind => 바디에 담긴 데이터를 구조체에 담아주는 함수.
		if err := c.Bind(&editUser); err != nil {
			return 
		}
		
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




	//user-list 창 열었을 때 나오는 함수 
	r.GET("/users", func(c *gin.Context) {   
		fmt.Println(users)
		c.JSON(200, users)
		
	})



	 

//list 에 수정 버튼 눌렀을 때 작동 되는 함수 
	tempUser := []user{}
	r.PUT("/getEditUser/:id", func(c *gin.Context) {
		for i:=1; i<=len(tempUser); i++ {
						tempUser = tempUser[:len(tempUser)-1]
					}
		var editUser user
		//Bind => 바디에 담긴 데이터를 구조체에 담아주는 함수.
		if err := c.Bind(&editUser); err != nil {
			return 
		}
		
		
		id,err:= strconv.Atoi (c.Param("id"))  
		if err != nil {
			fmt.Println("경고")
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "올바르지 않은 ID입니다."})
			return
		}
		tempUser = append(tempUser,users[id])

		c.JSON(http.StatusOK, gin.H{
			"user" : users[id], 
		})
	})

	//edit - user 페이지를 열었을 때 나오는 함수 
	r.GET("/get", func(c *gin.Context) {   
		fmt.Println(tempUser)
		c.JSON(200, tempUser)
	})


	r.Run()
}













// getEditUser := []user{}
// r.POST("/sendEditUser", func(c *gin.Context) {
// //배열에 아무것도 없는데 작동시키면 에러나서 배열길이 0 일때는 작동 막음 
// 	for i:=1; i<=len(getEditUser); i++ {
// 			getEditUser = getEditUser[:len(getEditUser)-1]
// 		}
// 	fmt.Println(getEditUser)
// 		var editUser user
// 	if err := c.Bind(&editUser); err != nil {
// 				return
// 	}
// getEditUser = append(getEditUser,editUser )
// 		// fmt.Println(editUser)
// 		c.JSON(http.StatusOK, gin.H{

// 	"user" : getEditUser,
	
// 	})
// 		fmt.Println(getEditUser) 
// 	})
	
	// r.GET("/getEditUser", func(c *gin.Context) {   
	// 	fmt.Println(crazy)
	// 	c.JSON(200, crazy)
	// })