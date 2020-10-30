const express = require('express');

const router = express.Router();

const items = require("./v1/routes")

router.use("/items", items);

module.exports = router;
