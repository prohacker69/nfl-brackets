// fix return button

let button = document.querySelector("#submit")
let db = firebase.firestore()
async function submitForm(e){
  e.preventDefault
  let team = document.querySelector("#input").value
let duplicate = await checkNames()
  if(!duplicate){
     db.collection("teams").add({team})
 loadTeams() 
}
  else{
    alert(" error: team already exists")
  }
  
  console.log(duplicate)
  
}

async function loadTeams(){
  document.querySelector("#input").value = ""
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
      loadTeams()
    })
    
  ])

}

window.onload = loadTeams 
async function loadUpVotes(){
  let getTeams = await db.collection("teams").get()
  getTeams.forEach(async doc => {
    let team = doc.data()
    let upvotes= await db.collection("upvotes"). where("team","==", team.team).get()
    document.querySelector(`#A${team.team}`).innerHTML = upvotes.docs.length
  })
}

async function checkNames(){
  let isThere = false
  let getTeams = await db.collection("teams").get()
  getTeams.forEach(async doc => {
    let name = doc.data()
    let team = name.team. toUpperCase()
    
    let input = document.querySelector("#input").value.toUpperCase()
    console.log(team)
    console.log(input)
    if(team == input){
      isThere = true
    }
  })
  return isThere

}
