const WebSocket = require('ws');
const crypto = require('crypto');

const connections = {};

const setupWebSocketServer = (server) => {
    const wsServer = new WebSocket.Server({ server: server });

    wsServer.on('connection', (connection, request) => {
        let uuid = crypto.randomUUID();
        connections[uuid] = connection;
        console.log(uuid);

        connection.on('message', (msg) => handleMessage(msg, uuid));
        connection.on('close', () => handleClose(uuid));
    });

    const handleMessage = (msg, uuid) => {
        try {
            const parsed = JSON.parse(msg);
            
            console.log(parsed)
        } catch (err) {
            console.error(`error: ${err}`);
        }
        console.log(`Received message from ${uuid}: ${msg}`);
    };

    const handleClose = (uuid) => {
        delete connections[uuid];
        console.log(`Connection ${uuid} closed`);
    };
};

module.exports = { setupWebSocketServer };
