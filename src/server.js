const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'Localhost';

server.listen(port, () => {
  console.log(`the server running on ${host} : ${port}`);
});
