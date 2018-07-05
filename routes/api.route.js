var express = require('express');

var router = express.Router();
var articles = require('./api/article.route');

router.use('/articles', articles);

module.exports = router;
