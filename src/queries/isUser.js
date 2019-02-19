const connection = require('../database/db_connection');

exports.isUser = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email=$1', [email], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
}
