const submit = document.getElementById('submit');
const info = document.getElementById('info');
const text = document.getElementById('advice');
const result = document.querySelector('.result');
const message = document.querySelector('.message');

// for create element
const createElements = (tag, name, valueElement, parent, className) => {
  const newElement = document.createElement(tag);
  if (valueElement) newElement.value = valueElement;
  newElement.classList.add(className);
  newElement.textContent = name;
  parent.appendChild(newElement);
  return newElement;
};
const deleteAdvices = (adviceElement) => {
  adviceElement.addEventListener('click', () => {
    request('/deleteAdivce', 'POST', adviceElement.value)
      .then((res) => {
        result.removeChild(adviceElement.parentElement);
        message.innerHTML = '';
        createElements('p', 'Delete Advice', null, message, 'success');
      })
      .catch((error) => {
        createElements('p', error, null, info, 'error');
      });
  });
};
const render = (res) => {
  createElements('p', res.name, null, info, 'info--name');
};
request('/getInfo', 'GET', null)
  .then((res) => {
    render(res);
  })
  .catch((err) => {
    createElements('p', err, null, info, 'error');
  });

request('/displyAdvices', 'GET', null)
  .then((res) => {
    res.forEach((element) => {
      const adviceContainer = createElements('div', '', null, result, 'result--advice');
      createElements('p', element.content, null, adviceContainer, 'result--advice-text');
      if (element.delete) {
        const deleteAdvice = createElements('button', 'Delete', element.id, adviceContainer, 'result--advice-delete');
        deleteAdvices(deleteAdvice);
      }
    });
  })
  .catch((error) => {
    message.innerHTML = '';
    createElements('p', error, null, message, 'error');
  });
submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (!(text.value.trim())) {
    message.innerHTML = '';
    createElements('p', 'Add Your Advice', null, message, 'error');
    return '';
  }
  request('/addAvice', 'POST', text.value.trim()).then((res) => {
    message.innerHTML = '';
    const containerAdvice = createElements('div', '', null, result, 'result--advice');
    createElements('p', res[0].content, null, containerAdvice, 'result--advice-text');
    const deleteAdvice = createElements('button', 'Delete', res[0].id, containerAdvice, 'result--advice-delete');
    deleteAdvices(deleteAdvice);
  })
    .catch((error) => {
      message.innerHTML = '';
      createElements('p', error, null, message, 'error');
    });
  text.value = '';
});
