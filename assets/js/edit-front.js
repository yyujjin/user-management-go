const tbody = document.querySelector("tbody")

function makeList() {
    tbody.innerHTML = ""
    for (let i = 0; i < user.length; i++) {
        tbody.innerHTML += `<tr>
                <td>${user[i].Name}</td>
                <td>${user[i].Age}</td>
                <td>${getGender(i)}</td>
                <td>${user[i].Job}</td>
            </tr>`
    }
    // getGender()
    // 성별을 한글로 바꿔주는 함수
   
}

getEditUser()
let user = []
async function getEditUser() {
    const res = await fetch("http://localhost:8080/getEditUser")
    const data = await res.json() // 그냥 이 2코드 같이 있어야지 데이터받을 수있음.
    user = data
    console.log(user)
    makeList()
}
function getGender(i) {
    if (user[i].Gender == 0) {
        return "남자"
    } else {
        return "여자"
    }
}