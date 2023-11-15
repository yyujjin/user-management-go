const tbody = document.querySelector("tbody")

function setting () {
tbody.innerHTML = ''
    for (let i=0; i<users.length;i++) {
          tbody.innerHTML += 
            `<tr>
                <td>${i}</td>
                <td>${users[i].Name}</td>
                <td>${users[i].Age}</td>
                <td>${users[i].Gender}</td>
                <td>${users[i].Job}</td>
                <td><button class="delete" >삭제</button></td>
                <td><button class="edit"> 수정 </button></td>
            </tr>`
            deleteUser()
    }
   
}

//삭제버튼 구현
function deleteUser() {
    const deleteButtons = document.querySelectorAll(".delete")
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].addEventListener ('click',function(){
            alert("삭제하시겠습니까?")
            users.splice(i,1)
            console.log(users)
            setting()
        })
    }
}



getUsers()
let users = []
async function getUsers() {
    const res = await fetch("http://localhost:8080/users")
    const data = await res.json() // 그냥 이 2코드 같이 있어야지 데이터받을 수있음.
    users = data
    console.log(users)
    setting()
    //배열안에 객체가 들어있음. 
}



// 버튼 만들기 수정이랑 삭제 
//시간나면 삭제만 해오기 라우터 생성
//자바스크립트 연결    