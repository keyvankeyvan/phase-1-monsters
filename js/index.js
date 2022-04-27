window.addEventListener('DOMContentLoaded',() => {
    addNewMonsterForm()
    //const data = monsterFetch()
    
    fetch (`http://localhost:3000/monsters`)
    .then((response) => response.json())
    .then((data) => {
        loadFifty(data)
        buttonLogic(data)
    })

    //console.log(data)
    
})

function addNewMonsterForm(){
    const monsterForm = document.getElementById('create-monster')
    const newMonst = document.createElement('form')
    newMonst.id = 'mainForm'
    newMonst.addEventListener('submit', (e) => submitHandler(e))
    
    //name
    const newName = document.createElement('input')
    newName.type = 'text'
    newName.id = 'newName'
    newName.value = 'NAME?'
    newMonst.append(newName)
    
    //age
    const newAge = document.createElement('input')
    newAge.type = 'text'
    newAge.id = 'newAge'
    newAge.value = 'AGE?'
    newMonst.append(newAge)

    //description
    const newDesc = document.createElement('input')
    newDesc.type = 'text'
    newDesc.id = 'newDesc'
    newDesc.value = 'DESCRIPTION?'
    newMonst.append(newDesc)

    //createmonster button
    const newBtn = document.createElement('input')
    newBtn.type = 'submit'
    newBtn.id = 'newBtn'
    newBtn.form = 'mainForm'
    newBtn.value = 'SUBMIT'
    newMonst.append(newBtn)

    monsterForm.append(newMonst)
}

function submitHandler(event) {
    event.preventDefault()

    ///////// BELOW POSTS
    const formData = {
        name: event.target.newName.value,
        age: event.target.newAge.value,
        description: event.target.newAge.value
    };

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/monsters", configObj)
    ///////// ABOVE POSTS
}

function loadFifty(data) {
    let monsterID = 0
    const arrLen = data.length
    const monstCont = document.getElementById('monster-container')

    for (let i = 0; i < 50; i++) {
        const newCard = document.createElement('container')
        newCard.id = i
        newCard.append(document.createElement('p'))
        newCard.append(`NAME: ${data[i].name}`)
        newCard.append(document.createElement('br'))
        newCard.append(`AGE: ${data[i].age}`)
        newCard.append(document.createElement('br'))
        newCard.append(`DESCRIPTION: ${data[i].description}`)
        newCard.append(document.createElement('br'))

        monstCont.append(newCard)
    }
}

function monsterFetch() {
    fetch (`http://localhost:3000/monsters`)
    .then((response) => response.json())
    .then((data) => data)
}

function buttonLogic(data){
    const docBtns = document.getElementsByTagName('button')
    for (btn of docBtns){
        btn.addEventListener('click', (e) => prevNextFifty(e, data))
    }
}

function prevNextFifty(event, data) {
    const currentMonsts = document.getElementsByTagName('container')
    const lastMonst = parseInt(currentMonsts[49].id)
    
    const monstCont = document.getElementById('monster-container')
    monstCont.innerHTML = ''
    if(event.target.id === 'forward'){
        for (let i = lastMonst + 1; i < lastMonst + 51; i++) {
            console.log(i)
            const newCard = document.createElement('container')
            newCard.id = i
            newCard.append(document.createElement('p'))
            newCard.append(`NAME: ${data[i].name}`)
            newCard.append(document.createElement('br'))
            newCard.append(`AGE: ${data[i].age}`)
            newCard.append(document.createElement('br'))
            newCard.append(`DESCRIPTION: ${data[i].description}`)
            newCard.append(document.createElement('br'))
    
            monstCont.append(newCard)
        }
    } else if(event.target.id === 'back'){
        for (let i = lastMonst - 99; i < lastMonst - 49; i++) {
            const newCard = document.createElement('container')
            newCard.id = i
            newCard.append(document.createElement('p'))
            newCard.append(`NAME: ${data[i].name}`)
            newCard.append(document.createElement('br'))
            newCard.append(`AGE: ${data[i].age}`)
            newCard.append(document.createElement('br'))
            newCard.append(`DESCRIPTION: ${data[i].description}`)
            newCard.append(document.createElement('br'))
    
            monstCont.append(newCard)
        }
    }

}