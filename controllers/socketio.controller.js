var countConnectedUsers = 0;
module.exports = function (io) {
    io.on('connection', function (socket) {
        countConnectedUsers++;
        socket.on('connected', function () {
            console.log(`${socket.id} đã kết nối!`);
        });
        io.sockets.emit('count-connected-user', countConnectedUsers);
        socket.on('send', function (data) {
            io.sockets.emit('server-send', data);
        })
        socket.on('client-disconnect', function () {
            // io.sockets.emit('count-connected-user', countConnectedUsers--);
            countConnectedUsers--;
            socket.on('disconnect', function () {
                console.log(`${socket.id}: đã ngắt kết nối!`);
                io.sockets.emit('count-connected-user', countConnectedUsers);
            });
        })
        socket.on('disconnect', function () {
            countConnectedUsers--;
            console.log(`${socket.id}: đã ngắt kết nối!`);
            io.sockets.emit('count-connected-user', countConnectedUsers);

        });
    });

}
