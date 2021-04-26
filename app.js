const path = require('path')
//app.js
const express = require('express');
const app = express();
const server = require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
let onlineUsers = {};
io.on("connection", (socket) => {
  // This file will be read on new socket connections
  require('./sockets/chat.js')(io, socket, onlineUsers);
})

const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: path.join(__dirname, '/views/'),
  extname: 'handlebars',
  defaultLayout: 'index'
}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})