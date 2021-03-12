const url = "https://api.themoviedb.org/3/trending/all/day?api_key=0e80477047d92b904f4f7b9c6ab7d3b0"

let movieWrapper = document.querySelector(".movies-wrapper")


let output1 = "";





var date = new Date('4-1-2015'); // M-D-YYYY

var y = date.getFullYear();
console.log(y)




function displayMovie() {
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let data = result.results;
      console.log(data)



      data.forEach((item, i) => {

        let path = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

        let movieItem = `
    
    <div class="movie-item">
    <a href ="#" onclick="movieSelected('${data[i].id}')">
        <img src = "${path}">
        </a>
      <div class="movie-info">
      <h4>${item.title}</h4>
      <h4 class="rating"> ${item.vote_average}</h4>
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

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'details.html';
  return false;
}

let output2 = "";

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=0e80477047d92b904f4f7b9c6ab7d3b0')
    .then(response => response.json())
    .then(result => {
      let data = result

      console.log(data)

      let path = `https://image.tmdb.org/t/p/w342/${data.poster_path}`
      let backdropPath = `https://image.tmdb.org/t/p/w342/${data.backdrop_path}`
      let date = new Date(data.release_date);
      let movieItem = `
      <div class = "movie-card" style = "background: url(${backdropPath});background-repeat:no-repeat;background-position:center center;background-size:cover;width:100%;">
        <img class="image-cover" src = "${path}">
        <div class="text-box">
        <h1 class ="heading">${data.title} <span class="year" >(${date.getFullYear()})</span></h1>

         <div class="extra-info" >
         <p> ${data.genres[0].name}<span>&#10023;</span></p>  <p> ${data.genres[1].name}<span>&#10023;</span></p> <p> ${data.genres[2].name}<span>&#10023;</span></p>
         </div>

         <div class ="overview">
         <h2>Overview:</h2>
         <p>${data.overview}</p>
         </div>

         <div class ="Date">
         <h2>Release Date:</h2>
         <p>${data.release_date}</p>
         </div>
         </div>
        </div>
      `
      output2 += movieItem
      document.querySelector('.well').innerHTML = output2
    })
    .catch((err) => {
      console.log(err);
    });



}