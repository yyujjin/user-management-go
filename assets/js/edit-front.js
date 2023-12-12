const id = getId()
let user = null

getUsers()

// url에서 id를 뽑아오는 함수 만들기 -> id를 리턴

function getId() {
    const a = location.search
    const b = a.split("=")
    return b[1]
}

async function getUsers() {
    const res = await fetch(`http://localhost:8080/get?id=${id}`)
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

const form = document.querySelector("form")
form.addEventListener("submit", async function (event) {
    event.preventDefault()
    //html 에서 form 을 적을때만 get,post가능하고 이외에는 method 상관없음.
    console.log(new FormData(form))
    //http://localhost:8080/edit/${id}?name=a&age=30&a...`, 
    //1. 이런식으로 데이터를 쿼리스트링으로 주소뒤에 포함시켜서 같이 넘기는 방법도 있고 
    await fetch(`http://localhost:8080/edit/${id}?name=dd&age=3`, {
        method: "PUT",
//form 데이터를 자바스크립트로 보내려면 이렇게 하면 됨. 
//2. body에 담아서 보내는 방법도 있음. 
//굳이 ㅣbody에 담아서 보내는 이유는? 주소는 적을 수 있는 길이가 한정이 되어있다. 
//바디에 넣을 수 있는 값은 주소에 포함해서 보내는 것보다 데이터를 훨씬 더 많이 보낼 수 있음. 
//그래서 user id 만 하는 간단한거면 쿼리만 해도 되지만 상황에 따라 주소가 너무 길어지면 안보내질수있기에
//수정이나 사용자 등록은 body를 쓰는게 좋음. 
//get, post => 클라이언트가 서버에게 요청할 때 쓰는 방법
//get =>  조회를 요청,body 아예 쓸수 없음 (용도 자체가 아님) post=>등록을 요청 body 쓸수있음 , get 보다 보낼 수 있는 양이 많은 

        body: new FormData(form), // TODO
    })
    location.href = `http://localhost:8080/list`
})


