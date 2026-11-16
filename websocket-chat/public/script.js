const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const username = document.getElementById("username");

form.addEventListener("submit", function(e) {
e.preventDefault();


const message = input.value.trim();
const name = username.value.trim();

if (message && name) {
    socket.emit("chat message", {
        username: name,
        message: message
    });

    input.value = "";
}


});

socket.on("chat message", function(data) {
const item = document.createElement("p");


item.textContent = data.username + ": " + data.message;

messages.appendChild(item);

messages.scrollTop = messages.scrollHeight;


});
