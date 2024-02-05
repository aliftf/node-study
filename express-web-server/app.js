const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html'); // __dirname is the current directory
    // res.json({ message: 'Hello World' }); // send JSON response
    res.sendFile('index.html', { root: __dirname }); // send file
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

// app.use('/', (req, res) => {
//     res.status(404).send('404 Not Found');
// });

app.get('/product/:id', (req, res) => { // example: /product/123
    // res.send(`Product ID: ${req.params.id}`);

    if(req.query.name) { // example: /product/123?name=shoes
        res.send(`Product ID: ${req.params.id}, Name: ${req.query.name}`);
    }
});

app.get('/product/:id/category/:category_id', (req, res) => { // example: /product/123/category/456
    res.send(`Product ID: ${req.params.id}, Category ID: ${req.params.category_id}`);
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// const fs = require('fs');
// const http = require('http');
// const port = 3000;

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404, { 'Content-Type': 'text/html' });
//             res.write('404 Not Found');
//         }
//         else {
//             // res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.write(data);
//         }
//         res.end();
//     });
// }

// http
//     .createServer((req, res) => {
//         res.writeHead(200, { 'Content-Type': 'text/html' }); // http header

//         const url = req.url;
//         if (url === '/about') {
//             renderHTML('./about.html', res);
//         } else if (url === '/contact') {
//             renderHTML('./contact.html', res);
//         } else {
//             renderHTML('./index.html', res);
//         }
//     })
//     .listen(port, () => {
//         console.log(`Server running on port ${port}`);
//     }); // the server object listens on port 3000