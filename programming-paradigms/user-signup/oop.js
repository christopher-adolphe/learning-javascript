// Object-Oriented Approach

class User {
  username;
  password;
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  greetUser() {
    console.log('Hello new user: ', this.username);
  }
}

class Validator {
  static REQUIRED = 'REQUIRED';
  static MIN_LENGTH = 'MIN_LENGTH';

  static validate(value, flag, validatorValue) {
    if (flag === this.REQUIRED) {
      return !!value.trim().length;
    }

    if (flag === this.MIN_LENGTH) {
      return value.trim().length > validatorValue;
    }
  }
}

class UserForm {
  formElem;
  usernameInputElem;
  usernameErrorElem;
  passwordInputElem;
  passwordErrorElem;

  constructor (formId) {
    this.registerDOMElems(formId);
  }

  registerDOMElems(formId) {
    this.formElem = document.getElementById(formId);

    if (!this.formElem) {
      return;
    }

    this.usernameInputElem = document.getElementById('username');
    this.usernameErrorElem = this.usernameInputElem.parentElement.querySelector('.form-control__error');

    this.passwordInputElem = document.getElementById('password');
    this.passwordErrorElem = this.passwordInputElem.parentElement.querySelector('.form-control__error');

    this.formElem.addEventListener('submit', this.signUpHandler.bind(this));
  }

  signUpHandler(event) {
    event.preventDefault();

    const username = this.usernameInputElem.value;
    const password = this.passwordInputElem.value;

    if (username) {
      this.usernameErrorElem.textContent = '';
    }
  
    if (password) {
      this.passwordErrorElem.textContent = '';
    }

    // Implementing validations
    if (!Validator.validate(username, Validator.REQUIRED) && !Validator.validate(password, Validator.REQUIRED)) {
      this.usernameErrorElem.textContent = 'Username is required';
      this.passwordErrorElem.textContent = 'Password is required';
      
      return;
    }

    if (Validator.validate(username, Validator.REQUIRED) && !Validator.validate(password, Validator.REQUIRED)) {
      this.usernameErrorElem.textContent = '';
      this.passwordErrorElem.textContent = 'Password is required';
      
      return;
    }
  
    if (!Validator.validate(username, Validator.REQUIRED) && Validator.validate(password, Validator.REQUIRED)) {
      this.usernameErrorElem.textContent = 'Username is required';
      this.passwordErrorElem.textContent = '';
      
      return;
    }
  
    if (!Validator.validate(password, Validator.MIN_LENGTH, 5)) {
      this.passwordErrorElem.textContent = 'Password must be 6 characters or longer!';
  
      return;
    }

    const user = new User(username, password);

    console.log('New user: ', user);
    user.greetUser();
  }
}

new UserForm('user-input');
