const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./public/utils/messages')

const app = express();

const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));

const botName = "Room Monitor";

//Run when client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        //Welcome new user
        socket.emit("message", formatMessage(botName, 'Welcome to GlobalGoals Chat'));

        //Broadcasts when a user connects
        socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));
    });



    //listen for chat message
    socket.on('chatMessage', msg => {
        io.emit("message", formatMessage('USER', msg));
    });

    //Runs when client disconnect
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });

});



const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => { console.log(`Server is running on PORT ${PORT}`); });