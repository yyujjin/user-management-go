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
            </tr>`
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
//시간나면 삭제만 해오기
//자바 만들기 