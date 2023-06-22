import { renderMovieHtml, setLocalStorage, getLocalStorage } from "./utils.js"

let watchlistArray = []
window.addEventListener("load", () => {
  watchlistArray = getLocalStorage()

  renderMovieHtml(watchlistArray)
  let removeIcons = document.querySelectorAll(".fa-plus")
  let watchlistSpan = document.querySelectorAll(".watchlist-span")
  watchlistSpan.forEach((span) => {
    span.textContent = "Remove"
  })
  removeIcons.forEach((icon) => {
    icon.classList.remove("fa-plus")
    icon.classList.remove("add-movie")
    icon.classList.add("fa-minus")
    icon.addEventListener("click", (e) => {
      const section = icon.closest("section")
      const hr = section.nextElementSibling
      section.remove()
      hr.remove()

      watchlistArray = watchlistArray.filter((movie) => {
        return movie.imdbID !== e.target.dataset.id
      })

      setLocalStorage(watchlistArray)
    })
  })
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
