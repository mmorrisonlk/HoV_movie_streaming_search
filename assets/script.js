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