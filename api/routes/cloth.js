const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Cloth = require('../model/cloth');
const checkAuth = require('../middleware/check-auth');

const { getCloth, getClothById, postCloth, deleteClothById, updateClothById } = require('../controller/cloth');
router.get("/get", getCloth);
router.get("/getId/:id", checkAuth, getClothById);
router.post("/post", checkAuth, postCloth);
router.delete("/delete/:id", checkAuth, deleteClothById);
router.put("/update/:id", checkAuth, updateClothById);

module.exports = router;