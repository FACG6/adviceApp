const fs = require('fs');
const path = require('path');
const {
  handlePageNotFound,
  handleServerError,
} = require('./handlerError');

const signUpPage = () => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'pages', 'signup.html');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, file) => {
      if (error) {
        reject(error);
      } else {
        resolve(file);
      }
    });
  });
};
const handleSignUpPage = (request, response) => {
  signUpPage()
    .then((res) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(res);
    }).catch((err) => {
      if (err.code === 'ENOENT') {
        handlePageNotFound(response);
      } else {
        handleServerError(response);
      }
    });

};

module.exports = handleSignUpPage;
