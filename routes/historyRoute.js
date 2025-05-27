const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.post('/history', historyController.createHistory);
router.get('/history', historyController.getAllHistories);
router.delete('/history/:id', historyController.deleteHistory);
router.patch('/history/:id', historyController.updateHistory);

module.exports = router;
