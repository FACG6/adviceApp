const querystring = require('querystring');

const handlerLogin = (request) => {
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
module.exports = handlerLogin;
