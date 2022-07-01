const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');

const socket = io();



socket.emit('joinRoom',getUsernameAndRoom());

socket.on('message', message => {
    displayMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('roomUsers',({room,users})=>{
    displayRoomName(room);
    displayUsers(users);
});


chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
   const textField = e.target.elements.msg;
    const message = textField.value;
    socket.emit('chatMessage', message);
    textField.value = '';
});

function displayMessage(message) {
    const element = document.createElement('div');
    element.classList.add('message');
    element.innerHTML = `
            <p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
                ${message.text}
            </p>
    `;
    document.querySelector('.chat-messages').append(element);

}

function getUsernameAndRoom(key) {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const username = params.get('username');
    const room = params.get('room');

    return {
        username,
        room
    }
}

function displayRoomName(room){
    roomName.innerText=room;
}

function displayUsers(users){
    userList.innerHTML=`
        ${users.map((user) => `<li>${user.username}</li>`).join('')}
    `;
}