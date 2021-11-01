const customers = ['Jane', 'Bruce', 'Ruby', 'Paul', 'Emma', 'Bianca', 'Checco'];
const activeCustomers = ['Jane', 'Ruby'];

const getInactiveCustomersV1 = (arr1, arr2) => {
  return arr1.filter((elem, index) => elem !== arr2[index]);
};

console.log(`Inactive customers: ${getInactiveCustomersV1(customers, activeCustomers)}`);

// Using lodash library
const getInactiveCustomersV2 = _.difference(customers, activeCustomers);

console.log(`Inactive customers using lodash: ${getInactiveCustomersV2}`);

// Using Axios library to work with http requests
let posts = [];
const DOMAIN = 'https://jsonplaceholder.typicode.com';
const postItemTpl = document.getElementById('post-item-tpl');
const newPostForm = document.querySelector('#new-post form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const addPostBtn = document.querySelector('#new-post button');
const fetchPostBtn = document.querySelector('#available-posts button');
const postList = document.querySelector('#available-posts ul');

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
    const response = await axios.get(`${DOMAIN}/posts`);

    posts = [ ...response.data ];

    posts.forEach(post => {
      const item = renderPostItem(post);

      postList.append(item);
    });
  } catch (error) {
    console.log(error.response);
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
    
    const response = await axios.post(`${DOMAIN}/posts`, newPost);
    console.log('addPost: ', response);

    // Sending the formData in the HTTP request
    // const response = await sendRequest('POST', `${DOMAIN}/posts`, formData);

    newPost = { ...newPost, id: response.data.id };

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

    await axios.delete(`${DOMAIN}/posts/${id}`);

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

