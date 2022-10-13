const result = document.querySelector('.result__text');
let calcTotal = 0;
let prevOperator = null;
let buffer = '';

document.querySelector('.buttons').addEventListener('click', (e) => {
  handleClick(e.target.innerText);
});


function handleClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  
  const output = buffer || '0';
  result.innerHTML = numberWithSpaces(output);
  handleResultFontSize(buffer);
}

function handleSymbol(symbol) {
  switch(symbol) {
    case '.':
      handleFloat();    
      break;
    case 'C':
      handleClear();
      break;
    case '=':
      handleResult();
      break;
    case '±':
      handleInvert();
      break;
    case '+':
    case '-':
    case '÷':
    case '×':
      handleMath(symbol);
    break;
  }
}

function handleFloat() {
  if (buffer.includes('.'))
    return;
    
  buffer += (!buffer ? '0.' : '.');
}

function handleClear() {
  buffer = '';
  calcTotal = 0;
  prevOperator = null;
}

function handleInvert() {
  if (!buffer)
    return;
  buffer = -Number(buffer);
}

function handleResult() {
  if (!prevOperator) {
    return;
  }
  makeCalculation();
  buffer = String(calcTotal);
  calcTotal = 0;
  prevOperator = null;
}

function handleMath(symbol) {
  if (calcTotal === 0) {
    calcTotal = Number(buffer);
  } else {
    makeCalculation();
  }
    
  buffer = '';
  prevOperator = symbol;
}

function makeCalculation() {
  const intBuffer = Number(buffer);
  if (prevOperator === '+') {
    calcTotal += intBuffer;
  } else if (prevOperator === '-') {
    calcTotal -= intBuffer;
  } else if (prevOperator === '÷') {
    calcTotal /= intBuffer;
  } else if (prevOperator === '×') {
    calcTotal *= intBuffer;
  }
}

function handleNumber(number) {
  buffer += number;
}

function handleResultFontSize(text) {
  
  if(text.length > 9) {
    text = 'N - too big';
    result.innerHTML = text;
  }
  
  changeFontSize(text);
}

function showMessageIfOutputBig() {

}

function changeFontSize(text) {
  const fontSize = parseInt(
    getComputedStyle(document.body).getPropertyValue('--font-size')
  );

  const newSize = fontSize * ((9 - text.length) / 9);
  result.parentNode.style['font-size'] = Math.max(
    Math.min(newSize, fontSize), 
    37) + 'px';
}

function numberWithSpaces(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}