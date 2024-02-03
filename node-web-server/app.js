const fs = require('fs');
const http = require('http');
const port = 3000;

const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('404 Not Found');
        }
        else {
            // res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
        }
        res.end();
    });
}

http
    .createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' }); // http header

        const url = req.url;
        if (url === '/about') {
            renderHTML('./about.html', res);
        } else if (url === '/contact') {
            renderHTML('./contact.html', res);
        } else {
            renderHTML('./index.html', res);
        }
    })
    .listen(port, () => {
        console.log(`Server running on port ${port}`);
    }); // the server object listens on port 3000