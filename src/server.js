const app = require("./index");
const { Server } = require("socket.io")

const PORT = process.env?.PORT ?? 3000;

// start the port to listen the server.
const server = app.listen(PORT, () => {
    console.log(`Server started at host http://localhost:${PORT}`);
});

// configure the socket server according to your needs,
// in my case allowing all origins for GET and POST method only.
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});


// use socket middleware to configure.
io.use((socket, next) => {

    // use socket.handshake.query.id method to get the trying to connecting socket users id.
    const userId = socket.handshake.query.id;

    socket.userId = userId;
    socket.join(userId);

    if (socket.userId) {
        next();
    }
    else {
        const err = new Error('id is not defined')
        next(err);
    }
});


// listen the socket of connection event.
io.on("connection", (socket) => {

    console.log("socket connect user id:", socket.userId);

    // use io to send the connected user.
    io.to(socket.userId).emit("message", { data: "This is sample message event" });

});

// configure global socket io for emit purpose.
global.io = io;




