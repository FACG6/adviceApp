const connection = require('../database/db_connection');

exports.insertUser = (firstName, lastName, email, password) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) returning *', [firstName, lastName, email, password], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }          
    });
  });
};
