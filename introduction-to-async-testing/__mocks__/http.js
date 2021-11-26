// Mocking the fetchData function so that we don't make
// a real call to the API when running our tests

const fetchData = () => {
  console.log('Fetching data from mocked API...');
  return Promise.resolve({ title: 'delectus aut autem' });
};

exports.fetchData = fetchData;
