let posts = [];
const postItemTpl = document.querySelector('template');
const fetchPostBtn = document.querySelector('#available-posts > button');
const postList = document.querySelector('#available-posts > ul');

// Using the XMLHttpRequest constructor function to create an XHR object
// to be able to interact with the server via HTTP requests
const xhr = new XMLHttpRequest();
console.log('XHR object: ', xhr);

// Using the 'open()' method to configure the request (method, url, synchronous flag)
// Basically we are informing the XHR object which method ('GET') we want to use and
// on which url ('https://jsonplaceholder.typicode.com/posts')
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

// The response type can also be preconfigured using xhr.responseType = 'json';
// When doing so, it will not be required to use 'JSON.parse()' to convert the response
// into a javascript object

// Using the 'send()' method to initiate the request
const fetchPosts = () => {
  xhr.send();
};

// Creating a renderPostItem function to render the html content of each post
const renderPostItem = (post) => {
  // Importing the html content of the template
  const postItem = document.importNode(postItemTpl.content, true);

  postItem.querySelector('h2').textContent = post.title;
  postItem.querySelector('p').textContent = post.body;

  return postItem;
};

// Attaching a function to the 'onload' property of the XHR object
// to be able to parse the response of the request. The load event
// is fired once the request is completed and we can then access the
// response to retrieve the data
xhr.onload = () => {
  // Extracting the response of the request from the 'response' property of the XHR object
  // Since the response is in JSON format, it needs to be converted in a javascript object
  // before we can start manipulating it. The 'JSON.parse()' method serves this purpose
  posts = JSON.parse(xhr.response);
  console.log('Posts: ', posts[0]);

  posts.forEach(post => {
    const item = renderPostItem(post);

    postList.append(item);
  });
};

// Binding the 'fetchPosts' function to the click event listener of the button to send the
// request to fetch the posts
fetchPostBtn.addEventListener('click', fetchPosts);
