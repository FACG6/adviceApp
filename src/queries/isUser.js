const bcrypt = require('bcrypt');
const connection = require('./../database/db_connection');

const isUser = incomeData => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM users WHERE email=$1', [incomeData.email], (err, res) => {
    if (err) {
      reject(err);
    } else if (!res.rows[0]) {
      resolve({
        error: 'Email is wrong if don\'t have email Please Sign Up',
      });
    } else {
      bcrypt.compare(incomeData.password, res.rows[0].password, (error, success) => {
        if (error) {
          reject(error);
        } else if (success) {
          resolve({
            error: null,
            result: res.rows[0],
          });
        } else {
          resolve({
            error: 'Password Error Please Enter Correct Password',
          });
        }
      });
    }
  });
});
module.exports = isUser;
