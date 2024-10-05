const http = require('http');
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require("./src/routes/router");
const { setupWebSocketServer } = require('./src/socket/wsServer');
const { default: mongoose } = require('mongoose');
const {errorMiddleware} = require('./src/middlewares/errorHandler');
const authenticateToken = require('./src/middlewares/authToken');
const config = require('./src/config/config');
const setupTcpServer = require('./src/socket/tcpServer');

const app = express();
const server = http.createServer(app);
const port = config.API.PORT;
const host = config.API.HOST;
const corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 200
}

const mongoURI = config.MONGO.URI;

app.use(express.json());
app.use(cors(corsOptions));
setupWebSocketServer(server);
setupTcpServer(host, config.TCP_SERVER.PORT);
app.use(authenticateToken);
app.use(routes);
app.use(errorMiddleware);

const startServer = () => {
	server.listen(port, host, () => {
		console.log(`Server is running on ${host}:${port}`);
	});	  
}

mongoose.connect(mongoURI, {
}).then(() => {
	console.log('Successfully connected to MongoDB');
	startServer();
}).catch(err => {
	console.error('Failed to connect to MongoDB', err);
	process.exit(1);
});