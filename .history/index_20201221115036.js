const io = require("socket.io")(8001)

const users = {};

io.on('connection', socket => {
    console.log('connected')
    socket.on('increment',(count)=>{
        count++;
        io.emit('updatecount',count)
    });
})
