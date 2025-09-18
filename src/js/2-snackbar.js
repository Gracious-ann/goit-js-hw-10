// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formSubmit = document.querySelector('form');

const fooSubmit = function (event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const btn = event.target.elements.state.value;
  console.log(btn);

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (btn === 'fulfilled') {
        resolve({
          title: '!',
          message: `✅ Fulfilled promise in ${delay}ms`,
          color: 'green',
        });
      }
      reject({
        title: '!',
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red',
      });
    })
      .then(res => {
        iziToast.show(res);
      })
      .catch(err => {
        iziToast.show(err);
      });
  }, Number(delay));
};

formSubmit.addEventListener('submit', fooSubmit);
