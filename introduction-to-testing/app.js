const { createElement, validateAndGenerate } = require('./util');

const initApp = () => {
  // Initializes the app, registers the button click listener
  const newUserButton = document.querySelector('#btnAddUser');
  newUserButton.addEventListener('click', addUser);
};

const addUser = () => {
  // Fetches the user input, creates a new HTML element based on it
  // and appends the element to the DOM
  const newUserNameInput = document.querySelector('input#name');
  const newUserAgeInput = document.querySelector('input#age');
  const userList = document.querySelector('.user-list');

  // Moving this code to the validateAndGenerate() function
  // if (
  //   !validateInput(newUserNameInput.value, true, false) ||
  //   !validateInput(newUserAgeInput.value, false, true)
  // ) {
  //   return;
  // }

  // Moving this code to the validateAndGenerate() function
  // const outputText = generateText(
  //   newUserNameInput.value,
  //   newUserAgeInput.value
  // );

  const outputText = validateAndGenerate(newUserNameInput.value, newUserAgeInput.value);

  if (!outputText) {
    return;
  }

  const element = createElement('li', outputText, 'user-item');
  userList.appendChild(element);
};

// Start the app!
initApp();
