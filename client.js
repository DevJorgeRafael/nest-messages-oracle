const io = require('socket.io-client');
const socket = io('ws://localhost:3000'); // Cambia al puerto que estés usando

socket.on('connect', () => {
    console.log('Connected to server');

    // Envía un mensaje al servidor
    socket.emit('msgToServer', 'Hello from client');
});

socket.on('msgToClient', (message) => {
    console.log('Message from server:', message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
