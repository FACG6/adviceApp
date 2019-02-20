const bcrypt = require('bcrypt');
const cookie = require('cookie');
const handleHomePage = require('./handlers/handelHomePage');
const handleStatic = require('./handlers/handleStatic');
const handleLogin = require('./handlers/handlerLogin');
const handleAdvicePage = require('./handlers/handleAdvicePage');
const handleAddAdvice = require('./handlers/handleAddAdvice');
const handleDeleteAdvice = require('./handlers/handleDeleteAdvice');
const handleDisplayAdvices = require('./handlers/handleDisplayAdvice');
const handleGetInfo = require('./handlers/handleGetInfo');
const handleLogout = require('./handlers/handleLogout');
const handleAuth = require('./handlers/handleAuth');
const { handleSignUpPage, handleSignUp } = require('./handlers/handleSignUP');
const isEmail = require('./queries/isEmail');
const { addUser } = require('./queries/addUser');

const {
  handlePageNotFound,
  handleServerError,
} = require('./handlers/handlerError');

const router = (request, response) => {
  const endPoint = request.url;
  const allEndPoint = ['/', '/login', '/advice', '/getInfo', '/addAvice', '/displyAdvices', '/logout', '/deleteAdivce'];
  if (endPoint === '/') {
    handleHomePage(request, response);
  } else if (endPoint.includes('/public/')) {
    handleStatic(endPoint, response);
  } else if (endPoint === '/login' && request.method === 'POST') {
    handleLogin(request, response);
  } else if (endPoint === '/advice' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
    handleAdvicePage(request, response);
  } else if (endPoint === '/getInfo' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
    handleGetInfo(request, response);
  } else if (endPoint === '/addAvice' && request.method === 'POST' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
    handleAddAdvice(request, response);
  } else if (endPoint === '/displyAdvices' && request.method === 'GET' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
    handleDisplayAdvices(request, response);
  } else if (endPoint === '/logout' && request.method === 'GET' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
    handleLogout(response);
  } else if (endPoint === '/deleteAdivce' && request.method === 'POST' && request.headers.cookie && request.headers.cookie.includes('jwt')) {
    handleDeleteAdvice(request, response);
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
                addUser(res.data.firstName, res.data.lastName, res.data.email, hash)
                  .then((resAdd) => {
                    if (resAdd) {
                      response.writeHead(200, { 'Content-Type': 'text/html' });
                      response.end(JSON.stringify({ result: 'ok' }));
                    }
                  });
              }
            });
          }
        }).catch(e => console.log(e));
    }
  } else if (allEndPoint.indexOf(endPoint) !== -1) {
    handleAuth(response);
  } else {
    handlePageNotFound(response);
  }
};
module.exports = router;
