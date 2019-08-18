var express = require('express');
var router = express.Router();

const Group = require('./groupModel');
const groupController = require('./groupController');

const isAuthenticated = require(__base + 'middleware/isAuthenticated')

/* /group route */
router.post('/', groupController.create);

router.get('/', groupController.get)

router.post(':id/update', groupController.update);

module.exports = router;
