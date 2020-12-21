var app = require('express')();
var http = require('http').Server(app);

const io = require("socket.io")(http)

const users = [];

io.on('connection', socket => {
    console.log('connected ', socket.id)
    socket.broadcast.emit('new-user',socket.id)
    
    // socket.on('disconnect', function () {
    //     console.log('A user disconnected');
    //  });
    socket.on('socket-connected', function(data) {
        console.log(data);
        users.push({
            socket_id: socket.id,
            username: data
        });
     });
     socket.on('clientEvent', function(data) {
        console.log(data);
     });
    socket.on('increment',(count)=>{
        console.log('increment socket',count)
        count++;
        console.log(count)
        // io.emit('updatecount',count)
        socket.broadcast.emit('updatecount',count)

    });
    socket.on('send-message',(count)=>{
        console.log('increment socket',count)
        console.log(users)
        console.log(socket.id)
        socket.broadcast.emit('recieve-message',count)
    });
})
app.get('/', function(req, res) {
    res.sendFile(__dirname +'/views/index.html');
 });
 http.listen(3000, function() {
    console.log('listening on *:3000');
 });