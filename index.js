const dqs = (element) => document.querySelector(element);
const dqsa = (element) => document.querySelectorAll(element);

const numbersButtons = dqsa("[data-number]");
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
