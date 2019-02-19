const connection = require('../database/db_connection');

exports.insertUser = (firstName, lastName, username, email, password, callback) => {
  connection.query('INSERT INTO users (fName, lName, username, email, pass) VALUES ($1, $2, $3, $4, $5) returning *', [firstName, lastName, password, email, password], (err, res) => {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);              
      } else {
        resolve(res);
      }          
    });
  });
}
