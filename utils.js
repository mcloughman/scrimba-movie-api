const movieSection = document.getElementById("movie-section")

let watchlistArray = []

function renderMovieHtml(arrayOfMovies) {
  for (let movie of arrayOfMovies) {
    const { Title, Runtime, imdbRating, Plot, Poster, Genre, imdbID } = movie
    const movieContainer = document.createElement("section")
    movieContainer.classList.add("movie-container")
    movieContainer.innerHTML = `
                  <img src=${Poster} alt="poster" class="poster-img"/>
                  <div class="movie-details">
                    <div class="title-div">
                        <h4>${Title}</h4>
                        <span class="rating-span">
                        <i class="fa-solid fa-star"></i>${imdbRating}</span>
                    </div>
                    <div class="meta-div">
                        <span>${Runtime}</span>
                        <span>${Genre}</span>
  
                        <i class="fa-solid fa-plus add-movie" id="fa-plus" data-id=${imdbID}></i><span class="watchlist-span" data-id=${imdbID}>Watchlist</span>
                    </div>
                    <p data-full="${Plot}">
                        ${createPlotSubstring(Plot, 130)}
                        <span class="additional-plot">${Plot.substring(
                          130
                        )}</span>
                    </p>
                    
                    
                    </section>
    
                        `
    movieSection.append(movieContainer)
    const hr = document.createElement("hr")
    movieSection.append(hr)
  }
}

function setLocalStorage(arr) {
  localStorage.setItem("watchlist", JSON.stringify(arr))
}

function getLocalStorage() {
  watchlistArray = JSON.parse(localStorage.getItem("watchlist"))
  return watchlistArray
}

function createPlotSubstring(str, maxLength) {
  if (str.length < maxLength) {
    return str
  }
  return `${str.substring(
    0,
    maxLength
  )}<span class="fake-ellipsis">...</span><span class="read-more">Read more</span>`
}

export {
  renderMovieHtml,
  setLocalStorage,
  getLocalStorage,
  createPlotSubstring,
}
