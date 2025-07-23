const express = require('express');
const router = express.Router();
const db = require('./db');

// GET all rooms
router.get('/', (req, res) => {
  db.query('SELECT * FROM rooms', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET a single room by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM rooms WHERE room_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Room not found' });
    res.json(results[0]);
  });
});

// POST add a new room
router.post('/', (req, res) => {
  const { room_number, room_type, price_per_night, status } = req.body;
  db.query(
    'INSERT INTO rooms (room_number, room_type, price_per_night, status) VALUES (?, ?, ?, ?)',
    [room_number, room_type, price_per_night, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Room added successfully', roomId: result.insertId });
    }
  );
});

// PUT update a room
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { room_number, room_type, price_per_night, status } = req.body;
  db.query(
    'UPDATE rooms SET room_number=?, room_type=?, price_per_night=?, status=? WHERE room_id=?',
    [room_number, room_type, price_per_night, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Room updated successfully' });
    }
  );
});

// DELETE a room
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM rooms WHERE room_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Room deleted successfully' });
  });
});

module.exports = router;
