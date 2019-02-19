const connection = require('../');

exports.insertUser = (firstName, lastName, username, email, password, callback) => {
  let sql = {
    text: 'INSERT INTO users (fName, lName, username, email, pass) VALUES ($1, $2, $3, $4, $5) returning *',
    VALUES = [firstName, lastName, password, email, password]
  };

  connection.query(sql, (err, res) => {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);              
      } else {
        resolve(res);
      }          
    });
  });
}
