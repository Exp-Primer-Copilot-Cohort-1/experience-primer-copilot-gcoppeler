// Create web server
// Load comments from a file
// Save comments to a file
// Update comments in a file
// Delete comments from a file
// Send comments to a client
// Receive comments from a client

// Load modules
const http = require('http');
const fs = require('fs');
const url = require('url');

// Load comments from a file
const comments = require('./comments.json');

// Create web server
const server = http.createServer((req, res) => {
    // Get the request method
    const method = req.method;
    // Get the request URL
    const urlObject = url.parse(req.url, true);
    const pathname = urlObject.pathname;
    const query = urlObject.query;

    // Send comments to a client
    if (method === 'GET' && pathname === '/comments') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(comments));
    }

    // Receive comments from a client
    if (method === 'POST' && pathname === '/comments') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(body);
            comments.push(comment);
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(comment));
            });
        });
    }

    // Update comments in a file
    if (method === 'PUT' && pathname === '/comments') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(body);
            const index = comments.findIndex((element) => element.id === comment.id);
            comments[index] = comment;
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(comment));
            });
        });
    }

    // Delete comments from a file
    if (method === 'DELETE' && pathname === '/comments') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('