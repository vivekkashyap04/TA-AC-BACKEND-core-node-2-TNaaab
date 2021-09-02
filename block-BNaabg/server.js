const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const userDir = path.join(__dirname, 'users/');
console.log(userDir);
const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let url1 = url.parse(req.url);
  let user = url1.query.username;
  console.log(user);
  var store = 'store';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if ((req.method === 'GET') & (url1.pathname === '/users')) {
      res.setHeader('Content-Type', 'application/json');
      fs.createReadStream(userDir + user + '.json').pipe(res);
    } else if ((req.method === 'POST') & (url1.pathname === '/users')) {
      var username = JSON.parse(store).username;
      console.log(username);
      fs.open(userDir + userName + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${userName} created successfully`);
          });
        });
      });
    } else if ((req.method === 'PUT') & (url1.pathname === '/users')) {
      fs.open(userDir + user + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);

            fs.close(fd, (err) => {
              if (err) return console.log(err);
              return res.end(`${user} is updated successfully`);
            });
          });
        });
      });
    } else if ((req.method === 'DELETE') & (url1.pathname === '/users')) {
      fs.unlink(userDir + user + '.json', (err) => {
        if (err) return console.log(err);
        return res.end(`${user} is deleted`);
      });
    } else {
      res.writeHead(404, { 'Contet-Type': 'text/plain' });
      res.end('page not found');
    }
  });
}

server.listen(5000, () => {
  console.log('server is listen on 5000');
});
