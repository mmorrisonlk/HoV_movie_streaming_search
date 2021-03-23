// function getApi() {
//     var requestUrl = 'https://api.watchmode.com/v1/sources/?apiKey=qLhxA5ohxomvRUeMjoEH4Nfun3H6Bwos6e8h5xtb';

//     fetch(requestUrl)
//         .then(function(response) {
//             console.log(response)
//             return response.json();
//         });
// };

// const fetch = require('node-fetch');

// let url = 'https://api.watchmode.com/v1/title/345534/details/?apiKey=qLhxA5ohxomvRUeMjoEH4Nfun3H6Bwos6e8h5xtb';
// function getApi(){
// fetch(url, { method: 'Get' })
//     .then((res) => res.json())
//     .then((json) => {
//         console.log(json);
//     });
// };

// getApi()

let searchForm = $("#searchForm");
let searchMovie = $('#search-input');
let searchButton = $('.btn-info');
let moviesArea = $('#movie-container');
let movieTitle = $('#movie-title');
let moviePicture = $('#movie-picture');
let movieVideo = $('#movie-video');
let movies="";
// let mKeyword="";

// $(document).ready(function() {
//     searchForm.on('submit', (e) => {
//         console.log(searchMovie).val();
//         e.preventDefault();
//     });
// });

const searchAPI = "2ae52f27dbb481080bd1f2c839a0d6d7";

searchButton.on('click', init);

function init(event) {
    event.preventDefault();
    let movies = searchMovie.val();
    searchMovies(movies);
    
}

function searchMovies(movies) {
    let searchValue = searchMovie.val();
    const addedUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + searchAPI + "&language=en-US&page=1&query=" + searchValue;
    // let searchUrl = "https://api.watchmode.com/v1/search/?apiKey=" +searchAPI+ "&search_field=name&search_value=Ed%20Wood";
    
    fetch(addedUrl)
        .then(function (response){
            console.log(response);
            return response.json();
            
        })
        .then(function(data){
            console.log(data);
            console.log(data.results[0].overview)
            // document.getElementById("movieDescription").innerHTML = data.results[0].overview
            for(var i = 0; i < 1; i++) {
                let searchedMovies = data.results[i].original_title;
                movieTitle.text(searchedMovies + "text");
                
                document.getElementById("movieDescription").innerHTML = data.results[0].overview
            }
            // let searchedMovies = data.title_results[0].resultType;
            // let searchedMovies = data.results[i].original_title;
            // movieTitle.text(searchedMovies);
            // movieTitle.text(searchedMovies + "text");

        })

}

// console.log(data.results[0].overview)
