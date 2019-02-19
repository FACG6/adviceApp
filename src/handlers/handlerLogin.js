const handlerLogin = (request) => {
  let allData = '';
  return new Promise((resolve, reject) => {
    request.on('data', (chunkData) => {
      allData += chunkData;
    });
    request.on('end', () => {
      resolve(allData);
    }).on('error', (error) => {
      reject(error.message);
    });
  });
};
module.exports = handlerLogin;
