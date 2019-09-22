let button = document.querySelector("#submit")
button.addEventListener("click",()=>{
  console.log("You clicked me!")
  let team = document.querySelector("#input").value
  firebase.database().ref("/").push(team)
loadTeams()
})

function loadTeams(){
  console.log('hi')
  firebase.database().ref("/").on("value",(snapshot)=>{
 console.log(snapshot)
  let data = snapshot.val()
console.log(data)
    for(let keys in data) {
      document.querySelector(".list").innerHTML += `<div>${data[keys]}</div>`
    }
})
}

