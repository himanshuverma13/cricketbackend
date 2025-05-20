const express = require("express");
const app = express();
const port = 5007; // Note: Updated to have a single port for the Express server
const axios = require("axios").default;
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Fetch cricket data
const fetchCkt = async () => {
  try {
    let response = await axios.get(
      "https://api.cricapi.com/v1/cricScore?apikey=509cc888-0d3c-4b5e-8e78-1466d3241826"
    );
    return response.data; // Return the data directly
  } catch (error) {
    console.log("Error fetching cricket data: ", error);
    return null; // Ensure to return null on error
  }
};

io.on("connection", async (socket) => {
  console.log("A user connected");

  // Fetch cricket data when a client connects
  let cricketData = await fetchCkt();

  if (cricketData) {
    socket.emit("skill", {
      back: cricketData, // Send the cricket data to the client
    });
  } else {
    socket.emit("skill", {
      back: "Error fetching cricket data.",
    });
  }

  socket.on("skill", (data) => {
    // You can handle incoming skill events from the client here
    console.log("Received skill data: ", data);
  });
});

app.get("/", async(req, res) => {
  // let cricketData = await fetchCkt();
  // console.log("Request received: ", req);
  res.send({ status: 700, message: "Server running" });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// WebSocketComponent would be on the front-end