const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, './public')));

io.on('connection', (socket) => {
    console.log('New Connection...');

    socket.emit('message', 'Welcome to Chat!');

    socket.broadcast.emit('message', 'A new user joined...');


    socket.on('disconnect', () => {
        io.emit('message', 'User has left chat');
    });



});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Сервер запущен, порт: ${PORT}`));