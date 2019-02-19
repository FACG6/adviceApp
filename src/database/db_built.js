const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');

const sqlFilePath = path.join(__dirname, 'db_built.sql');
const sql = fs.readFileSync(sqlFilePath).toString();

const runDbBuild = (cb) => {
  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

module.exports = runDbBuild;