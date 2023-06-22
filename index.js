import { renderMovieHtml, setLocalStorage } from "./utils.js"
const movieSection = document.getElementById("movie-section")
const input = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")
const url = `http://www.omdbapi.com/?apikey=${API_KEY}&`
let movieArray = []
let watchlistArray = []

searchBtn.addEventListener("click", () => {
  movieSection.innerHTML = ""
  fetch(`${url}s=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      movieArray = data.Search

      const fetchPromises = movieArray.map((movie) =>
        fetch(`${url}i=${movie.imdbID}`).then((response) => response.json())
      )

      Promise.all(fetchPromises).then((dataArray) => {
        movieArray = dataArray

        renderMovieHtml(movieArray)
      })
    })
})

document.addEventListener("click", (e) => {
  for (let movie of movieArray) {
    if (
      movie.imdbID === e.target.dataset.id &&
      e.target.classList.contains("add-movie")
    ) {
      watchlistArray.push(movie)
      setLocalStorage(watchlistArray)
    }
  }
})

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-more")) {
    const readMore = e.target
    const parent = readMore.parentNode
    const fakeEllipsis = e.target.previousSibling

    const additionalPlot = e.target.nextElementSibling
    fakeEllipsis.style.display = "none"
    readMore.style.display = "none"
    additionalPlot.style.display = "block"
    let fulltext = parent.getAttribute("data-full")
    parent.textContent = fulltext
  }
})
