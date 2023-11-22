
const tbody = document.querySelector("tbody")
getUsers()


//첫 화면

let user = []
async function getUsers() {
    const res = await fetch("http://localhost:8080/getEditUser")
    const data = await res.json() 
    user = data
    console.log(user)
    makeList()
    //배열안에 객체가 들어있음.
}

function makeList() {
    tbody.innerHTML = ""
    tbody.innerHTML += `<tr>
                <td>${user[0].Name}</td>
                <td>${user[0].Age}</td>
                <td>${getGender()}</td>
                <td>${user[0].Job}</td>
                <td><button id="edit"></button></td>
            </tr>`
    getGender()
    rewrite()
}


//성별 한글로 변환해주는 함수 
function getGender() {
    if (user[0].gender == 0) {
        return "남자"
    } else {
        return "여자"
    }
}

//버튼 누르면 input 나오는 함수
function rewrite() {
    const edit = document.querySelector("#edit")
    edit.addEventListener("click", function () {
        tbody.innerHTML = ""
        tbody.innerHTML = `<form action="/users" method="post">
            <tr>
                <td><input type="text" name></td>
                <td><input></td>
                <td><input type="radio" name="gender">남
                    <input type="radio" name="gender">여
                    </td>
                <td><input></td>
                <td><button id="edit"></button></td>
            </tr>
         </form>`
    })
}
