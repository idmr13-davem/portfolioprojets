const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const mime = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2' };

http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  let filePath = path.join(dir, pathname === '/' ? '/index.html' : decodeURIComponent(pathname));
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(process.env.PORT || 3456, () => console.log(`Serving on http://localhost:${process.env.PORT || 3456}`));
