const fs = require('fs');
const http = require('http');
const qs = require('querystring');

const server = http.createServer(handleRequest);
function handleRequest(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if ((req.method === 'GET') & (req.url == '/form')) {
      fs.createReadStream('./index.html').pipe(res);
    } else if ((req.method === 'POST') & (req.url === '/form')) {
      let formData = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(
        `<h2>Name: ${formData.name}</h2> <h3>Email: ${formData.email}</h3> <p>Age: ${formData.age}</p>`
      );
    }
  });
}

server.listen(5000, () => {
  console.log('server is listen on 5000');
});
