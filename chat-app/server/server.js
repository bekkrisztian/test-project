const express = require("express");
const appConfig = require("./config/appConfig");
const router = require("./router/index");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

const port = appConfig.PORT || 8080;

const server = http.createServer(app);
const SocketServer = require("./socket/socket")
SocketServer(server);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});