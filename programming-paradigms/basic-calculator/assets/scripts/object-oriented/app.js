class Calculator {
  calculatorElem;
  previousOperandElem;
  currentOperandElem;
  allClearBtnElem;
  numberBtnList;
  deleteBtnElem;
  operationBtnList;
  evaluateBtnElem;
  previousOperandValue;
  currentOperandValue;
  operation;
  result;

  constructor(parentElemId) {
    this.registerDOMElems(parentElemId);
    this.clearAllHander();
  }

  registerDOMElems(parentElemId) {
    this.calculatorElem = document.getElementById(parentElemId);

    if (!this.calculatorElem) {
      return;
    }

    this.previousOperandElem = this.calculatorElem.querySelector('.calculator__previous-operand');
    this.currentOperandElem = this.calculatorElem.querySelector('.calculator__current-operand');
    this.numberBtnList = this.calculatorElem.querySelectorAll('[data-number]');
    this.operationBtnList = this.calculatorElem.querySelectorAll('[data-operation]');
    this.allClearBtnElem = this.calculatorElem.querySelector('[data-all-clear]');
    this.deleteBtnElem = this.calculatorElem.querySelector('[data-delete]');
    this.evaluateBtnElem = this.calculatorElem.querySelector('[data-evaluate]');

    this.numberBtnList.forEach(numberBtn => {
      numberBtn.addEventListener('click', this.numberHandler.bind(this));
    });
    this.operationBtnList.forEach(operationBtn => {
      operationBtn.addEventListener('click', this.operationHandler.bind(this));
    });
    this.allClearBtnElem.addEventListener('click', this.clearAllHander.bind(this));
    this.deleteBtnElem.addEventListener('click', this.deleteHandler.bind(this));
    this.evaluateBtnElem.addEventListener('click', this.evaluateHandler.bind(this));
  }

  formatNumber(number) {
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
  }

  updateDisplay() {
    this.currentOperandElem.textContent = this.formatNumber(this.currentOperandValue);

    if (this.operation !== null) {
      this.previousOperandElem.textContent = `${this.formatNumber(this.currentOperandValue)} ${this.operation}`;
    } else {
      this.previousOperandElem.textContent = `${this.formatNumber(this.previousOperandValue)} ${this.operation}`;
    }
  }

  computeOperation() {
    const previousValue = parseFloat(this.previousOperandValue);
    const currentValue = parseFloat(this.currentOperandValue);

    if (isNaN(previousValue) || isNaN(currentValue)) {
      return;
    }

    switch (this.operation) {
      case '÷':
        this.result = previousValue / currentValue;
        return this.result;

      case '*':
        this.result = previousValue * currentValue;
        return this.result;

      case '-':
        this.result = previousValue - currentValue;
        return this.result;

      case '+':
        this.result = previousValue + currentValue;
        return this.result;

      default:
        return;
    }
  }

  numberHandler(event) {
    const newNumber = event.target.textContent;

    if (newNumber === '.' && this.currentOperandValue?.includes('.')) {
      return;
    }

    if (this.currentOperandValue === null || this.currentOperandValue === '') {
      this.currentOperandValue = newNumber;
    } else {
      this.currentOperandValue = `${this.currentOperandValue}${newNumber}`;
    }

    this.currentOperandElem.textContent = this.formatNumber(this.currentOperandValue);
  }

  operationHandler(event) {
    const newOperation = event.target.textContent;

    if (!this.currentOperandValue && !this.result) {
      return;
    }

    if (this.currentOperandValue !== null && this.result !== null) {
      this.previousOperandValue = this.result;
      this.previousOperandElem.textContent = `${this.formatNumber(this.result)} ${newOperation}`;

      this.operation = newOperation;
      this.result = null;
      this.currentOperandValue = null;
      this.currentOperandElem.textContent = '';

      return;
    }

    if (this.operation === null) {
      this.previousOperandValue = this.currentOperandValue;
      this.previousOperandElem.textContent = `${this.formatNumber(this.currentOperandValue)} ${newOperation}`;
    } else {
      this.previousOperandValue = this.computeOperation();
      this.previousOperandElem.textContent = `${this.formatNumber(this.previousOperandValue)} ${newOperation}`;
      this.result = null;
    }

    this.operation = newOperation;
    this.currentOperandValue = null;
    this.currentOperandElem.textContent = '';
  }

  clearAllHander() {
    this.previousOperandValue = null;
    this.currentOperandValue = null;
    this.operation = null;
    this.result = null;

    this.previousOperandElem.textContent = '';
    this.currentOperandElem.textContent = '';
  }

  deleteHandler() {
    if (!this.currentOperandValue) {
      return;
    }

    this.currentOperandValue = this.currentOperandValue.toString().slice(0 , -1);
    this.currentOperandElem.textContent = this.currentOperandValue;
  }

  evaluateHandler() {
    if (this.previousOperandValue === null && this.operation === null) {
      return;
    }

    this.currentOperandElem.textContent = this.formatNumber(this.computeOperation());

    this.previousOperandValue = null;
    this.operation = null;
    this.previousOperandElem.textContent = '';
  }
}

new Calculator('calculator');
