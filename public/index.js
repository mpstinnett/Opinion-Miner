const socket = io();
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication());

const escape = str => str.replace(/&/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

const addEventListener = (selector, event, handler) => {
  document.addEventListener(event, async ev => {
    if (ev.target.closest(selector)) {
      handler(ev);
    }
  });
};

function displayAccountCreationSuccess(){
  const urlString = window.location.search;
  const urlParams = new URLSearchParams(urlString);
  if(urlParams.get('flag') === 'AccountCreationSuccess') {
    document.getElementById('successMessage').innerHTML = '<p>Your account has been created! Please log in!<p>';
  }
}

function clearErrors(){
  if (document.getElementById("usernameMissingError") !== null) {
    document.getElementById("usernameMissingError").remove()
  }
  
  if (document.getElementById("passwordIncorrect") !== null) {
    document.getElementById("passwordIncorrect").remove()
  }

  if (document.getElementById("usernameIncorrect") !== null) {
    document.getElementById("usernameIncorrect").remove()
  }
  
  document.getElementById("loginForm").style.color = "white";
}

addEventListener('#login', 'click', async () => {
  clearErrors();
  const loginCredentials = getLoginCredentials();
  const username = loginCredentials.username;
  const password = loginCredentials.password;

  if (username === null || username === '' || password === null || password === '') {
    renderError(
      document.getElementById('loginForm'),
      `<div id="usernameMissingError"><p>Please enter both a username and a passsword!!</p></div>`
    );
    return;
  }

  try {
    const users = await app.service('users').find(loginCredentials);
    const data = users.data;
    for(key in data) {
      if(data.hasOwnProperty(key)) {
          var value = data[key];
          if (value.username === username) {
            if (value.password !== password) {
              renderError(
                document.getElementById('loginForm'),
                `<div id="passwordIncorrect"><p>Username or Password is incorrect.</p></div>`
              );
              return;
            }
            clearErrors();
            window.location.replace('Main.html?username=' + value.username + '&email=' + value.email);
            return;
          }
      }
    }
    renderError(
      document.getElementById('loginForm'),
      `<div id="usernameIncorrect"><p>Username or Password is incorrect.</p></div>`
    );
  } catch (error) {
    console.log(error);
  }
});

function renderError(element, error){
  element.style.color = "red";
  element.insertAdjacentHTML('beforeend',
    error);
}

const getLoginCredentials = () => {
  const user = {
    username: escape(document.querySelector('[name="username"]').value),
    password: escape(document.querySelector('[name="password"]').value)
  };

  return user;
};

displayAccountCreationSuccess();
