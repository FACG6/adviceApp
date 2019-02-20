const submit = document.getElementById('submit');
const info = document.getElementById('info');
// for create element
const createElements = (tag, name, parent, className) => {
  const newElement = document.createElement(tag);
  newElement.classList.add(className);
  newElement.textContent = name;
  parent.appendChild(newElement);
  return newElement;
};
// for delete all child in specific div
const deleteChild = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
const render = (res) => {
  createElements('p', res.name, info, res.userId);
  console.log(res.userId);
};
request('/getInfo', 'GET', null)
  .then((res) => {
    render(res);
  })
  .catch((err) => {
    createElements('p', err, info, 'error');
  });
