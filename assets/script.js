const searchAPI = "2ae52f27dbb481080bd1f2c839a0d6d7";

function popularMovies() {
  const requestUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + searchAPI + "&language=en-US&page=1";

  $.ajax({
    url: requestUrl,
    method: 'GET',
  }).then(function (response) {
    // console.log('AJAX Response \n-------------');
    // console.log(response);
    for (i = 0; i < 10; i++) {
        let popularMoviePosters = "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path;
        // console.log(popularMoviePosters);
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

$(document).ready(function(){
  $('.carousel').carousel();
  popularMovies();
});

let searchForm = $("#searchForm");
let searchMovie = $('#search-input');
let searchButton = $('.btn-info');
let moviesArea = $('#movie-container');
let movieTitle = $('#movie-title');
let moviePicture = $('#movie-picture');
let movies="";
let modalBody = $('.modal-content')
// let modal = $(".modal-title");
// let modalVideo = $(".video");
// let modalImages = $(".images")
// let movieInformation = $(".movie-information")

// const searchAPI = "2ae52f27dbb481080bd1f2c839a0d6d7";

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
        .then(function (response){
            // console.log(response);
            return response.json();
                
        })
        .then(function(data){
            console.log(data);
            for(var i = 0; i < data.results.length; i++) {
                // console.log(i);
                let searchedMovies = data.results[i].original_title;
                let postersImages = data.results[i].poster_path;
                //    console.log(postersImages);
                let imagesToIndex = document.createElement('img');
                let infoButton = document.createElement('button');
                let div = document.createElement('div');
                //jquery addclass or javascript classlist
                $(div).addClass("movie-div");
                infoButton.textContent = 'Information'
                
                imagesToIndex.src= 'https://image.tmdb.org/t/p/w500/' + postersImages;
                // console.log(imagesToIndex);
                if(postersImages == null) {
                    moviePicture = [];
                } else {
                    $(div).append(imagesToIndex);
                    $(div).append(infoButton);
                    $('#movie-picture').append(div);
                  
                }
                // console.log(imagesToIndex);
                // <h4 class="movie-title"></h4>
                // <video class="video"></video>
                // <img class="images">
                // <p class="movie-information"></p>
            $(infoButton).on('click', function() {
                let elems = document.querySelector('.modal');
                let instances = M.Modal.init(elems);
                let modalTitle = document.createElement('h4');
                let modalVideo = document.createElement('video');
                let modalImages = document.createElement('images');
                let modalInformation = document.createElement('information');
                // for(var i = 0; i < data.results.length; i++) {
                var videoPath = data.results.video
                console.log(videoPath);
                if(videoPath == false) {
                    modalBody.append(searchedMovies);
                } else {
                            
                }
            // }
                
                instances.open();
            })
                   
            }       
        })
}