function getApi() {
  var url = 'https://api.watchmode.com/v1/sources/?apiKey=wPaBpIHLEyhglS4raH1LguFDHh1P1JdoAj6vZCC6';  
  fetch(url, { method: 'Get'})
    .then(function (response) {
      return response.json();
      // })
      // .then(function (data) {
      //   for (var i = 0; i < data.length; i++) {}
  });
};

$(document).ready(function(){
  $('.carousel').carousel();

  getApi();
});

