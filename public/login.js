require("../models/users")

//set CLient ID and google auth settings
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

//Sign out a user
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
