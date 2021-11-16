// Importing the express module
const express = require('express');

// Importing the routes
const locationRoutes = require('./routes/location');

// Using the 'express()' top-level function to create an Express application
// The 'app' object now has access to the API exposed by express
const app = express();

// Using the 'set()' method to configure the Express application
// Setting a config for the templating engine to be used for our views
// Specifying we want to use 'ejs' as templating engine
// app.set('view engine', 'ejs');

// Specifying the directory where our views are found, here in 'templates' directory
// app.set('views', 'templates');

// Using the 'use()' method to register a middleware. Express is a middleware
// driven framework meaning that the incoming request will be funneled to a bunch
// of functions which all receive the request and all can do something with it.
// They can either stop the request and send back a response or they can forward
// the request to the next middleware function

// Registering a middleware function to parse the body of the incoming request
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use((request, response, next) => {
//   response.set('Content-Type', 'text/html');
//   // Using the 'next()' callback to pass the incoming request to the next
//   // middleware function
//   next();
// });

// Registering a middleware function to allow CORS
app.use((request, response, next) => {
  response.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  next();
});

// app.use((request, response, next) => {
//   // Extracting the data from the incoming request body which has been parsed by
//   // the previous middleware function 'app.use(express.urlencoded())'
//   const username = request.body.username || '';

//   // Using the 'send()' method to send the response to the client side
//   // NOTE: The incoming request is no more passed to the next middleware function
//   // response.send(`
//   //   <h1>Hello from Express</h1>
//   //   <form method="POST" action="/">
//   //     <input type="text" name="username" />
//   //     <button type="submit">Send</button>
//   //   </form>
//   //   ${ username !== '' ? `<p>Your username: ${username} has been added!</p>` : ''}
//   // `);

//   // USing the 'render()' method to specify the view we want to send in the response
//   // response.render('index', {
//   //   username
//   // });
// });

// Registering the locationRoutes
app.use(locationRoutes);

// Using the 'listen()' method to start the server
app.listen(3000, () => console.log(`Server started on port 3000... Visit http://localhost:3000`))
