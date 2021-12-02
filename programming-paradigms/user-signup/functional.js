// Functional Approach

const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

const greetUser = (username) => {
  console.log('Hello new user: ', username);
};

const getInputElem = (inputId) => {
  const inputElem = document.getElementById(inputId);

  if (!inputElem) {
    return null;
  }

  return inputElem;
};

const validate = (value, flag, validatorValue) => {
  if (flag === REQUIRED) {
    return !!value.trim().length;
  }

  if (flag === MIN_LENGTH) {
    return value.trim().length > validatorValue;
  }
};

const showError = (inputId, errorMessage) => {
  const inputErrorElem = getInputElem(inputId).parentElement.querySelector('.form-control__error');

  if (!inputErrorElem) {
    return;
  }

  inputErrorElem.textContent = errorMessage;
};

const createUser = (usernameValue, passwordValue) => {
  if (!validate(usernameValue, REQUIRED) && !validate(passwordValue, REQUIRED)) {
    return {
      data: null,
      valid: false,
      fieldErrors: {
        username: 'Username is required',
        password: 'Password is required'
      }
    };
  }

  if (validate(usernameValue, REQUIRED) && !validate(passwordValue, REQUIRED)) {
    return {
      data: null,
      valid: false,
      fieldErrors: {
        username: null,
        password: 'Password is required'
      }
    };
  }

  if (!validate(usernameValue, REQUIRED) && validate(passwordValue, REQUIRED)) {
    return {
      data: null,
      valid: false,
      fieldErrors: {
        username: 'Username is required',
        password: null
      }
    };
  }

  if (!validate(passwordValue, MIN_LENGTH, 5)) {
    return {
      data: null,
      valid: false,
      fieldErrors: {
        username: null,
        password: 'Password must be 6 characters or longer!'
      }
    };
  }

  return {
    data: {
      username: usernameValue,
      password: passwordValue
    },
    valid: true,
    fieldErrors: {
      username: null,
      password: null
    }
  };
};

const signUpHandler = (event) => {
  event.preventDefault();

  const username = getInputElem('username').value;
  const password = getInputElem('password').value;
  const result = createUser(username, password);

  if (username && password) {
    showError('username', '');
    showError('password', '');
  }

  if (!result.valid) {
    Object.keys(result.fieldErrors).forEach(fieldError => {
      showError(fieldError, result.fieldErrors[fieldError]);
    });

    return;
  }

  const user = { ...result.data };

  console.log('New user: ', user);
  greetUser(user.username);
};

const registerForm = (formId, formHanlder) => {
  const formElem = document.getElementById(formId);

  if (!formElem) {
    return;
  }

  formElem.addEventListener('submit', formHanlder);
}

registerForm('user-input', signUpHandler);
