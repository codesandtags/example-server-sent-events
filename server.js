const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

const getRandomIp = () => {
  const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256));
  return ip.join(".");
};

const getRandomLocation = () => {
  const locations = [
    "New York, USA",
    "London, UK",
    "Paris, France",
    "Tokyo, Japan",
    "Sydney, Australia",
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

const getRandomUsername = () => {
  const usernames = ["Alice", "Bob", "Charlie", "David", "Eve"];
  return usernames[Math.floor(Math.random() * usernames.length)];
};

// Home route. It shows the index.html page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// SSE endpoint
app.get("/events", (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send an initial event (optional)
  res.write("data: Server connection established\n\n");

  // Send a random user connected from a random place in the world
  // The data is sent every second and the client will receive it
  // The user data will include: username, location, ip.
  const intervalId = setInterval(() => {
    const username = getRandomUsername();
    const location = getRandomLocation();
    const ip = getRandomIp();

    res.write(`data: ${JSON.stringify({ username, location, ip })}\n\n`);
  }, 1000);

  // Clear interval on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}. Open http://localhost:${PORT} in your browser.`
  );
});
