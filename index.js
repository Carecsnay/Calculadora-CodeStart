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

    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const integer = parseFloat(stringNumber.split(".")[0]);
        const decimal = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integer)) {
            integerDisplay = "";
        } else {
            integerDisplay = integer.toLocaleString("en", { maximumFractionDigits: 0 });
        }
        if (decimal != null) {
            return `${integerDisplay}.${decimal}`;
        } else {
            return integerDisplay;
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
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
        if (this.currentOperand.toString().includes(".") && number === ".") return; //não digitar mais de um ponto
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOP.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""} `;
        this.currentOP.innerText = this.formatDisplayNumber(this.currentOperand);
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

deleteButton.addEventListener("click", () => {
    calculator.delete();
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

const addActiveEffect = (button) => {
    button.classList.add("button-active");
    setTimeout(() => button.classList.remove("button-active"), 150);
};

window.addEventListener("keydown", (e) => {
    console.log(`Pressionou a tecla: ${e.key}`);
    for (const numberButton of numberButtons) {
        if (e.key === numberButton.innerText) {
            calculator.appendNumber(numberButton.innerText);
            calculator.updateDisplay();
            addActiveEffect(numberButton);
            return;
        }
    }

    for (const operationButton of operationButtons) {
        const operation = e.key === "/" ? "÷" : e.key;
        if (operation === operationButton.innerText) {
            calculator.chooseOperation(operationButton.innerText);
            calculator.updateDisplay();
            addActiveEffect(operationButton);
            return;
        }
    }

    switch (e.key) {
        case "Enter":
        case "=":
            addActiveEffect(equalsButton);
            equalsButton.dispatchEvent(new Event("click"));
            break;
        case "Backspace":
            addActiveEffect(deleteButton);
            deleteButton.dispatchEvent(new Event("click"));
            break;
        case "Escape":
        case "Delete":
            addActiveEffect(allClearButton);
            allClearButton.dispatchEvent(new Event("click"));
            break;
    }
});
