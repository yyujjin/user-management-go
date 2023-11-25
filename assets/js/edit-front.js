
//4. 바로 호출
getUsers()


//첫 화면

let user = {}
async function getUsers() {
    //5. 실행
    const a = location.search // ?id=1
    a.slice(1) //id=1
    b = a.split("=") //b [id,1]

    const res = await fetch(`http://localhost:8080/get?id=${b[1]}`)
    const data = await res.json() 
    user = data
    console.log(user)
    makeList()
    
}

function makeList() {
    const tbody = document.querySelector("tbody")
    tbody.innerHTML = ""
    tbody.innerHTML += `<tr>
                <td><input value="${user.Name}"></td>
                <td><input value="${user.Age}"></td>
                <td><input value="${getGender()}"></td>
                <td><input value="${user.Job}"></td>
                <td><button id="edit"></button></td>
            </tr>`
    getGender()
    //input 안에 값이 담기라고 했음 
}






function getGender() {
    if (user.Gender == 0) {
        return "남자"
    } else {
        return "여자"
    }
}


 

