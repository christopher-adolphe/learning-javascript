// 'use strict';

const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movies = [];

const renderMovie = (filterTerm = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length !== 0) {
    movieList.classList.add('visible');
  } else {
    movieList.classList.remove('visible');
    return;
  }

  movieList.innerHTML = '';

  const filteredMovies = !filterTerm
    ? movies
    : movies.filter(movie => movie.info.title.includes(filterTerm));
  
  filteredMovies.forEach(movie => {
    const movieElem = document.createElement('li');
    const {info, ...otherProps} = movie;
    console.log(otherProps);

    let movieText = `${info.title} - `;
    
    for (const key in info) {
      if (key !== 'title') {
        movieText = movieText + `${key}: ${info[key]}`;
      }
    }

    movieElem.innerHTML = movieText;
    movieList.append(movieElem);
  });
};

const addMovieHandler =() => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
    return;
  }

  const newMovie = {
    id: Math.random(),
    info: {
      title,
      [extraName]: extraValue
    }
  };

  movies.push(newMovie);
  console.log('addMovieHandler: ', movies);
  renderMovie();
};

const searchMovieHandler = () => {
  const searchTerm = document.getElementById('filter-title').value;

  renderMovie(searchTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

// function doSomething() {
//   console.log(this);
// }

const doSomething = () => {
  console.log(this);
};

doSomething();

const person = { 
  name: 'Max',
  greet() {
    console.log(this);
    console.log(this.name);
  }
};

// person.greet(); 
// const anotherPerson = { name: 'Manuel' }; // does NOT have a built-in greet method!
 
// anotherPerson.sayHi = person.greet; // greet is NOT called here, it's just assigned to a new property/ method on the "anotherPerson" object
// // console.log(anotherPerson); 
// anotherPerson.sayHi();

const { greet } = person;
greet.call(person);
