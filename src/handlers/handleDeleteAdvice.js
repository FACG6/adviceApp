const {
  sign,
  verify,
} = require('jsonwebtoken');
require('env2')('./config.env');
const cookie = require('cookie');
const deleteAdvice = require('./../queries/deleteAdvice');
const {
  handlePageNotFound,
  handleServerError,
} = require('./handlerError');


const handleDeleteAdvice = (request, response) => {
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
      let allData = '';
      request.on('data', (chunkData) => {
        allData += chunkData;
      });
      request.on('end', () => {
        deleteAdvice(allData).then((res) => {
          response.writeHead(200, {
            'Content-Type': 'application/json',
          });
          response.end(JSON.stringify({
            error: null,
            result: 'Delete advice done',
          }));
        }).catch((error) => {
          handleServerError(response);
        });
      }).on('error', (err) => {
        handleServerError(response);
      });
    }
  });
};
module.exports = handleDeleteAdvice;
