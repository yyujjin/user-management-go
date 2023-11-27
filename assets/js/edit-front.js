
//화면에 in뭐냐 

getUsers()


//첫 화면

let user = {}
async function getUsers() {
    const a = location.search // ?id=1
    // a.slice(1) //id=1  => 이렇게 하려면 a = a.slice(1) 이렇게 다시 해줘야 함
    //이거 안해도 되는데? 굳이 하는 이유는?
    b = a.split("=") //b [id,1]
    // console.log(b)
    //왜 이건또 쿼리로 넘기지?
    // `http://localhost:8080/users/${i}` 이렇게로도 넘길수있는거 아닌갑?? 차이가 뭐지?
    const res = await fetch(`http://localhost:8080/get?id=${b[1]}`)
    const data = await res.json() 
    user = data
    console.log(user)
    makeList()
    
}

//근데 이렇게 서버에 라우터를 하나 더 안만들고 원래 있는 라우터를 활용하면 안되나? 
//이런식으로? 속도가 더 느려지거나 그런건갑 
// let users = []
// async function getUsers() {
//     const a = location.search
//     b = a.split("=")
//     const res = await fetch("http://localhost:8080/users")
//     const data = await res.json()
//     users = data
//     console.log(users[b])
//     makeList()
// }

function makeList() {
    const tbody = document.querySelector("tbody")
    tbody.innerHTML = ""
    tbody.innerHTML += 
        `<tr>
            <td><input value="${user.Name}"></td>
            <td><input value="${user.Age}"></td>
            <td><input value="${getGender()}"></td>
            <td><input value="${user.Job}"></td>
            <td><button id="edit"></button></td>
        </tr>`
    getGender()
}






function getGender() {
    if (user.Gender == 0) {
        return "남자"
    } else {
        return "여자"
    }
}


