const fName = document.querySelector('#fname');
const lName = document.querySelector('#lname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmpassword');
const submit = document.querySelector('#submit');
const passMessage = document.querySelector('#passmessage');

submit.addEventListener('click', (event) => {
  event.preventDefault();
  if (password.value === confirmPassword.value) {
    const data = {
      firstName: fName.value,
      lastName: lName.value,
      email: email.value,
      password: password.value,
    };
    request('/signup', 'POST', JSON.stringify(data))
      .then((res) => {
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    passMessage.textContent = 'password not match';
  }
});
