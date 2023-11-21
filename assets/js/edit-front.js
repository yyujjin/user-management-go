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