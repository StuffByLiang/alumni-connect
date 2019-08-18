var express = require('express');
var router = express.Router();

const Group = require('./postModel');
const postController = require('./postController');

const isAuthenticated = require(__base + 'middleware/isAuthenticated')

/* /post route */
router.post('/', isAuthenticated, postController.create);

router.get('/', postController.get)

router.post(':id/update', isAuthenticated, postController.update);

module.exports = router;
