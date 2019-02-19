const connection = require('../');

exports.insertUser = (firstName, lastName, username, email, password, callback) => {
  let sql = {
    text: 'INSERT INTO users (fName, lName, username, email, pass) VALUES ($1, $2, $3, $4, $5)',
    VALUES = [firstName, lastName, password, email, password]
  };

  connection.query(sql, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
}
