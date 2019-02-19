const fs = require('fs');
const path = require('path');

const handleStatic = (endPoint) => {
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

module.exports = handleStatic;
