const fName = document.querySelector('#fname');
const lName = document.querySelector('#lname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmpassword');
const submit = document.querySelector('#submit');
const passMessage = document.querySelector('#passmessage');

submit.addEventListener('click', (event) => {
  event.preventDefault();
  const firstName = fName.value.trim();
  const lastName = lName.value.trim();
  const emailValue = email.value.trim();
  if (!(firstName) || !(lastName) || !(emailValue) || !(password.value) || !(confirmPassword.value)) {
    passMessage.textContent = 'Please Fill All Field';
    return '';
  }
  if (!(/^[a-zA-Z]([a-zA-Z]||[0-9])+@([a-zA-Z]||[0-9])+\.[a-zA-Z]{2,4}$/.test(email.value))) {
    passMessage.textContent = 'Please Enter Valid Email';
    return '';
  }
  if (password.value === confirmPassword.value) {
    const data = {
      firstName,
      lastName,
      email: emailValue,
      password: password.value,
    };
    request('/signup', 'POST', JSON.stringify(data))
      .then((res) => {
        alert('sign up success');
        window.location.href = '/';
      })
      .catch((err) => {
        passMessage.textContent = err.message;
      });
  } else {
    passMessage.textContent = 'password not match';
  }
});
