const {signup, signin, getMe} = require("../../controllers/user.controller");
const verifyToken = require('../../middleware/verifyToken')

const express = require('express');
const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me',verifyToken,getMe )


module.exports = router;