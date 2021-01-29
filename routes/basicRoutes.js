const express = require('express')

const router = (express.Router());

const basicController = require('../controllers/basicController');

router.route('/').get(basicController.get_home)

router.route('/chart/:id').get(basicController.get_charts)

module.exports = router;