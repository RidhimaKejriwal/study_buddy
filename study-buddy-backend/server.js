const app = require("./src/app");
const http = require("http");

const { Server } = require("socket.io");

const chatSocket = require("./src/sockets/chatSocket");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

chatSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});