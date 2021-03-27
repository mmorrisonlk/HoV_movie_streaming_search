const searchAPI = "2ae52f27dbb481080bd1f2c839a0d6d7";
const watchAPI = "qLhxA5ohxomvRUeMjoEH4Nfun3H6Bwos6e8h5xtb";
let searchForm = $("#searchForm");
let searchMovie = $('#search-input');
let searchButton = $('.btn-info');
let moviesArea = $('#movie-container');
let movieTitle = $('#movie-title');
let moviePicture = $('#movie-picture');
let movies = "";
let modalBody = $('.modal-content');
var movieBlocks = document.getElementById("movieResults");
var searchedMovies = "";
var searchedMoviesID = "";
var watchModeId = "";
var movieSources = "";
var sources = "";
var SourcesName = "";

function popularMovies() {
    const requestUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + searchAPI + "&language=en-US&page=1";

    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).then(function (response) {
        for (i = 0; i < 20; i++) {
            let popularMoviePosters = "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path;
            var banner = document.getElementById("banner");
            var anchor = document.createElement("a");
            anchor.classList.add('carousel-item');
            var image = document.createElement("img");
            image.src = popularMoviePosters;
            anchor.appendChild(image);
            banner.appendChild(anchor);
        };
        // remove placeholder image
        var clean = document.getElementById("clean");
        clean.parentNode.removeChild(clean);

        // Reinitialize carousel
        var elems2 = document.querySelectorAll('.carousel');
        var instances2 = M.Carousel.init(elems2);
    });
};

$(document).ready(function () {
    $('.carousel').carousel();
    popularMovies();
    watchmodeSourcesSearch();
});

$(".dropdown-trigger").dropdown();
searchButton.on('click', init);

function init(event) {
    event.preventDefault();
    let movies = searchMovie.val();
    searchMovies(movies);
}

function searchMovies(movies) {
    let searchValue = searchMovie.val();
    const addedUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + searchAPI + "&language=en-US&page=1&query=" + searchValue;

    fetch(addedUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            movieBlocks.innerHTML = "";
            for (var i = 0; i < Math.min(data.results.length, 5); i++) {

                let searchedMovies = data.results[i].original_title;

                movieBlocks.innerHTML += `
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">

                    <img id="`+ i +`posterImage"></img>
                    <span id="`+ i +`movieTitles" class="card-title"></span>
                    <p id="`+ i +`movieDescription"></p>
                    </div>

                  <div class="card-action" id="`+ data.results[i].id +`sourceName">
                  </div>
                </div>
                </div>
                `;

                let div = document.createElement('div');

                $(div).addClass("movie-div");

                if (data.results[i].poster_path == null) {
                    moviePicture = [];
                } else {
                    document.getElementById(i + "posterImage").src = 'https://image.tmdb.org/t/p/w500/' + data.results[i].poster_path;
                };

                document.getElementById(i + "movieDescription").innerHTML = data.results[i].overview;
                document.getElementById(i + "movieTitles").innerHTML = data.results[i].original_title;
                watchmodeID(data.results[i].id);
        };
    });
};

function watchmodeID(movieId) {
    const watchUrl = 'https://api.watchmode.com/v1/search/?apiKey=' + watchAPI + '&search_field=tmdb_movie_id&search_value=' + movieId;

    $.ajax({
        url: watchUrl,
        method: 'GET',
    }).then(function (response) {
        watchModeId = [];
        for (var i = 0; i < response.title_results.length; i++) {
            watchModeId.push(response.title_results[i].id);
            movieSource(watchModeId[i], movieId);
        };
    });
};

function movieSource(watchId, movieId) {
    const watchIdUrl = 'https://api.watchmode.com/v1/title/' + watchId + '/sources/?apiKey=' + watchAPI + '&regions=US';

    $.ajax({
        url: watchIdUrl,
        method: 'GET',
    }).then(function (response) {
        movieSources = [];
        let moviesName = [];
        let sourceNameHtml = "";
        for (var i = 0; i < response.length; i++) {
            if (movieSources.indexOf(response[i].source_id)== -1) {
                movieSources.push(response[i].source_id);
                let sourceName = getMovieSourceName(response[i].source_id);
                sourceNameHtml += `<a>`+ sourceName +`</a>`;
            };
        };

        document.getElementById(movieId + "sourceName").innerHTML = sourceNameHtml;
    });
};

function getMovieSourceName (sourceId) {
    for (var i = 0; i < sources.length; i++) {
        if (sourceId == sources[i].id)
        return sources[i].name;
    };
};

function watchmodeSourcesSearch() {
    const sourcesUrl = "https://api.watchmode.com/v1/sources/?apiKey=" + watchAPI + "&types=subscription,purchase&regions=US";

    $.ajax({
        url: sourcesUrl,
        method: 'GET',
    }).then(function (response) {
        sources = response;
    });
};