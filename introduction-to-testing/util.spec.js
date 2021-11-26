
const puppeteer = require('puppeteer');
const { generateText, validateAndGenerate } = require('./util');

// Unit test example
test('should return a string with name and age', () => {
  // Arrange
  const name = 'Lexi Lux';
  const age = 30;

  // Act
  const result = generateText(name, age);

  // Assert
  expect(result).toBe(`${name} (${age} years old)`);
});

// Integration test example
test('should return a string with name and age given inputs are valid', () => {
  // Arrange
  const name = 'Lexi Lux';
  const age = 30;

  // Act
  const result = validateAndGenerate(name, age);

  // Assert
  expect(result).toBe(`${name} (${age} years old)`);
});

// End-to-end test example
// The E2E test will use Puppeteer to do the Arrange and Act in a browser (Chromium)
// and Jest for the Assertion part
test('should create a new list element with name and age', async () => {
  // Arrange

  // Using the 'launch()' method to launch a browser
  // This method can take a configuration object to overwrite puppeteer's
  // default setting when launching a browser
  // NOTE: If the 'slowMo' config is set, do no forget to increase the timeout option
  // of the Jest test suite. Otherwise the test will fail as the puppeteer is taking longer
  // to execute the steps
  const browser = await puppeteer.launch({ headless: false, slowMo: 80 });

  // Using the 'newPage()' method to instruct puppeteer the url it should visit
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://127.0.0.1:5500/index.html');

  // Act
  // Input the name
  await page.click('input#name');
  await page.type('input#name', 'Jane Doe');

  // Input the age
  await page.click('input#age');
  await page.type('input#age', '32');

  // Click the button
  await page.click('#btnAddUser');

  // Using the '$eval' method to query DOM elements that can then be used to do assertion
  const liText = await page.$eval('.user-item', (elem) => elem.textContent);

  // Assert
  expect(liText).toBe('Jane Doe (32 years old)');

  // Using the 'close()' method to close the browser after all steps are done
  await browser.close();
}, 10000);
