const {Pool} = require('pg');
const url = require('url');
require('env2')('./config.env');

let DB_URL = process.env.DB_LOCAL_URL;
if(process.env.NODE_ENV==='dev'){
    DB_URL = process.env.DB_LOCAL_URL;
}else if (process.env.NODE_ENV==='pro'){
    DB_URL = process.env.DATABASE_URL;
}

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

const option = {
  host: params.hostname,
  port: params.port,
  user: username,
  password,
  database: params.path.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  ssl: params.hostname !== 'localhost',
};

module.exports = new Pool(option);

