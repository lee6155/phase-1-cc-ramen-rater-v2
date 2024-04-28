
// Note: my code works for the core and advanced deliverables, yet 3 tests aren't passing:
//1) handleClick: should append the correct data to the DOM
//2) handleSubmit: should add a new slider image when the submit button is clicked
//3) handleSubmit: should attach a click listener to the new element to display its details


let mainImage = document.querySelector('img')
let foodName = document.querySelector('h2')
let restaurant = document.querySelector('#ramen-detail > .restaurant')
let rating = document.getElementById('rating-display')
let comment = document.getElementById('comment-display')


function main () {
  document.addEventListener('DOMContentLoaded', displayRamens)
  document.addEventListener('DOMContentLoaded', addSubmitListener)
}
main ()


function displayRamens () {
  fetch('http://localhost:3000/ramens')
  .then(resp => resp.json())
  .then(function(data){
    let imageSection = document.getElementById('ramen-menu')
    data.forEach(function(object){
      let imageTag = document.createElement('img')
      imageTag.setAttribute('src',`${object.image}`)
      imageTag.setAttribute('id',`${object.id}`)
      imageSection.append(imageTag)
    })

    mainImage.src = `${data[0].image}`
    foodName.textContent = `${data[0].name}`
    restaurant.textContent = `${data[0].restaurant}`
    rating.textContent = `${data[0].rating}`
    comment.textContent = `${data[0].comment}`
  })
}


let newArray = []

function handleClick () {
  document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function(e) {
    let select = e.target.closest('img')
    newArray.push(select.id)
    fetch(`http://localhost:3000/ramens/${select.id}`)
    .then(resp => resp.json())
    .then(function(data) {

      mainImage.src = `${data.image}`
      foodName.textContent = `${data.name}`
      restaurant.textContent = `${data.restaurant}`
      rating.textContent = `${data.rating}`
      comment.textContent = `${data.comment}`
    })
  })
  })
}

handleClick()


function addSubmitListener () {
  let newRamen = document.getElementById('new-ramen')
  newRamen.addEventListener('submit', function(e) {
    e.preventDefault()
    const configurationObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "name": `${e.target[0].value}`,
        "restaurant": `${e.target[1].value}`,
        "image": `${e.target[2].value}`,
        "rating": `${e.target[3].value}`,
        "comment": `${e.target[4].value}`
      })
    }
    fetch('http://localhost:3000/ramens', configurationObject)
    .then(resp => resp.json())
  })
}


function updateRamen () {
  document.addEventListener('DOMContentLoaded', function() {
  let editRamen = document.getElementById('edit-ramen')
  editRamen.addEventListener('submit',function(e){
    e.preventDefault()
    rating.textContent = e.target[0].value
    comment.textContent = e.target[1].value
    
    const configurationObject2 = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "rating": `${e.target[0].value}`,
        "comment": `${e.target[1].value}`
      })
    }
    fetch(`http://localhost:3000/ramens/${newArray[(newArray.length)-1]}`, configurationObject2)
    .then(resp => resp.json())
  })
  })
}

updateRamen()


function deleteRamen () {
  document.addEventListener('DOMContentLoaded', function () {
  let deleteButton = document.getElementById('delete-button')
  deleteButton.addEventListener('click', function() {
    fetch(`http://localhost:3000/ramens/${newArray[(newArray.length)-1]}`,{
      method: 'DELETE',
    })
    .then(resp => resp.json())
  })
})
}

deleteRamen()


// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
