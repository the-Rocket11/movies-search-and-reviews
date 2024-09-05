const url = new URL (location.href)
const movieId = url.searchParams.get('id')
const movieTitle = url.searchParams.get('title')
const APILINK = 'http://localhost:8000/api/v1/reviews'

const main = document.getElementById('section')
const title = document.getElementById('title')

title.innerText = movieTitle

const div_new = document.createElement('div')
const new_review = 'review'
const new_user = 'user'

div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
        New Review
        <p><strong>Review: </strong>
          <input type="text" id="${new_review}" value="">
        </p>
        <p><strong>User: </strong>
          <input type="text" id="${new_user}" value="">
        </p>
        <p>
          <a href="#" onclick="saveNewReview('${movieId}', '${new_review}', '${new_user}')">&#128190</a>
` 
main.appendChild(div_new)

returnReviews(APILINK)

function returnReviews (url) {
  fetch(url + '/movie/' + movieId)
    .then(res => res.json())
    .then(function (data) {
      console.log(data)
    
      data.forEach(review => {
        const div_card = document.createElement('div')
        div_card.innerHTML = `
          <div class='row'>
            <div class='column'>
              <div class='card' id='${review._id}'>
                <p><strong>Review: </strong>${review.review}</p>
                <p><strong>User: </strong>${review.user}</p>
                <p>
                  <a href='#' onclick="editReview('${review._id}', '${review.review}', '${review.user}')">&#9999</a>
                  <a href='#' onclick="deleteReview('${review._id}')">&#128465</a>
                </p>
              </div>
            </div>
          </div>
        `
        main.appendChild(div_card) 
      })
      })
}

function editReview (id, review, user) {
  const element = document.getElementById(id)
  const reviewInputId = 'review'
  const userInputId = 'user'

  element.innerHTML = `
    <p><strong>Review: </strong>
      <input type='text' id='${reviewInputId}' value='${review}'>
    </p>
    <p><strong>User: </strong>
      <input type='text' id='${userInputId}' value='${user}'>
    </p>
    <p>
      <a href='#' onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">&#128190</a>
    </p>
  `
}
 
function saveReview (reviewInputId, userInputId, id) {
  const review = document.getElementById(reviewInputId).value
  const user = document.getElementById(userInputId).value

  console.log(review)
  console.log(user)

  fetch(APILINK + '/' + id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, *//*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'_id': id, 'user': user, 'review': review})
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    location.reload()
  })
}

function saveNewReview (movieId, review, user) {
  const new_review = document.getElementById(review).value
  const new_user = document.getElementById(user).value

  fetch(APILINK + '/new', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({movieId: movieId, review: new_review, user: new_user})
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    location.reload()
  })

}
 function deleteReview (id) {
  fetch (APILINK + '/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'_id': id})
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    location.reload()
  })
 }
