const express = require('express');

const router = express.Router();

router.use('/person', require('./router/person'))

router.use('/products', require('./router/person'))

module.exports = router
