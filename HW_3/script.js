// Assignment Code
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('myRange');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generate = document.getElementById('generate');

const lowerStr = 'abcdefghijklmnopqrstuvwxyz';
const upperStr = lowerStr.toUpperCase();
const numberStr = '0123456789';
const specialStr = '~!@#$%^&*()_+=-{}[]:;<>?/.,'

document.getElementById('myRange').addEventListener('change', function(){
  console.log(this.value)
  document.getElementById('sliderVal').textContent = this.value
})

generate.addEventListener('click', () => {
 
  const length = lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
    
  resultEl.innerText = generatePassword(
    hasLower,  
    hasUpper, 
    hasNumber, 
    hasSymbol,
    length
  );
});

// generate password function
function generatePassword(lower,upper, number, symbol, length) {

let passwordPool = '';

if(lower){
  passwordPool += lowerStr;
}
if(upper){
  passwordPool += upperStr;
}
if(number){
  passwordPool += numberStr;
}
if(symbol){
  passwordPool += specialStr;
}
      
let generatedPassword = '';

  for(let i = 0; i< length; i++) {
   generatedPassword += passwordPool.charAt(Math.floor(Math.random()*passwordPool.length))
  }

  return generatedPassword
}

