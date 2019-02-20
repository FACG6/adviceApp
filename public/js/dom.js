const submit = document.getElementById('submit');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginError = document.querySelector('.login--error');
submit.addEventListener('click', (e) => {
  e.preventDefault();
  const value = JSON.stringify({
    email: emailInput.value,
    password: passwordInput.value,
  });
  request('/login', 'POST', value)
    .then((result) => {
      window.location.href = '/advice';
    })
    .catch((error) => {
      loginError.textContent = error;
    });
});
