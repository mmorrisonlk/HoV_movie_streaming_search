const searchAPI = "2ae52f27dbb481080bd1f2c839a0d6d7";
let searchForm = $("#searchForm");
let searchMovie = $('#search-input');
let searchButton = $('.btn-info');
let moviesArea = $('#movie-container');
let movieTitle = $('#movie-title');
let moviePicture = $('#movie-picture');
let movies="";
let modalBody = $('.modal-content')

function popularMovies() {
  const requestUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + searchAPI + "&language=en-US&page=1";

  $.ajax({
    url: requestUrl,
    method: 'GET',
  }).then(function (response) {
    for (i = 0; i < 10; i++) {
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

$(document).ready(function(){
  $('.carousel').carousel();
  popularMovies();
});

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
            return response.json();
                
        })
        .then(function(data){
            console.log(data);
            for(var i = 0; i < data.results.length; i++) {
                var movieBlocks = document.getElementById("movieResults")
                let searchedMovies = data.results[i].original_title;
                // let postersImages = data.results[i].poster_path;
                
                //    console.log(postersImages);
                // let imagesToIndex = document.createElement('img');
                // let infoButton = document.createElement('button');
                movieBlocks.innerHTML +=`
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span id="`+ i +`movieTitles" class="card-title">Hello</span>
                    <p id="`+ i +`movieDescription"></div>
                  <div class="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                  </div>
                </div>
                </div>
                `
                // let div = document.createElement('div');
                // //jquery addclass or javascript classlist
                // $(div).addClass("movie-div");
                // // infoButton.textContent = 'Information'
                
                // imagesToIndex.src= 'https://image.tmdb.org/t/p/w500/' + postersImages;
                // // console.log(imagesToIndex);
                // if(postersImages == null) {
                //     moviePicture = [];
                // } else {
                //     $(div).append(imagesToIndex);
                //     $(div).append(infoButton);
                //     $('#movie-picture').append(div);
                  
                // }

                // movieTitle.text(searchedMovies + "text");
                
                // if (data.results[i].overview === null) {
                //     document.getElementById(i + "movieDescription").innerHTML = "No description available";
                // }
                // else {
                document.getElementById(i + "movieDescription").innerHTML = data.results[i].overview;
                document.getElementById(i + "movieTitles").innerHTML = data.results[i].original_title;
                // }
            // $(infoButton).on('click', function() {
            //     let elems = document.querySelector('.modal');
            //     let instances = M.Modal.init(elems);
            //     let modalTitle = document.createElement('h4');
            //     let modalVideo = document.createElement('video');
            //     let modalImages = document.createElement('images');
            //     let modalInformation = document.createElement('information');
            //     // for(var i = 0; i < data.results.length; i++) {
            //     var videoPath = data.results.video
            //     console.log(videoPath);
            //     if(videoPath == false) {
            //         modalBody.append(searchedMovies);
            //     } else {
                            
            //     }
                
            //     instances.open();
            // })
                   
            }       
        })
}