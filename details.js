const url = "https://api.themoviedb.org/3/trending/all/day?api_key=0e80477047d92b904f4f7b9c6ab7d3b0"
const url_details = "https://api.themoviedb.org/3/movie/157336?api_key=0e80477047d92b904f4f7b9c6ab7d3b0&append_to_response=videos"


let movieWrapper = document.querySelector(".movies-wrapper")
let loadMovie = document.querySelector(".loadMovie")

//setup listener for loadMovie
loadMovie.addEventListener('click', () => {
  console.log(loadMovie)
})

function displayDetails() {
  fetch(url_details)
    .then(response => response.json())
    .then(result => {
      let data = result
      console.log(data)
    })
}
displayDetails();


let output1 = "";
let output2 = "";



function displayMovie() {
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let data = result.results;
      console.log(data)
      data.forEach(item => {

        let path = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
        let movieDetails = `https://api.themoviedb.org/3/movie/${item.id}?api_key=0e80477047d92b904f4f7b9c6ab7d3b0&append_to_response=videos`


        let movieItem = `
    
    <div class="movie-item">
    
      <div class="image-cover"
        style="background-image: url(${path})">
      </div>
    
    </div>
    
    `
        output1 += movieItem


      });
      movieWrapper.innerHTML = output1

    })
}
displayMovie();
// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
  } else {
    setTheme('theme-light');
  }
})();