// A promise is an object that hold the eventual result of an asynchronous operation
// A promise has several states: pending, fulfilled, rejected and settled
// Pending: When the asynchronous operation is running
// Fulfilled: When the asynchronous operation is completed
// Rejected: When the asynchronous operation has failed
// Settled: When the promise is either fulfilled or rejected but not pending


// Creating a promise using the Promise constructor function
const p1 = new Promise((resolve, reject) => {
  console.log('Promise executes immediately');

  // resolve({ id: 1, username: 'Jade' });
  reject(new Error('Something went wrong'));
});

// Consuming the promise
p1
  .then(data => console.log('Data: ', data))
  .catch(error => console.log(error));


const button = document.querySelector('button');

const getPosition = () => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      positionData => resolve(positionData),
      error => reject(error)
    );
  });

  return promise;
}

// Promise.all()
// Takes an array of promises as input and returns a single Promise that resolves
// to an array of result of the input promises. If any of the input promises reject
// then the returned promise immediately rejects with the first rejection message/error
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 1 Data'), 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 2 Data'), 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 3 Data'), 4000);
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 4 Data'), 2000);
});

const promise5 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Promise 5 Failed')), 1000);
});

const promise6 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise 6 Data'), 4000);
});

// Fulfilled Promise.all()
Promise.all([promise1, promise2, promise3])
  .then(data => console.log('Promise all data: ', data)) // Expected output: ['Promise 1 Data', 'Promise 2 Data', 'Promise 3 Data']
  .catch(error => console.log(error));

// Rejected Promise.all()
Promise.all([promise4, promise5, promise6])
  .then(data => console.log('Promise all data: ', data))
  .catch(error => console.log(error)); // Expected output: Error: Promise 5 Failed

// Promise.race()
// Takes an array of promises as input and returns a single Promise that resolves / rejects
// to the result of the input promise that takes the shortest time resolves / reject.

// Fulfilled Promise.race()
Promise.race([promise1, promise2, promise3])
  .then(data => console.log('Promise race data: ', data)) // Expected output: Promise 2 Data
  .catch(error => console.log(error));

// Rejected Promise.race()
Promise.race([promise4, promise5, promise6])
  .then(data => console.log('Promise race data: ', data))
  .catch(error => console.log(error)); // Expected output: Error: Promise 5 Failed
  
const trackUser = async () => {
  // Getting current position using callbacks
  // navigator.geolocation.getCurrentPosition(
  //   positionData => { console.log('Position data: ', positionData)},
  //   error => console.log('Error: ', error)
  // );

  // Getting current position using Promise
  // getPosition()
  //   .then(data => console.log('Current position: ', data))
  //   .catch(error => console.log(error));

  // Using async / await to write asynchronous code as synchronous
  try {
    const currentPosition = await getPosition();

    console.log('Current position: ', currentPosition);
  } catch (error) {
    console.log('Error: ', error);
  }
};

button.addEventListener('click', trackUser);
