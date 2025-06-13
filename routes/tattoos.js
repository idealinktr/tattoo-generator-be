const express = require('express');
const router = express.Router();
const { getExploreTattoos, generateTattoo, getPredictionStatus, likeTattoo, unlikeTattoo } = require('../controllers/tattooController');

router.get('/explore', getExploreTattoos);
router.post('/generate', generateTattoo);
router.get('/status/:id', getPredictionStatus);

router.post(':id/like', likeTattoo); 
router.delete(':id/like', unlikeTattoo);


module.exports = router;