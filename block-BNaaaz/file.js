const fs = require('fs');
const http = require('http');

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(5000, () => {
  console.log('server is listen on 5000');
});
