module.exports = (socket) => {
    const {id} = socket;

    socket.on('message-to-me', (msg) => {
        msg.type = 'me';
        socket.emit('message-to-me', msg);
    });

    socket.on('message-to-all', (msg) => {
        msg.type = 'all';
        socket.broadcast.emit('message-to-all', msg);
        socket.emit('message-to-all', msg);
    });

    const {roomName} = socket.handshake.query;
    socket.join(roomName);

    socket.on('message-to-room', (msg) => {
        msg.type = `room-book-id: ${roomName}`;
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
}