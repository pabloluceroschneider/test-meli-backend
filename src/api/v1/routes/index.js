var express = require('express');
var router = express.Router();
const ItemController = require("../controllers/ItemController.js")

router.get('/', ItemController.find)
router.get('/:id', ItemController.findOne)

module.exports = router;
