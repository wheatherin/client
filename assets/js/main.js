function onSignIn(googleUser) {
  const google_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/googlesignin',
    data: {
      google_token
    }
  })
  .done(dataToken => {
    console.log(dataToken)
    $('#wheather2').hide();
    $('.navbar').show();
    $('#wheather').show();
    localStorage.setItem('access_token', dataToken.access_token)
    $.ajax({
      url: "http://localhost:3000/api/current/jakarta",//straigh from github
      method: "get"
  })
    .done( data =>{
      let today = data.currentResults
      let url = ""
      if(today.icon == "rain"){
        url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
      }
      $('.today').append(`
      <h1>${today.city}</h1>
                <img src="${url}" id="mainW" alt="">
                <h2>${today.weather}</h2>
                <h5>${today.description}</h5>
  
      `)
  
      let week = data.weeklyResults
  
      $.each(week, function(index, val){
        $('#feed').append(`
        <div class="card card-h" style="width: 18rem; border-radius: 10px;">
        <div class="card-body">
          <img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png" alt="">
          <h5 class="card-title">${val.date}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${val.weather}</h6>
          <a href="#" class="card-link">UV index ${val.uvIndex}</a>
          <a href="#" class="card-link">Humidity ${val.humidity}</a>
        </div>
      </div>
        `)
      })
    })
    .fail (err =>{
        console.log(err)
    })
    })
  .fail(err => {
    console.log(err);
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    $('#wheather2').show();
    $('.navbar').hide();
    $('#wheather').hide();
  });
}



$(document).ready(function() {



})