const {
  sign,
  verify,
} = require('jsonwebtoken');
require('env2')('./config.env');
const isUser = require('./../queries/isUser');
const {
  handlePageNotFound,
  handleServerError,
} = require('./handlerError');

const handlerLog = (request) => {
  let allData = '';
  return new Promise((resolve, reject) => {
    request.on('data', (chunkData) => {
      allData += chunkData;
    });
    request.on('end', () => {
      resolve(JSON.parse(allData));
    }).on('error', (error) => {
      reject(error.message);
    });
  });
};
const handlerLogin = (request, response) => {
  handlerLog(request)
    .then(isUser)
    .then((res) => {
      if (res.error) {
        response.writeHead(200, {
          'Content-text': 'application/json',
        });
        response.end(JSON.stringify(res));
      }
      const payload = {
        userId: res.result.id,
        name: `${res.result.first_name} ${res.result.last_name}`,
        login: true,
      };
      const jwt = sign(payload, process.env.SECRET);
      response.writeHead(200, {
        'Content-text': 'application/json',
        'Set-cookie': [`jwt=${jwt};HttpOnly;Max-Age=9000`],
      });
      response.end(JSON.stringify(res));
    })
    .catch((error) => {
      handleServerError(response);
    });
}
module.exports = handlerLogin;
