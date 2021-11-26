// Mocking the 'get()' method of axios. This is a way of mocking
// global node module in this case here, axios. Jest will automatically
// use this mock
const get = (url) => {
  return Promise.resolve({ data: { title: 'delectus aut autem' } });
}

exports.get = get;
