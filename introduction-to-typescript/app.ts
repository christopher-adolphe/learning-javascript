// Using type casting
const num1InputElem = document.getElementById('num1') as HTMLInputElement;
const num2InputElem = <HTMLInputElement>document.getElementById('num2');
const button = document.querySelector('button');
const resultElem = document.getElementById('result') as HTMLParagraphElement;

const add = (a: number, b: number): number => {
  return a + b;
};

// const result = add(5, 3);

// Using type alias to create a union literal type
type PrintMode = 'console' | 'alert';

// An alternative to string literal with union type is to use the enum type
enum OutputMode { CONSOLE, ALERT };

const printAdditionResult = (a: number, b: number, result: number, printMode: OutputMode): void => {
  if (printMode === OutputMode.CONSOLE) {
    console.log(`Adding ${a} + ${b} = `, result);
  } else if (printMode === OutputMode.ALERT) {
    alert(`Adding ${a} + ${b} = ${result}`);
  }
};

let isDone: boolean;

isDone = true;

// Using interface
interface Data {
  value: number;
  print(): number;
  // print: () => number;
}

// Using type alias to create a custom type
type CalculationResult = Data[];

// An alternative syntax would be to use Generic type
const results: CalculationResult = [];
// const results: Array<CalculationResult> = [];

let index = 0;

button.addEventListener('click', () => {
  const inputValue1 = +num1InputElem.value;
  const inputValue2 = +num2InputElem.value;
  const result = add(inputValue1, inputValue2);
  const data = {
    value: result,
    print() {
      return this.value;
    }
  };

  results.push(data);
  printAdditionResult(inputValue1, inputValue2, data.value, OutputMode.ALERT);
  // const returnedResult = results[index].print();
  // index++;
  // console.log('returnedResult: ', returnedResult);

  resultElem.textContent = result.toString();

  console.log(results);
});

// Implementing an interface to a class. An interface can be used as
// a contract that ensure that a class and the object created from that
// class is guaranteed to have a specific properties and method.
// Interface provide additional type safety
interface User {
  name: string;
  age: number;
}

interface Greetable {
  sayHello(name: string): void;
}

// TypeScript forces us to declare the fields of a class before we start using them as properties within the class
class User implements User, Greetable {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;

    this.sayHello(this.name);
  }

  sayHello(name: string) {
    console.log(`Hello ${name}`);
  }
}

// A shortcut syntax to avoid declaring the fields is to use access modifiers with the constructor parameters
class User1 {
  constructor(public name: string, private age: number) {}
}

class Admin extends User1 {
  constructor(name: string, age: number, permission: string[]) {
    super(name, age);
  }
}

const user = new User('Sophie', 30);

// Using Generic types to create a generic function
// Here we are declaring a function with a generic type 'T'
// and we state that the function's argument will be of this same type
// This means if we call this function with a type string, the `logAndEcho()`
// function will only accept a string parameter
function logAndEcho<T>(val: T) {
  console.log(val);
  return val;
}

const words = logAndEcho<string>('Hi Bennie').split(' ');
