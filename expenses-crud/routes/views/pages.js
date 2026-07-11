const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/pageController');

router.get('/', pageController.renderHome);
router.get('/create', pageController.renderCreateForm);

module.exports = router;