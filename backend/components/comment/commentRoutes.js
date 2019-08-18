var express = require('express');
var router = express.Router();

const Comment = require('./commentModel');
const commentController = require('./commentController');

const isAuthenticated = require(__base + 'middleware/isAuthenticated')

/* /comment route */
router.post('/', isAuthenticated, commentController.create);

router.get('/', commentController.get)

router.post(':id/update', isAuthenticated, commentController.update);

module.exports = router;
