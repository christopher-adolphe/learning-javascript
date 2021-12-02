const bindElemById = (elemId, eventType, handlerFn) => {
  const elem = document.getElementById(elemId);

  if (!elem) {
    return;
  }

  if (eventType && handlerFn) {
    elem.addEventListener(eventType, handlerFn);
  }

  return elem;
};

const bindElemBySelector = (selector, eventType, handlerFn) => {
  const elem = document.querySelector(selector);

  if (!elem) {
    return;
  }

  if (eventType && handlerFn) {
    elem.addEventListener(eventType, handlerFn);
  }

  return elem;
};

const bindAllElemsBySelector = (selector, eventType, handlerFn) => {
  const elems = document.querySelectorAll(selector);

  if (!elems.length) {
    return;
  }

  elems.forEach(elem => {
    if (eventType && handlerFn) {
      elem.addEventListener(eventType, handlerFn);
    }
  });

  return elems;
};

const formatNumber = (number) => {
  const stringInput = number.toString();
  const wholeNumberDigits = parseFloat(stringInput.split('.')[0]);
  const fractionDigits = stringInput.split('.')[1];
  let formattedNumber;

  if (isNaN(wholeNumberDigits)) {
    formattedNumber = '';
  } else {
    formattedNumber = wholeNumberDigits.toLocaleString('en', { maximumFractionDigits: 0 });
  }

  if (fractionDigits) {
    return `${formattedNumber}.${fractionDigits}`;
  } else {
    return formattedNumber;
  }
};

const computeOperation = () => {
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
};

const powerOnHander = () => {
  if (!calculatorElem) {
    return;
  }

  console.log('powerOnHander called');
};

const clearAllHander = () => {
  previousOperandValue = null;
  currentOperandValue = null;
  operation = null;
  result = null;

  previousOperandElem.textContent = '';
  currentOperandElem.textContent = '';
};

const deleteHander = () => {
  if (!currentOperandValue) {
    return;
  }

  currentOperandValue = currentOperandValue.toString().slice(0, -1);
  currentOperandElem.textContent = currentOperandValue;
};

const evaluateHander = () => {
  if (previousOperandValue === null && operation === null) {
    return;
  }

  currentOperandElem.textContent = formatNumber(computeOperation());

  previousOperandValue = null;
  operation = null;
  previousOperandElem.textContent = '';
};

const numberHander = (event) => {
  const newNumber = event.target.textContent;

  if (newNumber === '.' && currentOperandValue?.includes('.')) {
    return;
  }

  if (currentOperandValue === null || currentOperandValue === '') {
    currentOperandValue = newNumber;
  } else {
    currentOperandValue = `${currentOperandValue}${newNumber}`;
  }

  currentOperandElem.textContent = formatNumber(currentOperandValue);
};

const operationHandler = (event) => {
  const newOperation = event.target.textContent;

  if (!currentOperandValue && !result) {
    return;
  }

  if (currentOperandValue !== null && result !== null) {
    previousOperandValue = result;
    previousOperandElem.textContent = `${formatNumber(result)} ${newOperation}`;

    operation = newOperation;
    result = null;
    currentOperandValue = null;
    currentOperandElem.textContent = '';

    return;
  }

  if (operation === null) {
    previousOperandValue = currentOperandValue;
    previousOperandElem.textContent = `${formatNumber(currentOperandValue)} ${newOperation}`;
  } else {
    previousOperandValue = computeOperation();
    previousOperandElem.textContent = `${formatNumber(previousOperandValue)} ${newOperation}`;
    result = null;
  }

  operation = newOperation;
  currentOperandValue = null;
  currentOperandElem.textContent = '';
};

const calculatorElem = bindElemById('calculator');
const previousOperandElem = bindElemBySelector('.calculator__previous-operand');
const currentOperandElem = bindElemBySelector('.calculator__current-operand');
const powerBtnElem = bindElemBySelector('[data-power]', 'click', powerOnHander);
const allClearBtnElem = bindElemBySelector('[data-all-clear]', 'click', clearAllHander);
const deleteBtnElem = bindElemBySelector('[data-delete]', 'click', deleteHander);
const evaluateBtnElem = bindElemBySelector('[data-evaluate]', 'click', evaluateHander);
const numberBtnList = bindAllElemsBySelector('[data-number]', 'click', numberHander);
const operationBtnList = bindAllElemsBySelector('[data-operation]', 'click', operationHandler);
let previousOperandValue = null;
let currentOperandValue = null;
let operation = null;
let result = null;
