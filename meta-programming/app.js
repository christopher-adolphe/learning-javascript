// A symbol is a built-in object whose constructor return a symbol primitive
// that is guaranteed to be unique. Symbols are often used to add unique
// property keys to an object that won't collide with keys that any other
// code might add to the object and which are hidden from any mechanism
// other code will typically use to access the object
const uid = Symbol('uid');
console.log(uid);

const user = {
  [uid]: 'p1',
  name: 'Samantha',
  age: 30,
  [Symbol.toStringTag]: 'User'
};

console.log('user: ', user);

user[uid] = 'p2';
console.log('user: ', user);
console.log(user.toString());

// An iterator is an object that knows how to access the elements of a collection
// one by one and also knows their position in the collection. The iterator exposes
// a 'next()' method which returns the next element in the collection in the form of
// of an object containing the properties 'value' and 'done' i.e { value: 'element 1', done: false }
// An iterator completes when the object returned by the 'next()' method has the key
// 'done' set to true
const company = {
  curEmployee: 0,
  employees: ['Sasha', 'Virgot', 'Victoria'],
  next() {
    if (this.curEmployee >= this.employees.length) {
      return { value: this.curEmployee, done: true }
    }

    const returnValue = { value: this.employees[this.curEmployee], done: false };

    this.curEmployee++;
    return returnValue;
  },
  // A generator is an iterator factory meaning it a function that returns an iterator
  // Generator functions are written using the 'function*' syntax and allow you to define
  // the iterative algorithm by writing a single function whose execution is not continous.
  // This means that when a generator function is called, it does not initially execute its code
  // but will intstead return an iterator. When the value of this generated iterator is
  // consumed using the 'next()' method, then the generator function executes until it
  // encounters the 'yield' keyword which will either pause or resume the generator function
  [Symbol.iterator]: function* employeeGenerator() {
    // let employee = company.next();

    // while(!employee.done) {
    //   yield employee.value;
    //   employee = company.next();
    // }

    let currentEmployee = 0;

    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee];
      currentEmployee++;
    }
  }
};

// const companyIterator = company.getEmployee();

// console.log(companyIterator.next()); // expected output: { value: 'Sasha', done: false }
// console.log(companyIterator.next()); // expected output: { value: 'Virgot', done: false }
// console.log(companyIterator.next()); // expected output: { value: 'Victoria', done: false }
// console.log(companyIterator.next()); // expected output: { value: undefined, done: true }


// let employee = company.next();

// while(!employee.done) {
//   console.log(employee.value);
//   employee = company.next();
// }

for (const employee of company) {
  console.log(employee);
}

// Reflect is a built-in object which provides an API that groups a set of static methods that allows us
// to control how an object is used or should behave
const course = {
  title: 'iOS development',
  price: 11.99
};

// Using the Reflect API to add a custom 'toString()' prototype
Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  }
});
console.log(course.toString()); // expected output: iOS development

// Using the Reflect API to delete a property
Reflect.deleteProperty(course, 'price');
console.log(course); // expected output: { title: 'iOS development' }

// Using the Reflect API to define a new property
Reflect.defineProperty(course, 'tags', { value: ['Mobile', 'Beginner to advance'] });
console.log(course); // expected output: { title: 'iOS development', tags: ['Mobile', 'Beginner to advance'] }
course.tags.push('Bootcamp');
console.log(course);

// The Proxy object enables you to create a proxy for another object which can intercept and redefine
// fundamental operations of that object. It is created with two parameters; the 'target' which is the
// original object you want to proxy and the 'handler' which is an object that defines which operations
// will be intercepted and how to redefined the intercepted operations

// Creating a handler for the course object
const courseHandler = {
  // This 'get' function is called a 'trap' as it allows us to step in the proxy to redefine operations
  get(object, propertyName) {
    console.log(`Executing Proxy handler on property: ${propertyName}`);
    if (propertyName === 'level') {
      return 'The property level is reserved for internal usage and cannot be set';
    }

    return `${object[propertyName]} 2021 Updates`;
  },
  // Using the 'set' trap
  set(object, propertyName, newValue) {
    // Allowing only new key 'rating' to be added to the object
    if (propertyName !== 'rating') {
      return;
    }

    return object[propertyName] = newValue;
  }
};

const proxiedCourse = new Proxy(course, courseHandler);

console.log('Original course object title: ', course.title); // expected output: iOS development
console.log('Proxy course object title: ', proxiedCourse.title); // expected output: iOS development 2021 Updates
proxiedCourse.rating = 9;
proxiedCourse.level = 'Beginner to advance';
console.log('Proxy course object rating: ', proxiedCourse.rating); // expected output: 9
console.log('Proxy course object level: ', proxiedCourse.level); // expected output: The property level is reserved for internal usage and cannot be set
