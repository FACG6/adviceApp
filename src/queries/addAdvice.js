const connection = require('../database/db_connection');

const addAdvice = (text, userId) => {
  return new Promise((resolve, reject) => {
    connection.query('insert into advice (content,user_id) values ($1,$2) returning *', [text, userId], (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res.rows);
      }
    });
  });
};
module.exports = addAdvice;
