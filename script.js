console.log(firebase)
let button = document.querySelector("#submit")
button.addEventListener("click",()=>{
  console.log("You clicked me!")
  let team = document.querySelector("#input").value
  console.log(team)
  firebase.database().ref("/").push(team)
})