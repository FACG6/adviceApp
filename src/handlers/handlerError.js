const handlePageNotFound = (response) => {
  response.writeHead(404, {
    'Content-Type': 'text/html',
  });
  response.end('<h2> Page Not Found </h2>');
};

const handleServerError = (response) => {
  response.writeHead(500, {
    'Content-Type': 'text/html',
  });
  response.end('<h2> server error </h2>');
};
module.exports = {
  handlePageNotFound,
  handleServerError,
};
