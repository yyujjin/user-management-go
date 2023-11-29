const tbody = document.querySelector("tbody")

function makeList() {
    tbody.innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        tbody.innerHTML += `<tr>
                <td>${i + 1}</td>
                <td>${users[i].Name}</td>
                <td>${users[i].Age}</td>
                <td>${getGender(i)}</td>
                <td>${users[i].Job}</td>
                <td><button class="delete"></button></td>
                <td><button class="edit"></button></td>
            </tr>`
    }
    const edit = document.querySelectorAll(".edit")
    for (let i = 0; i < edit.length; i++) {
        edit[i].addEventListener("click", function () {
            location.href = `http://localhost:8080/edit?id=${i}`  
        })
    }

    const deleteButtons = document.querySelectorAll(".delete")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            deleteUser(i)
        })
    }
}


function getGender(i) {
    if (users[i].Gender == 0) {
        return "남자"
    } else {
        return "여자"
    }
}

async function deleteUser(i) {
    const confirmDelete = confirm("삭제하시겠습니까?")

    if (!confirmDelete) {
        return
    }
    console.log(i)
   
    try {
        
        await fetch(`http://localhost:8080/users/${i}`, {
            method: "DELETE",
        })
        getUsers()
    } catch (error) {
        console.error("네트워크 오류:", error)
    }
}

getUsers()
let users = []
async function getUsers() {
    const res = await fetch("http://localhost:8080/users")
    const data = await res.json()
    users = data
    console.log(users)
    makeList()
}
