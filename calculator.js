let currentInput = '0';
let firstOperand = null;
let operator = null;
let resultDisplayed = false;
let record = null;


function appendNumber(number) {
	//alert(number)
    if (currentInput === '0' || resultDisplayed) {
		if(number === '00')
		{
			number = '0';
		}
        currentInput = number.toString();
        resultDisplayed = false;
    } else if(currentInput.length < 15){
        currentInput += number;
    }
	else
	{
		//alert(输入长度超过14位)
	}
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function calculate() {
    const secondOperand = parseFloat(currentInput);
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            if (secondOperand === 0) {
                alert('Error: Division by zero\n 错误：除数不能为0');
                clearDisplay();
                return null;
            }
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function clearDisplay() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    resultDisplayed = false;
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}



document.addEventListener('DOMContentLoaded', function () {
    updateDisplay();
});

// 监听键盘按键事件
document.addEventListener('keydown', function(event) {
    // 获取按下的键的字符
    const key = event.key;

    // 如果按下的是数字键（0-9）
    if (/^[0-9]$/.test(key)) {
        appendNumber(parseInt(key));
    }
    // 如果按下的是小数点键
    else if (key === '.') {
        appendDecimal();
    }
    // 如果按下的是运算符键（+、-、*、/）
    else if (/^[+\-*/]$/.test(key)) {
        setOperator(key);
    }
    // 如果按下的是回车键，则执行计算
    else if (key === 'Enter') {
        calculateResult();
    }
    // 如果按下的是退格键（Backspace）
    else if (key === 'Backspace') {
        backspace();
    }
});


function updateDisplay() {
    const display = document.getElementById('display');
    const resultDisplay = document.getElementById('result');
    const historyDisplay = document.getElementById('calculation-history');

	if(currentInput == ''){
		record = firstOperand;
	}
	else
	{
		resultDisplay.textContent = currentInput;
	}

    if (firstOperand !== null && operator !== null) {
        historyDisplay.textContent = `${firstOperand} ${operator} `;
    } else {
        historyDisplay.textContent = '';
    }
}

function calculateResult() {
    if (currentInput !== '' && firstOperand !== null && operator !== null) {
        const result = calculate();
        if (result !== null) {
            const calculationHistory = document.getElementById('calculation-history');
            const resultDisplay = document.getElementById('result');

            calculationHistory.textContent = `${firstOperand} ${operator} ${currentInput} =`;
			// 限制结果为最多 10 位数字
            const formattedResult = result.toString().slice(0, 17);
            resultDisplay.textContent = formattedResult;
            
            currentInput = formattedResult;
            firstOperand = result;
            operator = null;
            resultDisplayed = true;
        }
    }
}


function setOperator(newOperator) {
    if (currentInput !== '') {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            operator = newOperator;
            currentInput = '';
            updateDisplay(); // 更新显示以在第一行显示运算符
        } else {
            calculateResult();
            operator = newOperator;
            updateDisplay(); // 更新显示以在第一行显示新运算符
        }
    }
}