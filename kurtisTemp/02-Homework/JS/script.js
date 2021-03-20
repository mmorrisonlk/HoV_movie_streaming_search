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

function videos(movies) {



}

function moviePoster(movies) {

    const posterPath = data.results;
    const posters = 'https://image.tmdb.org/t/p/w500/' + posterPath;

    fetch(posters)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            for(var i=0; i < data.length; i++) {
                let posterLoop = data.results[i].poster_path;
                moviePicture.innerHtml(posterLoop)
            }
        })

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
                for(var i = 0; i = data.length; i++) {
                    let searchedMovies = data.results[i].original_title;
                    movieTitle.text(searchedMovies + "text");
                }
                // let searchedMovies = data.title_results[0].resultType;
                // let searchedMovies = data.results[i].original_title;
                // movieTitle.text(searchedMovies);
                // movieTitle.text(searchedMovies + "text");

            })

}