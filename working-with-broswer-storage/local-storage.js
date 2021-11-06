const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');
const clearBtn = document.getElementById('clear-btn');

// localStorage is an easy to use key/value pair storage for simple data
// localStorage data is never cleared unless the user clears it or if the
// browser runs out of space

// sessionStorage will keep the data as long as the browser tab is opened/refreshed
// once the tab is close or the browser is closed the data is cleared
const userId = 'u56435085';
const user = {
  name: 'Samantha',
  age: 30,
  hobbies: ['Sports', 'Mountain Biking']
}

storeBtn.addEventListener('click', () => {
  // using the 'setItem()' method to store userId data in sessionStorage
  sessionStorage.setItem('uid', userId);
  // using the 'setItem()' method to store user data in localStorage
  // to store objects in the local storage, they need to be converted to strings
  localStorage.setItem('user', JSON.stringify(user));
});

retrieveBtn.addEventListener('click', () => {
  // using the 'getItem()' method to retrieve userId data in sessionStorage
  const uid = sessionStorage.getItem('uid');
  // using the 'getItem()' method to retrieve userId data in localStorage
  const extractedUser = JSON.parse(localStorage.getItem('user'));

  if (uid && extractedUser) {
    console.log(`Retrieved userId: ${uid}`);
    console.log(`Retrieved userData: `, extractedUser);
  } else {
    console.log('No data to retrieve')
  }

});

clearBtn.addEventListener('click', () => {
  // using the 'clear()' method to clear the localStorage
  localStorage.clear();
});
