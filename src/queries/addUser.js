const connection = require('../database/db_connection');

exports.insertUser = (firstName, lastName, username, email, password) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users (fName, lName, username, email, pass) VALUES ($1, $2, $3, $4, $5) returning *', [firstName, lastName, username, email, password], (err, res) => {
      if (err) {
        reject(err);              
      } else {
        resolve(res);
      }          
    });
  });
}
