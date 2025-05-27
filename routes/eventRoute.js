const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/events', eventController.createEvent);
router.get('/events', eventController.getAllEvents);
router.delete('/events/:idEvent', eventController.deleteEvents);
router.patch('/events/:idEvent', eventController.updateEvent);

module.exports = router;
