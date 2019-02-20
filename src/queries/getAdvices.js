const connection = require('../database/db_connection');

const modifyDelete = (res, id) => res.map((element) => {
  element.delete = element.user_id === id;
  return element;
});

const getAdvices = userId => new Promise((resolve, reject) => {
  connection.query('select * from advice', (error, res) => {
    if (error) {
      reject(error);
    } else {
      resolve(modifyDelete(res.rows, userId));
    }
  });
});
module.exports = getAdvices;
