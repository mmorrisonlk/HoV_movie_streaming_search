$(document).ready(function(){
  $('.carousel').carousel();
});

var requestUrl = 'https://api.watchmode.com/v1/sources/?apiKey=wPaBpIHLEyhglS4raH1LguFDHh1P1JdoAj6vZCC6';

// JQuery AJAX
$.ajax({
  url: requestUrl,
  method: 'GET',
}).then(function (response) {
  console.log('AJAX Response \n-------------');
  console.log(response);
});