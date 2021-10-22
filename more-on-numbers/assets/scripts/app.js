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