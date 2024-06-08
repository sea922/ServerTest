// third party components
const io = require('socket.io');

module.exports = function(server) {
  const socketIO = io(server);
  socketIO.on('connection', (client) => {
    console.log('[SocketIO] connected');
    client.on('das.lm.inventory', (data) => {
      console.log('[SocketIO] receive: %s', data);
      socketIO.sockets.emit('das.lm.inventory', data);
      console.log('[SocketIO] response: %s', data);
    });
  });
  server.listen(3000);
};
