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
