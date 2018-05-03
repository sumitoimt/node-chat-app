const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io= socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
 console.log('New user Connected');

 // socket.emit from Admin text Welcome to the chat app
 socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
 // socket.broadcast.emit from Admin text new user joined.
 socket.broadcast.emit('newMessage',generateMessage('Admin','New User Jioned'));
 
 socket.on('createMessage',(message, callback)=>{
 	console.log('createMessage',message);
 	io.emit('newMessage',generateMessage(message.from,message.text));
 	callback('This is from the server.');
 	
 });

 socket.on('createLocationMessage',(coords)=>{
 	io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
 });

 socket.on('disconnect',()=>{
 console.log('user Disconnected');

 });

 socket.on('createEmail',(newEmail)=>{
 	console.log('createEmail',newEmail);
 });

});

server.listen(port,()=>{
	console.log(`Server is up on ${port}`);
});