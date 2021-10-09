// Defining a Class
class PersonV1 {
  name = 'Jane';

  constructor() {
    this.age = 30;
  }

  greet() {
    console.log(`Hello! I am ${this.name} and I am ${this.age} years old.`);
  }
}

// Defining a Constructor function
function PersonV2() {
  this.name = 'John';
  this.age = '33';
  this.greet = () => {
    console.log(`Hello! I am ${this.name} and I am ${this.age} years old.`);
  }
}

PersonV2.prototype = {
  printAge() {
    console.log(`My age is ${this.age}`);
  }
}

// Classes behind the scene
function PersonV3() {
  this.name = 'Judith';
  this.age = '25';
  this.greet = () => {
    console.log(`Hello! I am ${this.name} and I am ${this.age} years old.`);
  }

  return this;
}

const person1 = new PersonV1();
person1.greet();
// console.log('PersonV1: ', typeof(PersonV1));
// console.log('person1: ', typeof(person1));
console.dir(person1);

// Using the 'new' keyword on a constructor function allows to instantiate an object
const person2 = new PersonV2();
person2.greet();
// console.log('PersonV2: ', typeof(PersonV2));
// console.log('person2: ', typeof(person2));
console.dir(person2);
console.log(person2.__proto__);

// Trying without new keyword
const person3 = PersonV3();
person3.greet();
// console.log('PersonV3: ', typeof(PersonV3));
// console.log('person3: ', typeof(person3));
console.dir(person3);
