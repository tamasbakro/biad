const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

// Statikus fájlok kiszolgálása a 'public' mappából
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Felhasználó csatlakozott');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // minden kliensnek továbbítja
    });

    socket.on('disconnect', () => {
        console.log('Felhasználó lecsatlakozott');
    });
});

server.listen(3000, () => {
    console.log('Chat szerver fut a 3000-es porton');
}); 