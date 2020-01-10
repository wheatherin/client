function onSignIn(googleUser) {
  const google_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/google-signin',
    data: {
      google_token
    }
  })
  .done(data => {
    $('#wheather2').hide();
    $('.navbar').show();
    $('#wheather1').show();
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

})