let button = document.querySelector("#submit")
let db = firebase.firestore()
button.addEventListener("click",()=>{
  let team = document.querySelector("#input").value
  db.collection("teams").add({team})
loadTeams()
  document.querySelector("#input").value = ""
})

async function loadTeams(){
  document.querySelector(".list").innerHTML= ''
  let allTeams = await db.collection("teams").get()
  allTeams.forEach(doc => {
    let team = doc.data()
      document.querySelector(".list").innerHTML += `
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${team.team}</span>

        </div>
        <div class="card-action">
          <a id = "${team.team}" href="#" class="upvote">upvote</a>
          <a id = "A${team.team}" href="#" class="upvote"></a>

        
        </div>
      </div>
    </div>`
    
    loadUpvoteButtons()
  loadUpVotes()
  })
  

}
function loadUpvoteButtons(){
let upvoteButtons = document.querySelectorAll(".upvote")
upvoteButtons.forEach(button =>[
    button.addEventListener("click",(e)=>{
      db.collection("upvotes").add({
        team: e.target.id
      })
    })
    
  ])

}

window.onload = loadTeams 
async function loadUpVotes(){
  let getTeams = await db.collection("teams").get()
  console.log(getTeams)
  getTeams.forEach(async doc => {
    let team = doc.data()
    let upvotes= await db.collection("upvotes"). where("team","==", team.team).get()
    console.log(upvotes)
    document.querySelector(`#A${team.team}`).innerHTML = upvotes.docs.length
  })
}

