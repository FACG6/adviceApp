const handleLogout = (response) => {
  response.writeHead(302, {
    Location: '/',
    'Set-Cookie': 'jwt=;HttpOnly;Max-Age=0',
  });
  response.end();
};
module.exports = handleLogout;
