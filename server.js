const fs = require ('fs');
const http = require ('http');
const path = require ('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer ((req, res) => {
  console.log (req.url);

  let filePath = path.join ('./www', req.url);
  if (req.url == '/') {
    filePath = './www/index.html';
  }
  const extname = path.extname (filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.pdf':
      contentType = 'application/force-download';
    case '.json':
      contentType = 'application/json';
      break;
    case '.PNG':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;

    case '.txt':
      contentType = 'text/plain';
      break;

    case '.ico':
      contentType = 'image/x-icon';
      break;
  }
  fs.readFile (filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile ('./www/404.html', function (error, content) {
          res.writeHead (200, {'Content-Type': contentType});
          res.end (content, 'utf-8');
        });
      } else {
        res.writeHead (500);
        res.end (
          error.code
        );
        res.end ();
      }
    } else {
      console.log ('sending response');
      res.writeHead (200, {'Content-Type': contentType});
      res.end (content, 'utf-8');
    }
  });
});

server.listen (port, hostname, () => {
  console.log (`Server running at http://${hostname}:${port}/`);
});
