//프로그램이 코드를 읽는 순서가 어떻게 되는지 상관없는지
//위에서부터 밑으로 

//함수를 만들고 함수끼리 밑에 따로 빼두어야 하는지 아니면 함수를 호출한 곳 근처에 함수코드를 두어야 하는지
//아무래도 함수는 한곳에 모아두는게...

//딜리트 버튼 라우터연결 함수는 왜 따로 빼놓았는지 그냥 const delete 버튼 부터 빼놓으면 안되는지 
//기능적인 이유는 없지만 들여쓰기가 많이 되면 코드 보기가 힘들어진다 (중첩이 된다)

//함수를 만드는 기준 ? 몇 줄 이상부터 빼놓아야 하는지?
//한줄이라도 재사용이 되거나 큰 타이틀을 주기위해 빼놓는경우도 있음. 
//그렇다고 너무 빼놓으면 오히려 불편해서 적당히 만들어야한다. 

// 쿼리스트링과 시맨틱은 get method.에 쓰는 거 , 데이터를 조회할 때 많이 쓰는 방식
//post 방식으로 쓸려면 쓸수있지만 트렌드에 맞지 않는다. 
//쿼리스트링로 /?name=value 이걸로 넘기는것과 객체 제이슨? /id/:value 이걸로 넘기는거 결정하는 기준이 뭔지 ? 자기맘대로임?
///users/:id 이건 i:dvalue 형식이 아닌데? 무슨 형식이지 이때까지 내가한건??????
///?name=value =>쿼리 //id/:value => 시맨틱url 둘 다 데이터타입이 스트링이고 주소랑 같이 넘기는 공통점 /
//주소에다 보내는게 쿼리

// Content-Type: application/x-www-form-urlencoded //헤더

// post method에 body를 많이 씀
//둘 다 바디 (쿼리 아님) 그냥 이런 형태로 보낸다. 
// name=응아
// &age=28
// &gender=0
// &job=개발자 선생님

// {
//     "name":"응아",
//     "age":28,
// }
// 택배 우편, 등기로, 보내는 값은 똑같은데 선택하는거임 폼or제이슨 형태 
//키 큰따옴표로 감싸는거는 객체에서 안쓰이고 제이슨 형태에서 쓰임 
// 제이슨,폼  : 둘 다 바디안에 담기는 컨텐츠 
//쿼리스트링, 시맨틱, 제이슨, 폼 각 각 다른 방식 

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
            //이건 그냥 쿼리스트링 metthod =>get 
            //근데 왜 꼭 쿼리스트링 형식으로 넘겨야 하나? 상관없음 맘대로 
            //많이 쓰는거는 시맨틱 url 임 지금은 쉬워서 쿼리 
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
