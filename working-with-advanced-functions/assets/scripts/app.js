/* Pure Functions
 * A pure function is one that always produces the same output
 * for a given input and that does not cause any side effects (i.e:
 * it does not cause any changes outside the function). For example,
 * the add function below will always produce a result of 8 given
 * 3 and 5 are provided as inputs.
 */

// Pure Function
const addV1 = (num1, num2) => {
  return num1 + num2;
};

let additionResultV1 = addV1(3, 5);
console.log('additionResultV1 for 3 + 5: ', additionResultV1); // 8

additionResultV1 = addV1(4, 3);
console.log('additionResultV1 for 4 + 3: ', additionResultV1); // 7

// Impure Function
const getRandomNumber = (num) => {
  return Math.floor(Math.random() * num);
}

let randomResult = getRandomNumber(3);
// Output will be different given the same input
console.log('randomResult 1st call: ', randomResult); // Expected output could be 0, 1 or 2

randomResult = getRandomNumber(3);
// Output will be different given the same input
console.log('randomResult 2nd call: ', randomResult);


// Impure Function with side effect
let globalResult = 0;

console.log('globalResult before: ', globalResult); // 0

const addV2 = (num1, num2) => {
  const sum = num1 + num2;

  globalResult = globalResult + sum; // Side effect occuring here

  return sum;
};

let additionResultV2 = addV2(3, 5);
console.log('additionResultV2 for 3 + 5: ', additionResultV2); // 8

// The value of globalResult is changing as a result of the side effect in addV2()
console.log('globalResult after 3 + 5: ', globalResult); // 8

additionResultV2 = addV2(2, 12);
console.log('additionResultV2 for 2 + 12: ', additionResultV2); // 14

// The value of globalResult is changing as a result of the side effect in addV2()
console.log('globalResult after 2 + 12: ', globalResult); // 22

/* Factory Functions
 * A factory function is one that produces another function. Such
 * a function is useful in case where we need to call a function
 * multiple times to perform an operation but with different parameters.
 */

// Basic Tax Calculator
const calculateTax = (amount, tax) => {
  return amount * tax;
};

// Calling calculateTax() with 0.15 tax to calculate VAT
let addedValueTax = calculateTax(7500, 0.15);
console.log('addedValueTax: ', addedValueTax);

// Calling calculateTax() with 0.25 tax to calculate Income Tax
let incomeTax = calculateTax(25000, 0.25);
console.log('incomeTax: ', incomeTax);

// Refactoring the Basic Tax Calculator as a Factory Function
const generateTaxCalculator = (tax) => {
  const calculateTax = (amount) => {
    return amount * tax;
  };

  return calculateTax;
};

// Using the generateTaxCalculator() factory function to create a VAT calculator
const valueAddedTaxCalculator = generateTaxCalculator(0.15);

addedValueTax = valueAddedTaxCalculator(7500);
console.log('addedValueTax using factory function: ', addedValueTax);

// Using the generateTaxCalculator() factory function to create an income taxt calculator
const incomeTaxCalcultor = generateTaxCalculator(0.25);

incomeTax = incomeTaxCalcultor(25000);
console.log('incomeTax using factory function: ', incomeTax);

/* Closures
 * Every function is a closure in javascript, meaning it will memorize its lexical
 * environment where it will register any parameters and variables to which it
 * has access to.
 */

let username = 'Jane';

const greetUser = () => {
  // The greet() function will register the name variable in its scope and use its value.
  // The value of the name variable declared at line 114 will be shadowed as inner scope wins over global scope
  // because of the closure created by the greet() function
  let name = 'Alex';

  console.log(`Hello, ${name}`); // Expected output is: Hello, Alex
};

let name = 'Lexy';

username = 'Amy';

greetUser();

/* Recursion
 * A recursive function is one where that function calls itself in order to produce an output.
 */

// Creating a powerOf() function
const powerOf = (x, n) => {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

console.log('2 to the power of 3 is: ', powerOf(2, 3)); // Expected output: 8 (2 * 2 * 2)

// Refactoring powerOf() using recursion
const powerOfV2 = (x ,n) => {
  // Condition applied to stop the recursion
  if (n === 1) {
    return x;
  }

  return x * powerOfV2(x, n - 1);
  
  // One liner
  // return n === 1 ? x : x * powerOfV2(x, n - 1);
};

console.log('2 to the power of 3 is: ', powerOfV2(2, 3)); // Expected output: 8 (2 * 2 * 2)

// Recursion example
const myRelatives = {
  name: 'John',
  friends: [
    {
      name: 'Paul',
      friends: [
        {
          name: 'Sheila'
        }
      ]
    },
    {
      name: 'Lexia',
      friends: [
        {
          name: 'Johnny',
          friends: [
            {
              name: 'Sonia',
            },
            {
              name: 'Peggy'
            }
          ]
        }
      ]
    }
  ]
};

const getFriends = (relativeObj) => {
  let friendNames = [];

  if (!relativeObj.friends) {
    return [];
  }

  for (const friend of relativeObj.friends) {
    friendNames.push(friend.name);
    friendNames.push( ...getFriends(friend));
  }

  return friendNames;
}

const friendList = getFriends(myRelatives);
console.log('friendList: ', friendList);
