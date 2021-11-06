const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

// using the 'open()' method to open a connection to an indexedDB database passing the name and the version
// if the database does not exist, then indexedDB will create it as a new database
const dbRequest = indexedDB.open('DummyStorage', 1);
let db;

dbRequest.onsuccess = function(event) {
  db = event.target.result;
}

// adding a handle function when connection to indexedDB is successfull
dbRequest.onupgradeneeded = function(event) {
  // event.target.result is the property that holds access to the indexedDB database
  db = event.target.result;

  // using the 'createObjectStore()' to create a new table
  const objStore = db.createObjectStore('products', { keyPath: 'id' });

  // initializing the object store
  objStore.transaction.oncomplete = function(event) {
    const productsStore = db
      .transaction('products', 'readwrite')
      .objectStore('products');

    productsStore.add({
      id: 'p1',
      title: 'Test product',
      price: 2500.50,
      tags: ['electronic', 'diy']
    });
  }
}

// adding a handle function when connection to indexedDB fails
dbRequest.onerror = function(event) {
  console.log('Error');
}

storeBtn.addEventListener('click', () => {
  if (!db) {
    return;
  }

  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');

  productsStore.add({
    id: 'p2',
    title: 'Another Test product',
    price: 1900.99,
    tags: ['baby', 'decoration']
  });
});

retrieveBtn.addEventListener('click', () => {
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');

  const request = productsStore.get('p2');

  request.onsuccess = function() {
    console.log('Product: ', request.result);
  }
});
