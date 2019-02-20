const fs = require('fs');
const path = require('path');
const {
  handlePageNotFound,
  handleServerError,
} = require('./handlerError');

const Static = (endPoint) => {
  const extantion = path.extname(endPoint).substr(1);
  const filePath = endPoint.split('/');
  const pathFile = path.join(__dirname, '..', '..', ...filePath);
  const contantType = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    json: 'application/json',
  };
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, (error, file) => {
      if (error) {
        reject(error);
      } else {
        const ext = contantType[extantion];
        resolve({
          file,
          ext,
        });
      }
    });
  });
};
const handleStatic = (endPoint, response) => {
  Static(endPoint)
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
}

module.exports = handleStatic;
