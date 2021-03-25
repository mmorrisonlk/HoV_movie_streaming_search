let searchForm = $("#searchForm");
let searchMovie = $('#search-input');
let searchButton = $('.btn-info');
let moviesArea = $('#movie-container');
let movieTitle = $('#movie-title');
let moviePicture = $('#movie-picture');
// let movieVideo = $('#movie-video');
let movies="";

let modal = $(".modal-title");
let modalVideo = $(".video");
let modalImages = $(".images")
let movieInformation = $(".movie-information")

const searchAPI = "2ae52f27dbb481080bd1f2c839a0d6d7";

searchButton.on('click', init);

function init(event) {
    event.preventDefault();
    let movies = searchMovie.val();
    searchMovies(movies);
    // moviePoster(movies);
}



function videos(movies) {



}

// function moviePoster(movies) {

//     // const posterPath = data.results;
//     const posters = 'https://image.tmdb.org/t/p/w500/' 

//     fetch(posters)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data){
//             console.log(data);
//             const posterPath = data.results;
//             posters = 'https://image.tmdb.org/t/p/w500/' + posterPath;
//             for(var i=0; i < data.length; i++) {
//                 let posterLoop = posterPath[i].poster_path;
//                 moviePicture.innerHTML(posterLoop)
//             }
//         })



function searchMovies(movies) {
    let searchValue = searchMovie.val();
    const addedUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + searchAPI + "&language=en-US&page=1&query=" + searchValue;
        
    fetch(addedUrl)
        .then(function (response){
            // console.log(response);
            return response.json();
                
        })
        .then(function(data){
            // console.log(data);
            for(var i = 0; i < data.results.length; i++) {
                // console.log(i);
                let searchedMovies = data.results[i].original_title;
                // console.log(searchedMovies);
                // let createdLI = document.createElement("li");
                // // console.log(createdLI);
                // movieTitle.append(createdLI)
                // createdLI.textContent = searchedMovies;

                let postersImages = data.results[i].poster_path;
                //    console.log(postersImages);
                let imagesToIndex = document.createElement('img');
                let infoButton = document.createElement('button');
                let div = document.createElement('div');
                //jquery addclass or javascript classlist
                $(div).addClass("movie-div");
                infoButton.textContent = 'Information'
                // console.log(imagesToIndex);
                imagesToIndex.src= 'https://image.tmdb.org/t/p/w500/' + postersImages;

                if(postersImages == null) {
                    moviePicture = [];
                } else {
                    $(div).append(imagesToIndex);
                    $(div).append(infoButton);
                    $('#movie-picture').append(div);
                  
                }
                // console.log(imagesToIndex);
                // let modal = $(".modal-title");
                // let modalVideo = $(".video");
                // let modalImages = $(".images")
                // let movieInformation = $(".movie-information")
            $(infoButton).on('click', function() {
                var elems = document.querySelector('.modal');
                var instances = M.Modal.init(elems);
                for(var i = 0; i < data.results.length; i++) {
                    var videoPath = data.results[i].video
                    console.log(videoPath);
                    if(videoPath == false) {
                        modal.textContent = searchedMovies;
                        console.log(modal.textContent);
                        modalImages.src = 'https://image.tmdb.org/t/p/w500/' + postersImages;
                    } else {
                        modal.textContent = searchedMovies;
                        modalVideo.src = videoPath;
                    }
                }
                instances.open();
            })
                   
                    

            }       
        })
}