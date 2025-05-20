const express = require('express');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();


router.route('/', verifyToken).get(getSells).post(createSell)



module.exports = router;