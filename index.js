const http = require('http');
const express = require('express');
const roomsRouter = require('./src/rooms');

const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// Simple route for testing
app.get('/', (req, res) => {
  res.send('✅ Web Server & REST API Running!');
});

// REST API routes
app.use('/api/rooms', roomsRouter);

// Create HTTP server (for demo purpose)
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
