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
