// Instructing Jest to use the mock API for the test
// jest.mock('./http');

const { loadTitle } = require('./util');

// test('should print an uppercase text', () => {
//   loadTitle().then(title => {
//     expect(title).toBe('DELECTUS AUT AUTEM');
//   });
// });

test('should print an uppercase text', async () => {
  const title = await loadTitle();

  expect(title).toBe('DELECTUS AUT AUTEM');
});
