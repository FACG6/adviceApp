const bcrypt = require('bcrypt');
const {
  sign,
  verify,
} = require('jsonwebtoken');
require('env2')('./config.env');
const cookie = require('cookie');
const handleHomePage = require('./handlers/handelHomePage');
const handleStatic = require('./handlers/handleStatic');
const handleLogin = require('./handlers/handlerLogin');
const isUser = require('./queries/isUser');
const isEmail = require('./queries/isEmail');
const handleAdvicePage = require('./handlers/handleAdvicePage');
const { handleSignUpPage, handleSignUp } = require('./handlers/handleSignUP');
const { addUser } = require('./queries/addUser');

const {
  handlePageNotFound,
  handleServerError,
} = require('./handlers/handlerError');

const router = (request, response) => {
  const endPoint = request.url;
  if (endPoint === '/') {
    handleHomePage()
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
  } else if (endPoint.includes('/public/')) {
    handleStatic(endPoint)
      .then((res) => {
        response.writeHead(200, {
          'Content-Type': res.ext,
        });
        response.end(res.file);
      })
      .catch((error) => {
        if (error.code === 'ENOENT') {
          handlePageNotFound(response);
        } else {
          handleServerError(response);
        }
      });
  } else if (endPoint === '/login' && request.method === 'POST') {
    handleLogin(request)
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
  } else if (endPoint === '/advice' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
    handleAdvicePage(response)
      .then((file) => {
        response.writeHead(200, {
          'Content-Type': 'text/html',
        });
        response.end(file);
      })
      .catch((error) => {
        handleServerError(response);
      });
  } else if (endPoint === '/getInfo' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
    const {
      jwt,
    } = cookie.parse(request.headers.cookie);
    verify(jwt, process.env.SECRET, (error, infoJwt) => {
      if (error) {
        response.writeHead(401, 'text/html');
        response.end('<h2>token error !!!</h2>');
      } else {
        response.writeHead(200, 'application/json');
        response.end(JSON.stringify({
          error: null,
          result: infoJwt,
        }));
      }
    });
  } else if (endPoint.includes('/signUpPage') && request.method === 'GET') {
    handleSignUpPage(request, response)
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
  } else if (endPoint === '/signup' && request.method === 'POST') {
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
      handleSignUp(request)
        .then(isEmail).then((res) => {
          if (res.result) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(JSON.stringify({ result: '<h2>email is used!!!</h2>' }));
          } else {
            bcrypt.hash(res.data.password, 5, (err, hash) => {
              if (err) {
                console.log(err);
              } else {
                addUser(res.data.firstName, res.data.lastName, res.data.email, hash).then((res) => {
                  if (res) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(JSON.stringify({ result: 'ok' }));
                  }
                });
              }
            });
          }
        }).catch(e => console.log(e));
    }
  } else {
    handlePageNotFound(response);
  }
};

module.exports = router;
