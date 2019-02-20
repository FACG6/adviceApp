const fs = require('fs');
const path = require('path');
const queryString = require('querystring');

const handleSignUpPage = (request, response) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'pages', 'signup.html');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, file) => {
      if (error) {
        reject(error);
      } else {
        resolve(file);
      }
    });
  });
};

const handleSignUp = (request) => {
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
module.exports = { handleSignUpPage, handleSignUp };
