var app = require('express')();
var http = require('http').Server(app);

const io = require("socket.io")(http)

const users = [];

io.on('connection', socket => {
    console.log('connected ', socket.id)
    
    socket.on('disconnect', function () {
        var username ='';
        for(i in users){
            if(users[i].socket_id == socket.id){
                console.log('removed : ',users[i].username)
                username = users[i].username;
                users.splice(i, 1);
            }
        }
        io.emit('new-user',{
            action: 'removed',
            username: username,
            users: users
        })
        console.log(users)
     });
     socket.on('is-typing', function () {
        var username ='';
        for(i in users){
            if(users[i].socket_id == socket.id){
                username = users[i].username;
            }
        }
        socket.broadcast.emit('typing',{
            status: true,
            username: username
        })
     });
     socket.on('is-not-typing', function () {
        var username ='';
        for(i in users){
            if(users[i].socket_id == socket.id){
                username = users[i].username;
            }
        }
        socket.broadcast.emit('typing',{
            status: false,
            username: username
        })
     });
    socket.on('socket-connected', function(data) {
        console.log(data);
        users.push({
            socket_id: socket.id,
            username: data
        });
        io.emit('new-user',{
            action: 'added',
            username: data,
            users: users
        })
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
        console.log(socket.id)
        var name = '';
        for(data of users){
            if(data.socket_id == socket.id){
                name = data.username;
            }
        }
        socket.broadcast.emit('recieve-message',{message:count, name:name})
    });
})
app.get('/', function(req, res) {
    res.sendFile(__dirname +'/views/index.html');
 });
 http.listen(3000, function() {
    console.log('listening on *:3000');
 });