const express = require('express');
const router = express.Router();
const resaleController = require('../controllers/resaleController');

router.post('/resale', resaleController.createResale);
router.get('/resale', resaleController.getAllResales);
router.delete('/resale/:id', resaleController.deleteResale);
router.patch('/resale/:id', resaleController.updateResale);

module.exports = router;
