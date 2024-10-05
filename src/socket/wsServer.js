const WebSocket = require('ws');
const crypto = require('crypto');
const { authenticateSocket } = require('../utils/utils');

const connections = {};

const setupWebSocketServer = (server) => {
    const wsServer = new WebSocket.Server({ noServer: true });

    /** JSON webtoken authentication by socket */
    server.on('upgrade', (request, socket, head) => {
        // const isAuthenticated = authenticateSocket(request);
        // if(!isAuthenticated){
        //     socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        //     socket.destroy();
        //     return;
        // }

        wsServer.handleUpgrade(request, socket, head, connection => {
            wsServer.emit('connection', connection, request);
        })
    })


    wsServer.on('connection', (connection, request) => {
        let uuid = crypto.randomUUID();
        connections[uuid] = connection;


        connection.on('message', (msg) =>{ 
            const parsedMessage = JSON.parse(msg);
            if(parsedMessage.forward){
                /** forwards message to robot client */
                forwardMessage(msg, connection);
            } else {
                handleMessage(parsedMessage, uuid, connection);
            }
        });
        connection.on('close', () => handleClose(uuid));

        // const tcpClient = new net.Socket();
        // tcpClient.connect();

    });

    const handleMessage = (msg, uuid, connection) => {
        try {

            console.log("test")
            const response = {
                type: 'response',
                message: `test: ${msg.content || ''}`
            };

            connection.send(JSON.stringify(response));

        } catch (err) {
            console.error(`error: ${err}`);
        }
    };

    const forwardMessage = (msg, connection) => {
        //TODO: forward na client robota
    }

    const handleClose = (uuid) => {
        delete connections[uuid];
        console.log(`Connection ${uuid} closed`);
    };
};

module.exports = { setupWebSocketServer };
