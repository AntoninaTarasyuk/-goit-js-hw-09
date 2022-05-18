const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onColorSwitcher);
stopBtn.addEventListener('click', offColorSwitcher);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
};

let timerId = null;

function onColorSwitcher() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(changeBodyColor, 1000);
};

function offColorSwitcher() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
};