const {
  sign,
  verify,
} = require('jsonwebtoken');
require('env2')('./config.env');
const cookie = require('cookie');

const handleGetInfo = (request, response) => {
  const {
    jwt,
  } = cookie.parse(request.headers.cookie);
  verify(jwt, process.env.SECRET, (error, infoJwt) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/html',
        'Set-Cookie': 'jwt=;HttpOnly;Max-Age=0',
      });
      response.end('<h2>Cookie error !!!</h2>');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({
        error: null,
        result: infoJwt,
      }));
    }
  });
}
module.exports = handleGetInfo;
