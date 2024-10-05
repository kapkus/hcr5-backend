const net = require('net');
const config = require('../config/config');

const setupTcpServer = (host, port) => {
    const tcpServer = net.createServer(socket => {
        console.log("test1");
    
        socket.on('data', data => {
            console.log('wchodzi data', data.toString());
        });
    });
    
    tcpServer.listen(port, host, () => {
        console.log(`Tcp server running on ${port}`)
    });
}


module.exports = setupTcpServer;