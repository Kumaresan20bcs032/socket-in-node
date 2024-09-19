// import express web application framework.
const express = require("express");

// initilize web application express framework with constant varable app.
const app = express();

// middleware to accept all incoming json data.
app.use(express.json());

// send home route to check if the server is working fine are not and ckecking global io is working or not.
app.get("/", (req, res) => {
    global.io.to("0001").emit("message", { data: "This is sample message event" });
    return res.json({ status: true, status_code: 200, message: "Application api working fine" });
})

// export app to server.js file to listen the port.
module.exports = app;