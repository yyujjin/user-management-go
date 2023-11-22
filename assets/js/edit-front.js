getEditUser()
const tbody = document.querySelector("tbody")

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

//첫 화면

getUsers()
let user = []
async function getUsers() {
    const res = await fetch("http://localhost:8080/getEditUser")
    const data = await res.json() 
    users = data
    console.log(user)
    makeList()
    //배열안에 객체가 들어있음.
}

function makeList() {
    // tbody.innerHTML = ""
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

function getGender() {
    if (user[0].gender == 0) {
        return "남자"
    } else {
        return "여자"
    }
}
