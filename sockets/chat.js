//chat.js
module.exports = (io, socket, onlineUsers) => {

  socket.on('new user', (username) => {
    //Save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    //Save the username to socket as well. This is important for later.
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
  })

  socket.on('new message', (data) => {
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
    io.emit('new message', data);
  })

  socket.on('get online users', () => {
    //Send over the onlineUsers
    socket.emit('get online users', onlineUsers);
  })

  socket.on('disconnect', () => {
    //This deletes the user by using the username we saved to the socket
    delete onlineUsers[socket.username]
    io.emit('user has left', onlineUsers);
  });

  socket.on('new channel', (newChannel) => {
    console.log(newChannel);
  })

}