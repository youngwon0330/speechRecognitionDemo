// express 없이 http 모듈만 사용하는 예시
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // 메인 페이지 main.html 반환
    fs.readFile(path.join(__dirname, 'main.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Server Error');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } 
  // ---------------------------
  // /script/script.js 요청 처리
  // ---------------------------
  else if (req.url === '/script/script.js') {
    fs.readFile(path.join(__dirname, 'script', 'script.js'), (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Not Found');
      }
      // 자바스크립트 MIME 타입 설정
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(data);
    });
  } 
  // 그 외 경로는 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
