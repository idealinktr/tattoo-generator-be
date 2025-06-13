const express = require('express');
const router = express.Router();
const { getExploreTattoos } = require('../controllers/tattooController');

router.get('/explore', getExploreTattoos);

module.exports = router;