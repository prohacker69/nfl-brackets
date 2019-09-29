let button = document.querySelector("#submit")
button.addEventListener("click",()=>{
  let team = document.querySelector("#input").value
  firebase.database().ref("/").push(team)
loadTeams()
})

function loadTeams(){
  document.querySelector(".list").innerHTML= ''
  firebase.database().ref("/").on("value",(snapshot)=>{
  let data = snapshot.val()
    for(let keys in data) {
      document.querySelector(".list").innerHTML += `<div>${data[keys]}</div>`
    }
})
}

window.onload = loadTeams 
