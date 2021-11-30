const calculatorElem = document.getElementById('calculator');

if (calculatorElem) {
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
    currentOperandElem.textContent = formatNumber(result);

    previousOperandValue = null;
    operation = null;
    previousOperandElem.textContent = '';
  });

  numberBtnList.forEach(numberBtnElem => {
    numberBtnElem.addEventListener('click', (event) => {
      const newNumber = event.target.textContent;

      if (currentOperandValue === null || currentOperandValue === '') {
        currentOperandValue = newNumber;
        currentOperandElem.textContent = formatNumber(currentOperandValue);

        return;
      }

      if (newNumber === '.' && currentOperandValue.includes('.')) {
        return;
      }

      currentOperandValue = `${currentOperandValue}${newNumber}`;
      currentOperandElem.textContent = formatNumber(currentOperandValue);
    });
  });

  operationBtnList.forEach(operationBtnElem => {
    operationBtnElem.addEventListener('click', (event) => {
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

        operation = newOperation;
        currentOperandValue = null;
        currentOperandElem.textContent = '';

        return;
      }

      if (operation !== null) {
        previousOperandValue = evaluate(newOperation);
        previousOperandElem.textContent = `${formatNumber(previousOperandValue)} ${newOperation}`;

        operation = newOperation;
        result = null;
        currentOperandValue = null;
        currentOperandElem.textContent = '';
      }
    });
  });
}
