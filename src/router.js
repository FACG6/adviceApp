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
const handleAdvicePage = require('./handlers/handleAdvicePage');

const {
  handlePageNotFound,
  handleServerError,
} = require('./handlers/handlerError');

const router = (request, response) => {
  const endPoint = request.url;
  if (endPoint === '/') {
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
      }
    });
  } else if (endPoint === '/getInfo' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
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
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify({
          error: null,
          result: infoJwt,
        }));
      }
    });
  } else {
    handlePageNotFound(response);
  }
};
module.exports = router;
