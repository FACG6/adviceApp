const isEmail = require('./../queries/isEmail');
const { addUser } = require('./../queries/addUser');
const bcrypt = require('bcrypt');
const cookie = require('cookie');
const {
  handlePageNotFound,
  handleServerError,
} = require('./handlerError');

const SignUp = (request) => {
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
const handlerSignup = (request, response) => {
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
  } else {
    SignUp(request)
      .then(isEmail).then((res) => {
        if (res.result) {
          response.writeHead(200, {
            'Content-Type': 'text/html',
          });
          response.end(JSON.stringify({
            result: '<h2>email is used!!!</h2>',
          }));
        } else {
          bcrypt.hash(res.data.password, 5, (err, hash) => {
            if (err) {
              handleServerError(response);
            } else {
              addUser(res.data.firstName, res.data.lastName, res.data.email, hash)
                .then((resAdd) => {
                  if (resAdd) {
                    response.writeHead(200, {
                      'Content-Type': 'text/html',
                    });
                    response.end(JSON.stringify({
                      result: 'ok',
                    }));
                  }
                });
            }
          });
        }
      }).catch(e => handleServerError(response));
  }
};

module.exports = handlerSignup;
