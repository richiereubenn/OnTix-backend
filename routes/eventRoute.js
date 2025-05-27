const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/events', eventController.createEvent);
router.get('/events', eventController.getAllEvents);
router.delete('/events/:id', eventController.deleteEvents);
router.patch('/events/:id', eventController.updateEvent);

module.exports = router;
