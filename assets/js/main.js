function hidenav() {
  var x = document.getElementById("first");
  var y = document.getElementById("wheather");

  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";

  } else {
    x.style.display = "none";
    y.style.display = "none";

  }
}



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
      // console.log(dataToken)
      $('#wheather2').hide();
      $('.navbar').show();
      $('#wheather').show();
      localStorage.setItem('access_token', dataToken.access_token)
      console.log(dataToken.name, '=======')

      $('#ForUser').append(`
    <a> ${dataToken.name}</a>
    `)
      // $('#wheather').empty()
      // empty the container

      $.ajax({
        url: "http://localhost:3000/api/current/jakarta",
        method: "get"
      })
        .done(data => {


          let today = data.currentResults
          let url = ""

          if (today.weather === "Rain") {
            url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
          } else if (today.weather === "Clouds") {
            url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather04-512.png"
          } else {
            url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
          }
          $('.today').append(`
          <h1>${today.city}</h1>
          <img src="${url}" id="mainW" alt="">
          <h2>${today.weather}</h2>
          <h5 class="card-subtitle mb-2 text-muted">${today.summary}</h5>
          <h6>Temprature ${today.temp}</h6>
          <h6>Wind ${today.wind_speed}</h6>
          <a href="#" class="card-link">UV index ${today.uv}</a>
          <a href="#" class="card-link">Humidity ${today.humidity}</a>

  
      `)

          let week = data.weeklyResults

          $.each(week, function (index, val) {
            $('#feed').append(`
        <div class="card card-h" style="width: 18rem; border-radius: 10px;">
        <div class="card-body">
          <img src="${url}" alt="">
          <h5 class="card-title" style="color: black;">${val.date}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${val.weather}</h6>
          <a href="#" class="card-link">UV index ${val.uvIndex}</a>
          <a href="#" class="card-link">Humidity ${val.humidity}</a>
        </div>
      </div>
        `)
          })
        })
        .fail(err => {
          console.log(err)
        })
    })
    .fail(err => {
      console.log(err), 'google sign in';
    })
}

$('#kota').on('click', 'button', function (event) {
  // console.log( event.currentTarget.id);

  $.ajax({
    url: `http://localhost:3000/api/current/${event.currentTarget.id}`,
    method: "get"
  })
    .done(data => {

      let today = data.currentResults
      let week = data.weeklyResults

      let url = ""
      if (today.weather === "Rain") {
        url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
      } else if (today.weather === "Clouds") {
        url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather04-512.png"
      } else {
        url = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
      }



      $('#cities').append(`
    <div class="container" style="background-color: #fff; border-radius: 10px; margin-bottom: 60px;" id="weather">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="today" align="center">
          
            <!-- weather today -->
           <h1 style="margin-top:8px;">${today.city}</h1>
              <img src="${url}" id="mainW" alt="">
              <h2>${today.weather}</h2>
              <h5 class="card-subtitle mb-2 text-muted">${today.summary}</h5>
              <h6>Temprature ${today.temp}</h6>
              <h6>Wind ${today.wind_speed}</h6>
              <a href="#" class="card-link">UV index ${today.uv}</a>
              <a href="#" class="card-link">Humidity ${today.humidity}</a>
          </div>

        </div>
        <div class="col" id="${today.city}" style="height: 40rem;
        overflow: scroll;" align="center">
          <h2></h2>

         

        </div>
      </div>
    </div>

    `)

      $.each(week, function (index, val) {
        $(`#${today.city}`).append(`
      <div class="card card-h" style="width: 18rem; border-radius: 10px;">
      <div class="card-body">
        <img src="${url}" alt="">
        <h5 class="card-title" style="color: black;">${val.date}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${val.weather}</h6>
        <a href="#" class="card-link">UV index ${val.uvIndex}</a>
        <a href="#" class="card-link">Humidity ${val.humidity}</a>
      </div>
    </div>
      `)
      })




    })
    .fail(err => {
      console.log(err)
    })

});


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    $('#wheather2').show();
    $('.navbar').hide();
    $('#wheather').hide();
    $('#cities').empty()

  });
}



$(document).ready(function () {

  $('a').click(function (event) {
    event.preventDefault()
  })

})