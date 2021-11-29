const calculatorElem = document.getElementById('calculator');
const previousOperandElem = calculatorElem.querySelector('.calculator__previous-operand');
const currentOperandElem = calculatorElem.querySelector('.calculator__current-operand');
const numberBtnList = calculatorElem.querySelectorAll('[data-number]');
const operationBtnList = calculatorElem.querySelectorAll('[data-operation]');
const allClearBtnElem = calculatorElem.querySelector('[data-all-clear]');
const deleteBtnElem = calculatorElem.querySelector('[data-delete]');
const evaluateBtnElem = calculatorElem.querySelector('[data-evaluate]');

let previousOperandValue = null;
let currentOperandValue = null;
let operation = null;
let result = null;

const evaluate = () => {
  const previousValue = parseFloat(previousOperandValue);
  const currentValue = parseFloat(currentOperandValue);

  if (isNaN(previousValue) || isNaN(currentValue)) {
    return;
  }

  switch (operation) {
    case '÷':
      result = previousValue / currentValue;
      return result;

    case '*':
      result = previousValue * currentValue;
      return result;

    case '-':
      result = previousValue - currentValue;
      return result;

    case '+':
      result = previousValue + currentValue;
      return result;

    default:
      return;
  }
}

allClearBtnElem.addEventListener('click', () => {
  previousOperandValue = null;
  currentOperandValue = null;
  operation = null;
  result = null;

  previousOperandElem.textContent = '';
  currentOperandElem.textContent = '';
});

deleteBtnElem.addEventListener('click', () => {
  if (!currentOperandValue) {
    return;
  }

  currentOperandValue = currentOperandValue.toString().slice(0 , -1);
  currentOperandElem.textContent = currentOperandValue;
});

evaluateBtnElem.addEventListener('click', () => {
  if (previousOperandValue === null && operation === null) {
    return;
  }

  result = evaluate();
  previousOperandElem.textContent = result;

  currentOperandValue = null;
  operation = null;
  currentOperandElem.textContent = '';
});

numberBtnList.forEach(numberBtnElem => {
  numberBtnElem.addEventListener('click', (event) => {
    const newNumber = event.target.textContent;

    if (currentOperandValue === null || currentOperandValue === '') {
      currentOperandValue = newNumber;
      currentOperandElem.textContent = currentOperandValue;

      return;
    }

    if (newNumber === '.' && currentOperandValue.includes('.')) {
      return;
    }

    currentOperandValue = `${currentOperandValue}${newNumber}`;
    currentOperandElem.textContent = currentOperandValue;
  });
});

operationBtnList.forEach(operationBtnElem => {
  operationBtnElem.addEventListener('click', (event) => {
    const newOperation = event.target.textContent;

    if (!currentOperandValue && !result) {
      console.log('currentOperandValue exist check');
      console.log('result: ', result);
      return;
    }

    if (currentOperandValue === null && result !== null) {
      console.log('result is not null check');
      console.log('result: ', result);
      previousOperandValue = result;
      previousOperandElem.textContent = `${result} ${newOperation}`;

      operation = newOperation;

      return;
    }

    if (operation === null) {
      previousOperandValue = currentOperandValue;
      previousOperandElem.textContent = `${currentOperandValue} ${newOperation}`;

      operation = newOperation;
      currentOperandValue = null;
      currentOperandElem.textContent = '';

      return;
    }

    if (operation !== null) {
      previousOperandValue = evaluate(newOperation);
      previousOperandElem.textContent = `${previousOperandValue} ${newOperation}`;

      operation = newOperation;
      currentOperandValue = null;
      currentOperandElem.textContent = '';
    }
  });
});
