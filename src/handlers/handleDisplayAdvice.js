const {
  sign,
  verify,
} = require('jsonwebtoken');
require('env2')('./config.env');
const cookie = require('cookie');
const displayAdvices = require('./../queries/getAdvices');
const {
  handlePageNotFound,
  handleServerError,
} = require('./handlerError');

const handleDisplayAdvice = (request, response) => {
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
      displayAdvices(infoJwt.userId)
        .then((res) => {
          response.writeHead(200, {
            'Content-type': 'application/json',
          });
          response.end(JSON.stringify({
            error: null,
            result: res,
          }));
        })
        .catch(() => {
          handleServerError(response);
        });
    }
  });
};
module.exports = handleDisplayAdvice;
