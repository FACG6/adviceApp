const connection = require('./../database/db_connection');

const getUser = id => new Promise((resolve, reject) => {
  connection.query('select id,first_name,last_name from users where id=$1', [id], (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result.rows);
    }
  });
});
module.exports = getUser;
