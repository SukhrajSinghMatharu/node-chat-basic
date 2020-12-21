const { Socket } = require('socket.io');

var app = require('express')();
var http = require('http').Server(app);

const io = require("socket.io")(http)

const users = {};

io.on('connection', socket => {
    console.log('connected ', socket.id)
    // socket.on('disconnect', function () {
    //     console.log('A user disconnected');
    //  });
     socket.on('clientEvent', function(data) {
        console.log(data);
     });
    Socket.on('increment',(count)=>{
        console.log('increment socket',count)
        count++;
        console.log(count)
        io.broadcast.emit('updatecount',count)
    });
})
app.get('/', function(req, res) {
    res.sendFile(__dirname +'/views/index.html');
 });
 http.listen(3000, function() {
    console.log('listening on *:3000');
 });