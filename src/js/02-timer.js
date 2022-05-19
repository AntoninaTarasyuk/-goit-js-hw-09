import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateInput: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', startСountdownTimer);

let selectedDate = null;
let currentDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    resetСountdownTimer();
    clearInterval(timerId);

    selectedDate = selectedDates[0];
    currentDate = new Date();
    
    if (selectedDate <= currentDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.dateInput, options);

function startСountdownTimer() {
  timerId = setInterval(() => {
    currentDate = new Date();
    if (selectedDate <= currentDate) {
      clearInterval(timerId);
      return;
    }
    const remainingTime = selectedDate - currentDate;
    renderСountdownTimer(remainingTime);
  }, 1000);

  refs.startBtn.disabled = true;
};

function renderСountdownTimer(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
};

function resetСountdownTimer() {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};