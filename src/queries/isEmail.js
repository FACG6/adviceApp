const connection = require('./../database/db_connection');

const isEmail = incomeData => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM users WHERE email=$1', [incomeData.email], (err, res) => {
    if (err) {
      reject(err);
    } else if (res.rows[0]) {
      resolve({
        result: true,
      });
    } else {
      resolve({
        result: false,
        data: incomeData,
      });
    }
  });
});

module.exports = isEmail;
