const dqs = (element) => document.querySelector(element);
const dqsa = (element) => document.querySelectorAll(element);

const numberButtons = dqsa("[data-number]");
const operationButtons = dqsa("[data-operator]");

const equalsButton = dqs("[data-equals]");
const deleteButton = dqs("[data-delete]");
const allClearButton = dqs("[data-all-clear]");
const previousOP = dqs("[data-previous-operand]");
const currentOP = dqs("[data-current-operand]");

class Calculator {
    constructor(previousOP, currentOP) {
        this.previousOP = previousOP;
        this.currentOP = currentOP;
        this.clear();
    }

    appendNumber(number) {
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }
    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOP.innerText = this.previousOperand;
        this.currentOP.innerText = this.currentOperand;
    }
}

const calculator = new Calculator(previousOP, currentOP);

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}
