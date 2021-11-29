// Procedural Approach

const formElem = document.getElementById('user-input');

const signUpHandler = (event) => {
  event.preventDefault();

  const usernameInputElem = document.getElementById('username');
  const usernameErrorElem = usernameInputElem.parentElement.querySelector('.form-control__error');
  const username = usernameInputElem.value.trim();

  const passwordInputElem = document.getElementById('password');
  const passwordErrorElem = passwordInputElem.parentElement.querySelector('.form-control__error');
  const password = passwordInputElem.value.trim();

  if (username) {
    usernameErrorElem.textContent = '';
  }

  if (password) {
    passwordErrorElem.textContent = '';
  }

  // Implementing validations
  if (!username && !password) {
    usernameErrorElem.textContent = 'Username is required';
    passwordErrorElem.textContent = 'Password is required';
    
    return;
  }

  if (username && !password) {
    usernameErrorElem.textContent = '';
    passwordErrorElem.textContent = 'Password is required';
    
    return;
  }

  if (!username && password) {
    usernameErrorElem.textContent = 'Username is required';
    passwordErrorElem.textContent = '';
    
    return;
  }

  if (password.length <= 5) {
    passwordErrorElem.textContent = 'Password must be 6 characters or longer!';

    return;
  }

  // Creating the new user
  const user = { username, password };

  console.log('Hello new user: ', user);
};

formElem.addEventListener('submit', signUpHandler);
