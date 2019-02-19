const handleHomePage = require('./handlers/handelHomePage');
const handleStatic = require('./handlers/handleStatic');
const {
  handlePageNotFound,
  handleServerError,
} = require('./handlers/handlerError');

const router = (request, response) => {
  const endPoint = request.url;
  if (endPoint === '/') {
    handleHomePage().then((res) => {
      response.writeHead(200, {
        'Content-Type': 'text/html',
      });
      response.end(res);
    }).catch((err) => {
      if (err.code === 'ENOENT') {
        handlePageNotFound(response);
      } else {
        handleServerError(response);
      }
    });
  } else if (endPoint.includes('/public/')) {
    handleStatic(endPoint).then((res) => {
      response.writeHead(200, {
        'Content-Type': res.ext,
      });
      response.end(res.file);
    }).catch((error) => {
      if (error.code === 'ENOENT') {
        handlePageNotFound(response);
      } else {
        handleServerError(response);
      }
    });
  }
};
module.exports = router;
