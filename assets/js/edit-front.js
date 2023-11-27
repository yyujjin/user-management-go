//화면에 in뭐냐

getUsers()

//첫 화면

let user = null
//go=> nil  java=> null 이건 비어있어서 들어가는 데이터타입이 곧 변수가 됨
async function getUsers() {
    const a = location.search // ?id=1
    // a.slice(1) //id=1  => 이렇게 하려면 a = a.slice(1) 이렇게 다시 해줘야 함
    //이거 안해도 되는데? 굳이 하는 이유는? 안해도 됨. 그저예시였음.
    b = a.split("=") //b [id,1]
    // console.log(b)
    //왜 이건또 쿼리로 넘기지?
    // `http://localhost:8080/users/${i}` 이렇게로도 넘길수있는거 아닌갑?? 차이가 뭐지? 그냥 쿼릴로 넘긴거임.
    const res = await fetch(`http://localhost:8080/get?id=${b[1]}`)
    const data = await res.json()
    user = data
    console.log(user)
    const input = document.querySelectorAll("input")
    input[0].value = user.Name
    input[1].value = user.Age
    if (user.Gender == 0) {
        input[2].checked = true
    } else {
        input[3].checked = true
    }
    input[4].value = user.Job
}

//form에다가 에드이벤 적용한 이유는 submit 버튼이 form 안에 포함돼있어서 한거
//버튼은 그냥 클릭이 될 뿐 제출이 되는게 아니라서 
//form submit 으로 에드이벤트 넣은거 
const form = document.querySelector("form")
form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("!!!!!!!!!!!!!!!!")
}) 



//form은 method는 get,post만 됨
//form 의 기본기능은 submit버튼을 누르면 서버에 데이터를 전달하고 새로고침이 되는 것. 
// submit을 누르면 form 기본 동작은 하지 않도록 막기
// 1. form에다가 submit 이벤트를 연결하는 코드를 추가
// 2. 구글 검색해서 기본 동작 막는법 적용하기

// await fetch(`http://localhost:8080/edit/${}`, {
//     method: 'PUT',
//     headers: 'Content-Type:application/x-www-form-urlencoded',
//     body: {} // TODO
// })
