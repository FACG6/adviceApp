const submit = document.getElementById('submit');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginError = document.querySelector('.login--error');
submit.addEventListener('click', (e) => {
  if (!(emailInput.value) || !(passwordInput.value)) {
    loginError.textContent = 'Please Fill All Field';
    return '';
  }
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
