let posts = [];
const DOMAIN = 'https://jsonplaceholder.typicode.com';
const postItemTpl = document.getElementById('post-item-tpl');
const newPostForm = document.querySelector('#new-post form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const addPostBtn = document.querySelector('#new-post button');
const fetchPostBtn = document.querySelector('#available-posts button');
const postList = document.querySelector('#available-posts ul');

const sendRequest = async (method, url, data) => {
  try {
    // The fetch API is a modern way of working with HTTP request as it is already Promise out of the box.
    // If only a url is passed as parameter to the fetch function, it will send a GET request to the given url
    // The second parameter of the fetch API is a configuration object to specify the method of the request
    // and the data to be sent with the resquest. The data should be converted into a JSON string

    // Headers are metadata that can be attached to outgoing resquests to describe which type of data is
    // being sent or to add authentication details. The configuration object passed to the fecth API has
    // a 'headers' property which takes an object with key/value pairs to add new headers to the outgoing
    // requests
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authaurization': 'Bearer somefaketoken'
      }
    });

    // Sending the formData
    // const response = await fetch(url, {
    //   method: method,
    //   body: data,
    // });

    // Checking if the status of the response is within the success range of statuses
    if (response.status >= 200 && response.status < 300) {
      // The Promise containing the response from the fetch API is not a parsed response but a streamed
      // one meaning that it does not contain a response body which is in a way ready to be used. We need
      // to use the 'json()' method on the response object which will yield another Promise and convert the JSON
      // data into a javascript object. The 'json()' method will convert the streamed response into a snapshot
      // parsed body that we can then work with in the javascript code
      // NOTE: Also available response.text(), response.blob()
      return response.json();
    } else {
      // const error = await response.json();
      throw new Error(`Something went wrong during ${method} request`);
    }
  } catch (error) {
    // This catch block will only be reached only in case there is a network issue to communicate with
    // the server. To hanlde errors related to response, we should use the 'status' property of the response
    // object instead
    console.log(error);
    throw new Error('Something went wrong. Could not establish connection to the server');
  }
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

  // Using FormData constructor function to collect data from HTML form to be send through
  // HTTP request. The FormData constructor function can accept a reference to an HTML form
  // element to be able to retrieve the values of its input fields. This allow easy collection
  // of the values without having to get them individually from the input fields. For this to
  // work the 'name' attribute must be set on the input fields of the HTML form
  const formData = new FormData(newPostForm);

  // formData.append('title', title); // Obtaining the value form the input field
  // formData.append('body', body); // Obtaining the value form the input field

  formData.append('userId', userId);

  try {
    let newPost = { title, body, userId };
    
    const response = await sendRequest('POST', `${DOMAIN}/posts`, newPost);

    // Sending the formData in the HTTP request
    // const response = await sendRequest('POST', `${DOMAIN}/posts`, formData);

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
