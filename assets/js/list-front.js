//프로그램이 코드를 읽는 순서가 어떻게 되는지 상관없는지
//함수를 만들고 함수끼리 밑에 따로 빼두어야 하는지 아니면 함수를 호출한 곳 근처에 함수코드를 두어야 하는지
//딜리트 버튼 라우터연결 함수는 왜 따로 빼놓았는지 그냥 const delete 버튼 부터 빼놓으면 안되는지 
//함수를 만드는 기준 ? 몇 줄 이상부터 빼놓아야 하는지?
//쿼리로 /?name=value 이걸로 넘기는것과 객체 제이슨? /id:value 이걸로 넘기는거 결정하는 기준이 뭔지 ? 자기맘대로임?
///users/:id 이건 id:value 형식이 아닌데? 무슨 형식이지 이때까지 내가한건??????


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
            // front : edit?id=5 -> edit router -> edit-user.html -> edit-front.js getUsers() -> /get -> get router users[5]
            location.href = `http://localhost:8080/edit?id=${i}`
            //이건 쿼리스트링 형태로 넘기면 form 형식인건가???????
            //쿼리스트링=form 형태 / key:value 형태 = 자바 라면서??
            //근데 왜 꼭 쿼리스트링 형식으로 넘겨야 하나? 객체 형식으로 넘기면 안됨? 
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
