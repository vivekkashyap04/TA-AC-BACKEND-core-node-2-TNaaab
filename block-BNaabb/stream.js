var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var strings = '';
  req.on('data', (chunk) => {
    strings = strings + chunk;
  });
  req.on('end', () => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(strings);
  });
}

server.listen(3456, () => {
  console.log('server is listen on 3456');
});
