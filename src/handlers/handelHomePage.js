const fs = require('fs');
const path = require('path');
const {
  handlePageNotFound,
  handleServerError,
} = require('./handlerError');
const {
  sign,
  verify,
} = require('jsonwebtoken');
const cookie = require('cookie');

const homePage = () => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'index.html');
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
const handleHomePage = (request, response) => {
  if (request.headers.cookie && request.headers.cookie.includes('jwt')) {
    const {
      jwt,
    } = cookie.parse(request.headers.cookie);
    verify(jwt, process.env.SECRET, (error, infoJwt) => {
      if (error) {
        response.writeHead(401, {
          'Content-Type': 'text/html',
          'Set-Cookie': 'jwt=;HttpOnly;Max-Age=0',
        });
        response.end('<h2> Cookie error !!!</h2>');
      } else {
        response.writeHead(302, {
          Location: '/advice',
        });
        response.end();
      }
    });
  }
  homePage()
    .then((res) => {
      response.writeHead(200, {
        'Content-Type': 'text/html',
      });
      response.end(res);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        handlePageNotFound(response);
      } else {
        handleServerError(response);
      }
    });
}
module.exports = handleHomePage;
