let posts = [];
const DOMAIN = 'https://jsonplaceholder.typicode.com';
const postItemTpl = document.getElementById('post-item-tpl');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const addPostBtn = document.querySelector('#new-post button');
const fetchPostBtn = document.querySelector('#available-posts button');
const postList = document.querySelector('#available-posts ul');

const sendRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    // Using the XMLHttpRequest constructor function to create an XHR object
    // to be able to interact with the server via HTTP requests
    const xhr = new XMLHttpRequest();

    // Using the 'open()' method to configure the request (method, url, synchronous flag)
    // Basically we are informing the XHR object which method ('GET') we want to use and
    // on which url ('https://jsonplaceholder.typicode.com/posts')
    xhr.open(method, url);

    // The response type can also be preconfigured by setting the 'responseType' property
    // When doing so, it will not be required to use 'JSON.parse()' to convert the response
    // into a javascript object
    xhr.responseType = 'json';

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Using the 'send()' method to initiate the request or if the 'data' parameter is set,
    // then send the data to the server using JSON.stringify() to convert the javascript
    // object into JSON
    xhr.send(JSON.stringify(data));

    // Setting the 'onload' property of the XHR object to a handler function
    // to be able to parse the response of the request. The load event
    // is fired once the request is completed and we can then access the
    // response to retrieve the data
    xhr.onload = () => {
      // Checking if the status of the response is within the success range of statuses
      if (xhr.status >= 200 && xhr.status < 300) {
        // Extracting the response of the request from the 'response' property of the XHR object
        // Since the response is in JSON format, it needs to be converted in a javascript object
        // before we can start manipulating it. The 'JSON.parse()' method serves this purpose
        // Once the load event is complete, we can resolve the Promise so that the value of the
        // response can be obtained when the Promise is consumed
        resolve(xhr.response);
      } else {
        reject(new Error(`Something went wrong during ${method} request`));
      }
    };

    // Setting the 'onerror' property of the XHR object to a handler function
    // to be able to handle errors regarding network issues. In case this happens
    // we reject the Promise so that the error is caught when the Promise is consumed
    // NOTE: Other types of errors should be handle in the 'onload' handler itself by
    // checking non successful the statuses of the response
    xhr.onerror = () => {
      reject(new Error(`Failed to send {method} request`));
    }
  });

  return promise;
};

// Creating a renderPostItem function to render the html content of each post
const renderPostItem = (post) => {
  // Importing the html content of the template
  const postItem = document.importNode(postItemTpl.content, true);

  postItem.querySelector('li').id = post.id;
  postItem.querySelector('h2').textContent = post.title;
  postItem.querySelector('p').textContent = post.body;

  return postItem;
};

// Creating a fetchPosts function which will consume the Promise returned by the sendRequest
// function to get the posts from the http response
const fetchPosts = async () => {
  posts = [];

  try {
    const response = await sendRequest('GET', `${DOMAIN}/posts`);

    posts = [ ...response ];

    posts.forEach(post => {
      const item = renderPostItem(post);

      postList.append(item);
    });
  } catch (error) {
    console.log(error);
  }
};

// Creatin a addPost function to post the data to the server
const addPost = async (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const body = contentInput.value.trim();
  const userId = posts.length ? posts.length + 1 : 1;

  if (!title.length || !body.length) {
    return;
  }

  try {
    let newPost = { title, body, userId };
    
    const response = await sendRequest('POST', `${DOMAIN}/posts`, newPost);

    newPost = { ...newPost, id: response.id };

    posts.unshift(newPost);

    const item = renderPostItem(newPost);

    postList.prepend(item);

    titleInput.value = null;
    contentInput.value = null;
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (event) => {
  // Checking if the click event was trigger by the 'button' element
  if (event.target.tagName !== 'BUTTON') {
    return;
  }

  try {
    // Retrieving the id of the post by reaching to the parent 'li' of the 'button
    const id = event.target.closest('li').id;
    const deletedPost = document.getElementById(id);

    await sendRequest('DELETE', `${DOMAIN}/posts/${id}`);

    postList.removeChild(deletedPost);
  } catch (error) {
    console.log(error);
  }
};

// Binding the 'fetchPosts' function to the click event listener of the button to send the
// request to fetch the posts
fetchPostBtn.addEventListener('click', fetchPosts);

// Binding the 'addPost' function to the click event listener of the button to post the data
addPostBtn.addEventListener('click', addPost);

// Binding the 'deletePost' function to the click event listener of the ul and using event
// delegation to get the id of the post item clicked
postList.addEventListener('click', deletePost);
