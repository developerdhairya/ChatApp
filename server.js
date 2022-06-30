const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin,getCurrentUser,getroomUsers,userLeave}=require('./utils/users');



const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = "Room Monitor";


io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        const user=userJoin(socket.id,username,room);
        socket.join(room);
        socket.emit("message", formatMessage(botName, 'Welcome to GlobalGoals Chat'));
        socket.broadcast.to(room).emit('message', formatMessage(botName, `${username} has joined the room`));
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getroomUsers(user.room)
        })
    });

    socket.on('chatMessage', (msg) => {
        const user=getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    socket.on('disconnect', () => {
        const user=userLeave(socket.id);
        if(user){
            io.emit('message', formatMessage(botName, `${user.username} has left the chat`));
            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getroomUsers(user.room)
            })
        }
    });

});



const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => { console.log(`Server is running on PORT ${PORT}`); });