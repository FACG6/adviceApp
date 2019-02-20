const connection = require('../database/db_connection');

const deleteAdvice = adviceId => new Promise((resolve, reject) => {
  connection.query('delete from advice where id=$1', [adviceId], (error, res) => {
    if (error) {
      reject(error);
    } else {
      resolve(true);
    }
  });
});
module.exports = deleteAdvice;
