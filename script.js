let button = document.querySelector("#submit")
button.addEventListener("click",()=>{
  let team = document.querySelector("#input").value
  firebase.database().ref("/").push(team)
loadTeams()
  document.querySelector("#input").value = ""
})

function loadTeams(){
  document.querySelector(".list").innerHTML= ''
  firebase.database().ref("/").on("value",(snapshot)=>{
  let data = snapshot.val()
    for(let keys in data) {
      document.querySelector(".list").innerHTML += `
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${data[keys]}</span>
        </div>
        <div class="card-action">
          <a href="#" id="upvote">upvote</a>
          <a href="#" id="downvote">downvote</a>
        </div>
      </div>
    </div>`
    }
})
}

window.onload = loadTeams 
