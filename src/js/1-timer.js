// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('.btn');
const dateMinSec = [...document.querySelectorAll('.value')];
const input = document.getElementById('datetime-picker');

let userSelectedDate, userTime, nowTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    userTime = userSelectedDate.getTime();
    nowTime = Date.now();

    if (userTime < nowTime) {
      iziToast.show({
        title: '!',
        message: 'Please choose a date in the future',
        color: 'red',
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const timerStart = function () {
  btn.disabled = true;
  input.disabled = true;
  const interID = setInterval(() => {
    const resultTime = userTime - Date.now();
    const convertTime = convertMs(resultTime);
    for (const [text, num] of Object.entries(convertTime)) {
      dateMinSec.find(el => el.hasAttribute(`data-${text}`)).textContent =
        addLeadingZero(num);
    }
    if (Object.values(convertTime).every(value => Number(value) === 0)) {
      clearInterval(interID);
      input.disabled = false;
    }
  }, 1000);
};
btn.addEventListener('click', timerStart);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr('#datetime-picker', options);
