'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;
    if (params.text) {
      res.writeHead(200, { 'Content-Type': 'text/plain'} );
      res.write(cowsay.say( { text: params.text }));
      res.end();
      return;
    }
    if (!params.text) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write(cowsay.say( { text: 'bad request' }));
      res.end();
    }
  }

  // doesn't need a pathname, the default path is "/"
  if(req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello from my server!');
    res.end();
    return;
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function() {
      if (req.body.message) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(cowsay.say( { text: req.body.message }));
        res.end();
        return;
      }
      if (!req.body.message) {
        res.writeHead(400, { 'Content-Type': 'text.plain' });
        res.write(cowsay.say( { text: 'bad request' }));
        res.end();        
      }
    });
  }
});


server.listen(PORT, () => {
  console.log(`Server up on PORT ${PORT}`);
});


