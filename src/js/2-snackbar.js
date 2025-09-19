// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formSubmit = document.querySelector('.form');

const fooSubmit = function (event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const btn = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (btn === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, Number(delay));
  })
    .then(delay => {
      iziToast.show({
        title: '✔',
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: 'green',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '✘',
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red',
      });
    });
};

formSubmit.addEventListener('submit', fooSubmit);
