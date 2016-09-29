//require("../models/users")
//set CLient ID and google auth settings
var http = require('http');
var _auth2;
var client_id = "73713153185-ml2ui4qa12p4tpfgiuhgebpsi374gnqc.apps.googleusercontent.com";
var _onGoogleLoad = function(){
  gapi.load('auth2', function(){
    auth2 = gapi.auth2.init({
      client_id: client_id
    }
  )})
}

//Sign in a user
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  $.get(
    "https:/www.googleapis.com/oauth2/v3/tokeninfo",
    {id_token : id_token},
    function(data) {
      if(data['aud']==client_id){
        console.log(data);
      }

    }
  );

}

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=1092275464194633";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Sign out a user
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

//Jquery functions - availabe when DOM ready
$(function(){
  $('.btn').mousedown(function(){
    $(this).toggleClass("btn-primary");
    $(this).toggleClass("btn-success");
  });

  $('.btn').mouseup(function(){
    $(this).toggleClass("btn-primary");
    $(this).toggleClass("btn-success");
  });
});

function registerUser() {
  $.ajax
  ({
    type: "POST",
    url: "/",
    crossDomain:true,
    dataType: "json",
    data:JSON.stringify({name: "Dennis", address: {city: "Dub", country: "IE"}})
  }).done(function ( data ) {
    alert("ajax callback response:"+JSON.stringify(data));
  })

// write the request parameters
  req.write('post=data&is=specified&like=this');
  req.end();

}