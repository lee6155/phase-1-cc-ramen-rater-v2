
function main () {
  document.addEventListener('DOMContentLoaded', function displayRamens () {
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
    })
  });

  function addSubmitListener () {
    let form = document.getElementById('new-ramen')
    form.addEventListener('submit', function(e) {
      e.preventDefault()
      const configurationObject = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "id": "6",
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

  addSubmitListener()
}

main()


function handleClick () {
  document.addEventListener('click', function(e) {
    const select = e.target.closest('img')
    fetch(`http://localhost:3000/ramens/${select.id}`)
    .then(resp => resp.json())
    .then(function(data) {
      let mainImage = document.getElementsByClassName('detail-image')
      mainImage[0].src = `${data.image}`

      let foodName = document.getElementsByClassName('name')
      foodName[0].textContent = `${data.name}`

      let restaurant = document.getElementsByClassName('restaurant')
      restaurant[0].textContent = `${data.restaurant}`

      let rating = document.getElementById('rating-display')
      rating.textContent = `${data.rating}`

      let comment = document.getElementById('comment-display')
      comment.textContent = `${data.comment}`
    })
  })  
}

handleClick()


// Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// };
