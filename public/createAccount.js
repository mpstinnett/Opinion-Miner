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

addEventListener('#register', 'click', async () => {
  const credentials = getCredentials();
  const confirmpassword = document.querySelector('[name="confirmpassword"]').value;

  //TODO: input validation  - medium difficulty
  if (credentials.password === confirmpassword) {
    try {
      await app.service('users').create(credentials);
    } catch (error) {
      console.error(error);
      renderError(
        document.getElementById('username'),
        `<div id="createAccountErorr"><p>Username and Password Combination already exists!<p></div>`
      );
      return;
    }
    window.location.replace('index.html?flag=AccountCreationSuccess');
  } else {
    renderError(
      document.getElementById('confirmpassword'),
      `<div id="confirmpassworderror"><p>Passwords must match!</p></div>`
    );
    fade(document.getElementById('confirmpassworderror'));
  }
});

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1){
      clearInterval(timer);
      element.style.display = 'none';
      element.remove();
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.1;
  }, 50);
}

function renderError(element, error){
  element.style.color = "red";
  element.insertAdjacentHTML('beforeend',
    error);
}

const getCredentials = () => {
  const user = {
    fullname: escape(document.querySelector('[name="fullname"]').value),
    username: escape(document.querySelector('[name="username"]').value),
    email: escape(document.querySelector('[name="email"]').value),
    phonenumber: escape(document.querySelector('[name="phonenumber"]').value),
    password: escape(document.querySelector('[name="password"]').value)
  };

  return user;
};


const createAccount = async credentials => {
  try {
    if(!credentials) {
      await app.reAuthenticate();
    } else {
      await app.authenticate({
        strategy: 'local',
        ...credentials
      });
    }

  } catch(error) {
    console.log('Authentication Failed, user needs to register.');
  }
};

createAccount();
