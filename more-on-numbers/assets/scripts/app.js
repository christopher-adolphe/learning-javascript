// Using the Number constructor to get the largest integer in javascript
const largestInteger1 = Number.MAX_SAFE_INTEGER;
console.log('Largest integer 1: ', largestInteger1);

// It is equivalent to 2 to the power of 53 minus 1
const largestInteger2 = Math.pow(2, 53) - 1;
console.log('Largest integer 2: ', largestInteger2);

// Using the Number constructor to get the smallest integer in javascript
const smallestInteger = Number.MIN_SAFE_INTEGER;
console.log('Smallest integer: ', smallestInteger);

// Using the Number constructor to get the largest number in javascript
const largestNumber = Number.MAX_VALUE;
console.log('Largest number: ', largestNumber);

// Using the Number constructor to get the smallest number in javascript
const smallestNumber = Number.MIN_VALUE;
console.log('Smallest number: ', smallestNumber);

// Floating point precision
console.log('--- Floating Point Precision ---');
let sumFloats = 0.2 + 0.4;
console.log(`Sum of 0.2 and 0.4 is not 0.6 but ${sumFloats}`);
console.log(`Actually 0.2 in the binary system is ${(0.2).toString(2)}`);
console.log(`Actually 0.4 in the binary system is ${(0.4).toString(2)}`);

// Using toFixed() method to set the number of decimal places you want to output
sumFloats = (0.2 + 0.4).toFixed(2);
console.log(`Setting 2 decimal places with toFixed(2) for sum of 0.2 and 0.4 is ${sumFloats}`);

// Perfect precision
console.log('--- Workaround for Perfect Precision ---');
// A common way to get perfect precision is to multiple the number by 100
const price1 = 165.95;
const price2 = 287.65;
const totalPrice = 20.5;
const totalPrice2 = (price1 *100) + (price2 * 100);
console.log('totalPrice without precision: ', totalPrice);
console.log('totalPrice with precision: ', totalPrice * 100);
console.log('totalPrice2 without precision: ', price1 + price2);
console.log('totalPrice2 with precision: ', totalPrice2 / 100);

// The BigInt Type
console.log('--- The BigInt Type ---');
console.log('90071992547409919007199254740991 as BigInt: ', 90071992547409919007199254740991n);
// BigInts and Numbers cannot be mixed
console.log('Mixing 450n to 12: TypeError: Cannot mix BigInt and other types, use explicit conversions');
// Converting a BigInt into a number
console.log('Converting 450n to a number: ', parseInt(450n));
// Converting a number into a BigInt
console.log('Converting 12 to a BigInt: ', BigInt(12));

// The Global Number Object
console.log('--- The Global Number Object ---');
// Check if a number is finite
console.log('Is 10 finite: ', Number.isFinite(10));
console.log('Is 1/0 finite: ', Number.isFinite(1/0));

// The Global Math Object
console.log('--- The Global Math Object ---');
const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
console.log('Generate a random number between 5 & 35: ', randomInRange(5, 35));

// Strings
console.log('--- Strings ---');
const firstName = 'Jade';
console.log(`Hello ${firstName}`);

// Template tag allows to concatenate a template literal to a function
// which then execute the function and uses the concatenated template literal
// as parameters to the function. The first parameter will be an array of the
// concatenated template literal splitted by whitespace and the remaining parameters
// will be any dynamic value passed in the concatenated template literal.
const product = {
  name: 'Mountain Bike',
  price: 24000
};

const productDescription = (strings, prodName, prodPrice) => {
  console.log('productDescription: ', strings);
  console.log('productDescription: ', prodName);
  console.log('productDescription: ', prodPrice);
  let priceCategory = 'cheap';

  if (prodPrice > 10000) {
    priceCategory = 'expensive';
  }

  return `${strings[0]}${product.name}${strings[1]}${priceCategory}${strings[2]}`
};

const description = productDescription`This product (${product.name}) is ${product.price}.`;
console.log('Description: ', description);

// Regular Expressions
console.log('--- Regular Expressions ---');
// Regular expressions are used to search for patterns in strings
const regex = /^\S+@\S+\.\S+$/
// Understanding the different parts of the above regular expression
// The first and last forward slashes / denotes that this is a regular expression
// The ^ defined the beginning of the tested string (starting from the left)
// The \S+ implies any kind of word
// The @ implies that the tested string should contain this character
// The \. implies that the tested string should contain a period. The back slash is used here to escape the period in the regEx
// The $ defines the end of the test string

// A regular expression pattern can also be created using the RegExp constructor function

let userInput = 'someemail@gmail.com';

// Using the test() method to search the pattern in the provided string
console.log('Is userInput valid: ', regex.test(userInput));

userInput = 'someemailgmail.com';
console.log('Is userInput valid: ', regex.test(userInput));