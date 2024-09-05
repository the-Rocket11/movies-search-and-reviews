const APILINK = 'https://api.themoviesdb.org/3/discover/movie?sort_by=popularity.desc'
const IMG_PATH = 'https://images.tmdb.org/t/p/w1280'
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?query='
const main = document.getElementById('section')
const form = document.getElementById('form')
const search = document.getElementById('query')

function loadPage () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWMyYzBhYWU5M2I2YjZjZDRhNDgxZmExYzM1MTgwZSIsIm5iZiI6MTcyMzQ5NzA1My43MDA2MDIsInN1YiI6IjY2YWM3YWFhMzdjMjc4ZDYyYWJkNGQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q3bZeC2n8ddKWx3Z_RbCEzqvqH9b92jA43jq2uybslw'
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc', options)
    .then(res => res.json())
    .then(function (data) {
      console.log(data.results)
      data.results.forEach(element => {
        const div_row = document.createElement('div')
        div_row.setAttribute('class', 'row')
        const div_column = document.createElement('div')
        div_column.setAttribute('class', 'column')
        const div_card = document.createElement('div')
        div_card.setAttribute('class', 'card')
        const title = document.createElement('h3')
        const image = document.createElement('img')
        image.setAttribute('src', '')
        image.setAttribute('class', 'thumbnail')
        const center = document.createElement('center')

        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`
        image.src = IMG_PATH + element.poster_path

        center.appendChild(image)
        div_card.appendChild(center)
        div_card.appendChild(title)
        div_column.appendChild(div_card)
        div_row.appendChild(div_column)
        main.appendChild(div_row)
      })
    })
    console.log('Funcionou')
}

loadPage()

form.addEventListener('submit', e =>  {
  e.preventDefault()
  main.innerHTML = ''
  const searchItem = search.value
  if (searchItem == '') {
    window.alert('Preencha o campo de pesquisa')
  } else {
    const SEARCHKEY = searchItem + '&include_adult=false&language=en-US&page=1'
    returnMovies(SEARCHAPI + SEARCHKEY)
    search.value = ''
  }
})

function returnMovies (url) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWMyYzBhYWU5M2I2YjZjZDRhNDgxZmExYzM1MTgwZSIsIm5iZiI6MTcyMzQ5NzA1My43MDA2MDIsInN1YiI6IjY2YWM3YWFhMzdjMjc4ZDYyYWJkNGQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q3bZeC2n8ddKWx3Z_RbCEzqvqH9b92jA43jq2uybslw'
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(function (data) {
      console.log(data.results)
      data.results.forEach(element => {
        const div_row = document.createElement('div')
        div_row.setAttribute('class', 'row')
        const div_column = document.createElement('div')
        div_column.setAttribute('class', 'column')
        const div_card = document.createElement('div')
        div_card.setAttribute('class', 'card')
        const title = document.createElement('h3')
        const image = document.createElement('img')
        image.setAttribute('src', '')
        image.setAttribute('class', 'thumbnail')
        const center = document.createElement('center')

        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`
        image.src = IMG_PATH + element.poster_path

        center.appendChild(image)
        div_card.appendChild(center)
        div_card.appendChild(title)
        div_column.appendChild(div_card)
        div_row.appendChild(div_column)
        main.appendChild(div_row)
      })
      })
}
