// Import the HTTP module to get access to its API
const http = require('http');

// Using the 'createServer()' method from the HTTP API to build a server
const server =http.createServer((request, response) => {
  let body = [];

  // Using the 'on()' method to add an event listener to the 'data' event on the request
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // Adding a listener to the 'end' event to trigger an action when the server is done
  // with receiving data
  request.on('end', () => {
    let username = '';

    // Converting the array of data chunks to a string
    body = Buffer.concat(body).toString();
    
    if (body) {
      username = body.split('=')[1];
    }

    // Setting header to the outgoing response
    response.setHeader('Content-Type', 'text/html');
    
    // Writing some data into the response stream
    response.write(`
      <h1>Hello from Nodejs</h1>
      <form method="POST" action="/">
        <input type="text" name="username" />
        <button type="submit">Send</button>
      </form>
      ${ username !== '' ? `<p>Your username: ${username} has been added!</p>` : ''}
    `);
    
    // Signaling the no more data will be written
    response.end();
  });
});

// Using the 'listen()' method on the server object to start it by supplying a port number
server.listen(3000, () => console.log(`Server started on port 3000... Visit http://localhost:3000`));
