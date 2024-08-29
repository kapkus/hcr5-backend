const http = require('http');
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require("./src/routes/router");
const { setupWebSocketServer } = require('./src/websocket/wsServer');
const { default: mongoose } = require('mongoose');
const {errorMiddleware} = require('./src/middlewares/errorHandler');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 200
}

const mongoURI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors(corsOptions));
setupWebSocketServer(server);
app.use(routes);
app.use(errorMiddleware);

const startServer = () => {
	server.listen(port, () => {
		console.log(`Server is running on port ${port}`);
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