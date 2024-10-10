let express = require("express");
let http = require("http");
let socketIO = require("socket.io");

let app = express();
let server = http.createServer(app); // Wrap Express server

let io = socketIO(server);  // Initialize socket.io with the server

let cuisineController = require("./controllers/cuisinesController");

let port = process.env.port || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/indexMongo.html");
});

app.use("/api", cuisineController);

let userCount = 0;
// Handle socket connections
io.on("connection", (socket) => {
  userCount++;
  console.log("New client connected, total users:", userCount);

  socket.on("disconnect", () => {
    userCount--;
    console.log("Client disconnected, total users:", userCount);
  });

  setInterval(() => {
    socket.emit("number", userCount);
  }, 1000);
});

server.listen(port, () => {
  console.log("express server started");
  console.log("Server is running on port " + port);
});
