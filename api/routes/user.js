const express = require('express');
// const mongoose=require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');


const {postSignupData,postLoginData}=require("../controller/user");

router.post("/signup",postSignupData);
router.post("/login",postLoginData);

module.exports = router;
