
//√ fetch the monsters
    //√ Build out "card" that contains name, age, description
    //√ load the first 50 to the DOM
//√ build monster form
    //√ load monster form
    // add event listener that posts form data 
// add event listener for buttons that loads the next 50 monsters

const MONSTERS_URL = "http://localhost:3000/monsters"
let currentPage = 1

document.addEventListener("DOMContentLoaded", () => {
    loadnewMonsterForm()
    loadMonsters(1)

})

// Submit Monster Listener

document.addEventListener('submit', (e)=> {
    e.preventDefault()

    const form = e.target

    const name = form.name.value
    const age = form.age.value
    const description = form.description.value

    const monster = {
        name: name,
        age: age,
        description: description
    }

    fetch(MONSTERS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify(monster)
    })
    .then(response=> console.log("MonsterSubmitted"))
})

// Monster Form

let loadnewMonsterForm = () =>{
    let monsterFormContainer = document.getElementById("monster-container")
    let monsterForm = document.createElement('form')
    monsterForm.name = "new-monster"
    monsterForm.id = "new-monster"
    monsterFormContainer.append(monsterForm)
    
    monsterForm.innerHTML = `
    <label>Name: </label>
    <input type="text" name="name">
    <br>
    <label>Age: </label>
    <input type="text" name="age">
    <br>
    <label>Description: </label>
    <input type="text-area" name="description">
    <br>
    <input type="submit" value="Add Monster">
    `

}

// More Monsters Button
document.addEventListener('click',(e)=>{
    
    let monsterContainer = document.getElementById("monster-container")
    if (e.target.id==="forward"){
        monsterContainer.innerHTML = ""
        loadnewMonsterForm()
        loadMonsters(currentPage + 1)
        currentPage++
    }
    if (e.target.id ==="back"){
        monsterContainer.innerHTML = ""
        loadnewMonsterForm()
        loadMonsters(currentPage - 1)
        currentPage--
    }
})

// Loading Monsters to the page

let loadMonsters = (number) => {
    fetch(`${MONSTERS_URL}/?_limit=50&_page=${number}`)
    .then(r => r.json())
    .then(makeMonsterCards)
}

let makeMonsterCards = (monsters) => {
    monsters.forEach( monster => makeSingleMonsterCard(monster))
}

let makeSingleMonsterCard = (monster) => {
    let monsterContainer = document.getElementById("monster-container")

    let newMonsterDiv = document.createElement('div')
    newMonsterDiv.dataset.id = monster.id
    newMonsterDiv.innerHTML = `
    <h4>${monster.name}</h4>
    <br>
    <p>${monster.age}</p>
    <p>${monster.description}</p>
    `
    monsterContainer.append(newMonsterDiv)
}