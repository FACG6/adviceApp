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
const handleSignupPage = require('./handlers/handleSignupPage');
const handlerSignup = require('./handlers/handlerSignup');
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
    handleSignupPage(request, response);
  } else if (endPoint === '/signup' && request.method === 'POST') {
    handlerSignup(request, response);
  } else if (allEndPoint.indexOf(endPoint) !== -1) {
    handleAuth(response);
  } else {
    handlePageNotFound(response);
  }
};
module.exports = router;
