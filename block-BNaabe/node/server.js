const http = require('http');
const path = require('path');
const qs = require('querystring');

const serverPath = __filename;
const appPath = __dirname + '/app.js';
const Relative = './index.html';
const indexPath = path.join(__dirname, 'index.html');
console.log(serverPath, appPath, Relative, indexPath);

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  const header = req.headers['content-type'];
  console.log(header);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (header === 'application/json') {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(store);
    } else if (header === 'application/x-www-form-urlencoded') {
      let data = qs.parse(store);
      res.end(data.captain);
    }
  });
}

server.listen(5500, () => {
  console.log('server is listen on 5500');
});

const server2 = http.createServer(handleRequest);

function handleRequest(req, res) {
  const header = req.headers['content-type'];
  console.log(header);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (header === 'application/json') {
      res.write(store);
      res.end();
    } else if (header === 'application/x-www-form-urlencoded') {
      let data = qs.parse(store);
      res.end(data);
    }
  });
}

server2.listen(9000, () => {
  console.log('server is listen on 9000');
});

const server3 = http.createServer(handleRequest);

function handleRequest(req, res) {
  const header = req.headers['content-type'];
  console.log(header);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (header === 'application/json') {
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2>${store.name}</h2> <h2>email:${store.email}`);
    } else if (header === 'application/x-www-form-urlencoded') {
      let data = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2>${data.email}</h2>`);
    }
  });
}

server3.listen(8000, () => {
  console.log('server is listen on 8000');
});
