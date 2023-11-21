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
    // 성별을 한글로 바꿔주는 함수
    function getGender(i) {
        if (users[i].Gender == 0) {
            return "남자"
        } else {
            return "여자"
        }
    }
    goToEdit()
    //수정 버튼 누를 edit 페이지 이동 함수
     function goToEdit() {
        const edit = document.querySelectorAll(".edit")
        for (let i = 0; i < edit.length; i++) {
            edit[i].addEventListener("click", function () {
                alert("수정하시겠습니까?")
                location.href = "http://localhost:8080/edit"
            })
        }
    }

    const deleteButtons = document.querySelectorAll(".delete")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            deleteUser(i)
        })
    }
}

async function deleteUser(i) {
    //confirm = 알림창에 에/아니오 나오는 거
    // confirm에서 예를 누르면 = true 아니오를 누르면 = false
    const confirmDelete = confirm("삭제하시겠습니까?")
    //1.if (confirmDelete) {  =>true 일때 실행이 돼라 (줄여슨거) 어파치 트루
    // 1.if (confirmDelete==true) { 풀어쓴 거 / 이렇게도 쓸 수 있음
    // 2.if (!confirmDelete) { => false일때 실행이 돼라
    // 2. if (confirmDelete==false) { => 줄여쓴거

    if (!confirmDelete) {
        //false 일때 return 으로 함수 종료 시킴
        return
    }
    console.log(i)
    //API를 부를 때 부르는 셋트 / 뭐든지간에 문제가생기면 catch로 가라
    //awit를 쓰려면 async 있어야 함. 지금 몰라도 됨.
    try {
        // DELETE 요청을 보냅니다.
        // : 안써도 되는 이유 => 백엔드에서 파리미터를 받는 방법이라 백엔드에서 넣었고
        //연결 이라기보단 백에드에 있는 라우터를 호출하는거라서 : 프론트에서는 값만 넣어주면 돼서 : 없어야 함
        await fetch(`http://localhost:8080/users/${i}`, {
            method: "DELETE",
        })

        // 서버 응답이 성공인 경우
        // users.splice(i, 1)
        // console.log(users)
        // // deleteButtons[i].splice(i,1)
        // console.log(deleteButtons)
        getUsers()
        // setting()
    } catch (error) {
        // 네트워크 오류 등 예외 처리
        console.error("네트워크 오류:", error)
    }
}

getUsers()
let users = []
async function getUsers() {
    const res = await fetch("http://localhost:8080/users")
    const data = await res.json() // 그냥 이 2코드 같이 있어야지 데이터받을 수있음.
    users = data
    console.log(users)
    makeList()
    //배열안에 객체가 들어있음.
}
