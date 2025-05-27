const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.post('/history', historyController.createHistory);
router.get('/history', historyController.getAllHistories);
router.delete('/history/:idHistory', historyController.deleteHistory);
router.patch('/history/:idHistory', historyController.updateHistory);

module.exports = router;
