const express = require("express");
const { getPrice } = require("../controllers/priceController");
const router = express.Router();

router.get("/dynamic-price/:id", getPrice);

module.exports = router;
