const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();





socket.on('message', message => {
    displayMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const textField = e.target.elements.msg;

    //get message from the text field
    const message = textField.value;

    // send message to the server
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
    const password = params.get('password');

    return {
        username,
        password
    }
}