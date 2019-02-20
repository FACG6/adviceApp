const fs = require('fs');
const path = require('path');

const handleHomePage = () => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'pages', 'advice.html');
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
module.exports = handleHomePage;
