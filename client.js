const socket = io('https://ichatback.onrender.com');

const form = document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

const append=(message,position)=>{
const messageElement=document.createElement('div');
messageElement.classList.add('message');
messageElement.classList.add(position);
messageElement.innerText=message;
messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
e.preventDefault();
const message = messageInput.value;
append(`You: ${message}`,'right');
socket.emit('send',message);
messageInput.value=""
})

const name = prompt('Enter your Name to join');
console.log('i am sky')
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right' )
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',data=>{
  append(`${data.name}:${data.message}`,'left')  
})