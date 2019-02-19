const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');

const sqlFilePath = path.join(__dirname, 'db_built.sql');
const sql = fs.readFileSync(sqlFilePath).toString();

const runDbBuild = () => new Promise((reslove, reject) => {
  dbConnection.query(sql, (err, res) => {
    if (err) reject(err);
    else reslove(res);
  });
});

module.exports = runDbBuild;
