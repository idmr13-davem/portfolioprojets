const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const mime = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2', '.webp':'image/webp', '.mov':'video/quicktime', '.mp4':'video/mp4', '.vtt':'text/vtt', '.json':'application/json' };

http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  let filePath = path.join(dir, pathname === '/' ? '/index.html' : decodeURIComponent(pathname));
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(dir, '404.html'), (fallbackError, fallback) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fallbackError ? '<h1>Page not found</h1>' : fallback);
      });
      return;
    }
    const headers = { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream', 'Accept-Ranges': 'bytes' };
    const requestedRange = req.headers.range;
    if (requestedRange) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(requestedRange);
      let start, end;
      if (match && (match[1] || match[2])) {
        start = match[1] ? Number(match[1]) : Math.max(0, data.length - Number(match[2]));
        end = match[1] && match[2] ? Math.min(Number(match[2]), data.length - 1) : data.length - 1;
      }
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= data.length) {
        res.writeHead(416, { ...headers, 'Content-Range': `bytes */${data.length}` });
        res.end();
        return;
      }
      res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${data.length}`, 'Content-Length': end - start + 1 });
      res.end(req.method === 'HEAD' ? undefined : data.subarray(start, end + 1));
      return;
    }
    res.writeHead(200, { ...headers, 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}).listen(process.env.PORT || 3456, '127.0.0.1', () => console.log(`Serving on http://localhost:${process.env.PORT || 3456}`));
