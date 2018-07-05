var express = require("express");

// Use multer to handle forms which send files
var multer = require('multer');
// Use disk storage engine for multer
var storage = multer.diskStorage({
    destination: 'public/images/',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage});

var router = express.Router();

var ArticleController = require("../../controllers/article.controller");

console.log("At article.route");
router.get("/", ArticleController.getArticles);
router.post("/", upload.single('file'), ArticleController.createArticle);
router.put("/", upload.single('file'), ArticleController.updateArticle);

module.exports = router;
