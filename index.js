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

    calculate() {
        let result;

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operation) {
            case "+":
                result = previousOperandFloat + currentOperandFloat;
                break;
            case "-":
                result = previousOperandFloat - currentOperandFloat;
                break;
            case "÷":
                result = previousOperandFloat / currentOperandFloat;
                break;
            case "*":
                result = previousOperandFloat * currentOperandFloat;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;

        if (this.previousOperand !== "") {
            this.calculate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return; //não digitar mais de um ponto
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }
    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOP.innerText = `${this.previousOperand} ${this.operation || ""} `;
        this.currentOP.innerText = this.currentOperand;
    }
}

const calculator = new Calculator(previousOP, currentOP);

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}
