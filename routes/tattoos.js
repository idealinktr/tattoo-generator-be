const express = require('express');
const router = express.Router();
const { getExploreTattoos, generateTattoo, getPredictionStatus } = require('../controllers/tattooController');

router.get('/explore', getExploreTattoos);
router.post('/generate', generateTattoo);
router.get('/status/:id', getPredictionStatus);


module.exports = router;