const io = require("socket.io")(8001)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id[]
    })
})
