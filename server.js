const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));

//Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...');

    //Welcome new user
    socket.emit("welcomeMessage","welcome! lets discuss on global goals");

    //Broadcasts when a user connects
    socket.broadcast.emit('message','A user has joined the chat');


    //Runs when client disconnect
    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat');
    });

    //listen for chat message
    socket.on('chatMessage',msg => {
        console.log(msg);
    });

});



const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => { console.log(`Server is running on PORT ${PORT}`); });