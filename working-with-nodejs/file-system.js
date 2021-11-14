// Importing the File System module to get access to its API
const fs = require('fs');

// Using the 'readFile()' method from File System API to read from a file
fs.readFile('user-data.txt', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(data.toString());
});

// Using the 'writeFile()' method from File System API to write into a file
fs.writeFile('user-data.txt', 'username=janedoe', error => {
  if (error) {
    console.log(error);
  } else {
    console.log('Writing to file successful');
  }
});
