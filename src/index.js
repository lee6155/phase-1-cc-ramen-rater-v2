
let mainImage = document.getElementsByClassName('detail-image')
let foodName = document.getElementsByClassName('name')
let restaurant = document.getElementsByClassName('restaurant')
let rating = document.getElementById('rating-display')
let comment = document.getElementById('comment-display')


function main () {
  document.addEventListener('DOMContentLoaded', function displayRamens () {
    fetch('http://localhost:3001/ramens')
    .then(resp => resp.json())
    .then(function(data){
      let imageSection = document.getElementById('ramen-menu')
      data.forEach(function(object){
        let imageTag = document.createElement('img')
        imageTag.setAttribute('src',`${object.image}`)
        imageTag.setAttribute('id',`${object.id}`)
        imageSection.append(imageTag)
      })

      mainImage[0].src = `${data[0].image}`
      foodName[0].textContent = `${data[0].name}`
      restaurant[0].textContent = `${data[0].restaurant}`
      rating.textContent = `${data[0].rating}`
      comment.textContent = `${data[0].comment}`
    })
  });

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
      fetch('http://localhost:3001/ramens', configurationObject)
      .then(resp => resp.json())
    })
  }

  addSubmitListener()
}

main()


let newArray = []

function handleClick () {
  document.addEventListener('click', function(e) {
    let select = e.target.closest('img')
    newArray.push(select.id)
    fetch(`http://localhost:3001/ramens/${select.id}`)
    .then(resp => resp.json())
    .then(function(data) {
      mainImage[0].src = `${data.image}`
      foodName[0].textContent = `${data.name}`
      restaurant[0].textContent = `${data.restaurant}`
      rating.textContent = `${data.rating}`
      comment.textContent = `${data.comment}`
    })
  })  
}

handleClick()


function updateRamen () {
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
    fetch(`http://localhost:3001/ramens/${newArray[(newArray.length)-1]}`, configurationObject2)
    .then(resp => resp.json())
  })
}

updateRamen()


function deleteRamen () {
  let deleteButton = document.getElementById('delete-button')
  deleteButton.addEventListener('click', function() {
    fetch(`http://localhost:3001/ramens/${newArray[(newArray.length)-1]}`,{
      method: 'DELETE',
    })
    .then(resp => resp.json())
  })
}

deleteRamen()


// Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// };
