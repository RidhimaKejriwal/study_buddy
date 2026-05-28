const chatSocket = (io) => {

    io.on("connection", (socket) => {

        console.log("User connected:", socket.id);

        // Receive message
        socket.on("send_message", (data) => {

            console.log(data);

            // Send to all clients
            io.emit("receive_message", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = chatSocket;