const express = require('express');
const socketIO = require('socket.io');
const http = require('http')
const port = process.env.PORT || 7007
var app = express();
let server = http.createServer(app);
var io = socketIO(server);

// NRAK-GKTGF74K9MAZKLIG2E889MU8BLO

// make connection with user from server side
io.on('connection',
    (socket) => {
        console.log('New user connected');
        //emit message from server to user
        socket.emit('newMessage',
            {
                from: 'jen@mds',
                text: 'hepppp',
                createdAt: 123
            });

        // listen for message from user
        socket.on('createMessage',
            (newMessage) => {
                console.log('newMessage', newMessage);
            });

        // when server disconnects from user
        socket.on('disconnect',
            () => {
                console.log('disconnected from user');
            });
    });

app.get("/",
    (req, res) => {
        res.send({ status:700,message:'run'});
    });

server.listen(port);