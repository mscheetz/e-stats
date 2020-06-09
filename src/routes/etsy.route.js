const express = require('express');
const router = express.Router();

router.use(async(req, res, next) =>{
    console.log('etsy router called');
    next();
});

module.exports = router;