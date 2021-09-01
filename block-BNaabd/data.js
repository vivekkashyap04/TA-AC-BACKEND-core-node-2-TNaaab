const http = require('http');
const qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var parseHeader = req.headers['content-type'];
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    console.log(parseHeader);
    if (parseHeader === 'application/x-www-form-urlencoded') {
      let parsedata = qs.parse(store);
      res.end(JSON.stringify(parsedata));
    } else if (parseHeader === 'application/json') {
      res.end(store);
    }
  });
}

server.listen(7000, () => {
  console.log('server is listen on 7000');
});
