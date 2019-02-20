const fs = require('fs');
const path = require('path');
const {
  sign,
  verify,
} = require('jsonwebtoken');
require('env2')('./config.env');
const cookie = require('cookie');

const handleAdvice = () => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'pages', 'advice.html');
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
const handleAdvicePage = (request, response) => {
  const {
    jwt,
  } = cookie.parse(request.headers.cookie);
  verify(jwt, process.env.SECRET, (error, infoJwt) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/html',
        'Set-Cookie': 'jwt=;HttpOnly;Max-Age=0',
      });
      response.end('<h2>Cookie error !!!</h2>');
    } else {
      handleAdvice(response)
        .then((file) => {
          response.writeHead(200, {
            'Content-Type': 'text/html',
          });
          response.end(file);
        })
        .catch((error) => {
          handleServerError(response);
        });
    }
  });
}
module.exports = handleAdvicePage;