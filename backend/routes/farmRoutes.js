const express = require('express');
const router = express.Router();
const farmController = require('../controllers/farmController');

router.get('/', farmController.getFarms);
router.post('/', farmController.createFarm);

module.exports = router;
