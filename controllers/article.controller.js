var multer = require('multer');
var upload = multer({ dest: '../images/ '});
var ArticleService = require('../services/article.service');

_this = this;

exports.getArticles = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var articles = await ArticleService.getArticles({}, page, limit);

        return res.status(200).json({ status: 200, data: articles, message: "Successfully received articles" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createArticle = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var article = {
        title: req.body.title,
        description: req.body.description,
        image: req.file.originalname
    }

    try {

        // Calling the Service function with the new object from the Request Body
        var createdArticle = await ArticleService.createArticle(article)
        return res.status(201).json({ status: 201, data: createdArticle, message: "Succesfully Created Article" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Article Creation was Unsuccesfull" })
    }
}

exports.updateArticle = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var id = req.body._id;

    console.log(req.body)

    var article = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        image: req.file.originalname ? req.file.originalname : null
    }

    try {
        var updatedArticle = await ArticleService.updateArticle(article)
        return res.status(200).json({ status: 200, data: updatedArticle, message: "Succesfully Updated Article" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}
