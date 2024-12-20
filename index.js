const dqs = (element) => document.querySelector(element);
const dqsa = (element) => document.querySelectorAll(element);

const numbersButtons = dqsa(["data-number"]);
const operationButtons = dqsa(["data-operator"]);

const equalsButton = dqs(["data-equals"]);
const deleteButton = dqs(["data-delete"]);
const allClearButton = dqs(["data-all-clear"]);
const previousButton = dqs(["data-previous-operand"]);
const currentButton = dqs(["data-current-operand"]);
