const chatForm = document.getElementById('chat-form');


const socket = io();

socket.on('welcomeMessage', message => {
    console.log(message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get message from the text field
    const message = e.target.elements.msg.value;

    // send message to the server
    socket.emit('chatMessage', message);

});

