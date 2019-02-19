const submit = document.querySelector('#submit');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
submit.addEventListener('click', (e) => {
  e.preventDefault();
  const value = JSON.stringify({
    emailVal: email.value,
    passwordVal: password.value,
  });
  request('/login', 'POST', value).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });

});
