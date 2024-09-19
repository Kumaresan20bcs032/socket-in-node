// Import web application framework.
const express = require("express");

// Initilize web application express framework with constant varable app.
const app = express();

// Middleware to all incoming json data.
app.use(express.json());

// Send home route to check if the server is working fine.
app.get("/", (req, res) => {
    global.io.to("0001").emit("message", { data: "This is sample message event" });
    return res.json({ status: true, status_code: 200, message: "Application api working fine" });
})

// Export app to server.js file to listen the port.
module.exports = app;