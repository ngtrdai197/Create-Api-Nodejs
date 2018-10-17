module.exports = function (io) {
    let users = [];
    let connectCount = 0;
    io.on('connection', function (socket) {
        console.log('Đã có người vừa kết nối');
        connectCount++;
        socket.on('connected', function (username) {
            users.push(username);
            io.sockets.emit('server-send-list-user', users);
            io.sockets.emit('count-connected-user', connectCount);
        });

        io.sockets.emit('count-connected-user', connectCount);
        socket.on('send', function (data) {
            io.sockets.emit('server-send', data);
        })

        socket.on('disconnect', function (oneUsers) {
            connectCount--;
            users.splice(users.indexOf(oneUsers), 1);
            io.sockets.emit('count-connected-user', connectCount);
            io.sockets.emit('server-send-list-user', users)
            console.log('Có người vừa ngắt kết nối');
        });
    });

}
