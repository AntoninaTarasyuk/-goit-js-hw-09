import { Notify } from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
};

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        }, delay)
      });
    delay += step;
  };
};