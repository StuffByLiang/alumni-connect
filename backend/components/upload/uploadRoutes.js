const express = require('express');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const uploadController = require('./uploadController');
const isAuthenticated = require(__base + 'middleware/isAuthenticated');

/* /user route */
router.post('/upload/profilepicture', uploadController.uploadProfilePicture);

module.exports = router;
