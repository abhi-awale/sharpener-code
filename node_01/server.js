const http = require('http');

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    if(req.url == '/') {
        res.statusCode = 200;
        res.end('<h1>Hello World</h1>')
    } else {
        if(req.url == '/home') {
            res.statusCode = 200;
            res.end('<h1>Welcome  Home </h1>')
        } else if(req.url == '/about') {
            res.statusCode = 200;
            res.end('<h1>Welcome AboutUs </h1>')
        } else if(req.url == '/node') {
            res.statusCode = 200;
            res.end('<h1>Welcome Node </h1>')
        } else {
            res.statusCode = 403;
            res.end('<h1>Page Not Found</h1>')
        }
    }

})

server.listen(3000, () => {
    console.log('server running on port 3000');
})