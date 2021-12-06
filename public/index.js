const socket = io();
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication());


function displayAccountCreationSuccess(){
  const urlString = window.location.search;
  const urlParams = new URLSearchParams(urlString);
  if(urlParams.get('flag') === 'AccountCreationSuccess') {
    console.log('success?');
    document.getElementById('successMessage').innerHTML = '<p>Your account has been created! Please log in!<p>';
  }
}



displayAccountCreationSuccess();
