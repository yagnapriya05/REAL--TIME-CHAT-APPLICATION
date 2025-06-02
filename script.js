// Connect to the Socket.IO server
const socket = io();

// DOM elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (input.value.trim() !== '') {
        // Emit chat message to server
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Listen for incoming messages from server
socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

