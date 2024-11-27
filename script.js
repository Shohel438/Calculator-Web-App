let calculation = JSON.parse(localStorage.getItem('calculation')) || '';

display();

document.querySelectorAll('.btn')
  .forEach((buttons) => {
    buttons.addEventListener('click', () => {
      let buttonText = buttons.textContent.trim();

      if (buttonText.charCodeAt(0) === 247) {
        buttonText = ' / ';
      } else if (buttonText.charCodeAt(0) === 8727) {
        buttonText = ' * ';
      } else if (buttonText.charCodeAt(0) === 8722) {
        buttonText = ' - '
      } else if (buttonText === 'CLEAR') {
        calculation = '';
        localStorage.removeItem('calculation');
        display();
        return;
      } else if (buttonText === 'DELETE') {
        calculation = calculation.slice(0, calculation.length - 1);
        display();
        return;
      }

      const lastChar = calculation[calculation.length - 1];
      const operators = ['+', '-', '*', '/'];

      if (operators.includes(lastChar) && operators.includes(buttonText)) {
        return;
      }

      calculation += buttonText;
      display();
    });
  });

document.querySelector('.js-btn-equal')
  .addEventListener('click', () => {
    calculation = eval(calculation);
    calculation = String(calculation);
    display();
  });

function display() {
  localStorage.setItem('calculation', JSON.stringify(calculation));
  document.querySelector('.js-current-screen')
    .innerHTML = calculation;
}