const router = require('express').Router();
const etsy = require('./etsy.route');

router.use('/etsy', etsy);

module.exports = router;