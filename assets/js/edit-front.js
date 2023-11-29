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
    await fetch(`http://localhost:8080/edit/${id}`, {
        method: "PUT",
        body: new FormData(form), // TODO
    })
    location.href = `http://localhost:8080/list`
})
