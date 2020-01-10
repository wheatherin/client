function onSignIn(googleUser) {
  const google_token = googleUser.getAuthResponse().id_token;
  console.log(google_token);
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/google-signin',
    data: {
      google_token
    }
  })
  .done(data => {
    console.log(data)
    // localStorage.setItem('access_token', data.access_token)
    // $() tembak yang mau di hide
  })
  .fail(err => {
    console.log(err);
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}



$(document).ready(function() {

  $.ajax({
    url: "http://localhost:3000/api/current/jakarta",//straigh from github
    method: "get"
})
.done( data =>{
    
    console.log(data,'==============')
    // $('#currentUser').append(`
    // <a class="navbar-brand" href="#">
    //      ${data.login}
    //     <img src="${data.avatar_url}" width="30" height="30" class="d-inline-block align-top" alt="">
    // </a>

    // `)
    // <p>${data.login}  <img src="${data.avatar_url}" style="width: 2rem; height: 2rem;" alt=""></p>
})
.fail (err =>{
    console.log(err)
})

})