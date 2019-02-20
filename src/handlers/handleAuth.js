const handleAuth = (response) => {
  response.writeHead(302, {
    Location: '/',
  });
  response.end();
};
module.exports = handleAuth;
