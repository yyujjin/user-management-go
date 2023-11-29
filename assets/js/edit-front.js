
getUsers()

let user = null

async function getUsers() {
    const a = location.search 
    b = a.split("=") 
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
const form = document.querySelector("form")
form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("!!!!!!!!!!!!!!!!")
}) 

// await fetch(`http://localhost:8080/edit/${}`, {
//     method: 'PUT',
//     headers: 'Content-Type:application/x-www-form-urlencoded',
//     body: {} // TODO
// })
