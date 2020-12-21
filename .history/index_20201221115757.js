var app = require('express')();
var http = require('http').Server(app);

const io = require("socket.io")(http)

const users = {};

io.on('connection', socket => {
    console.log('connected ', socket.id)
    socket.on('increment',(count)=>{
        count++;
        io.emit('updatecount',count)
    });
})
app.get('/', function(req, res) {
    res.sendFile(__dirname +'/index.html');
 });
 http.listen(3000, function() {
    console.log('listening on *:3000');
 });