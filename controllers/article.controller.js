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
    console.log(req.body);
    var data = JSON.parse(req.body.data);

    var article = {
        title: data.title,
        description: data.description,
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

    var newArticle = JSON.parse(req.body.data);
    console.log(req.body);

    // Id is necessary for the update

    if (!newArticle._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" });
    }

    var id = newArticle._id;

    console.log(newArticle);

    var article = {
        id,
        title: newArticle.title ? newArticle.title : null,
        description: newArticle.description ? newArticle.description : null
    }

    if(req.file){
        article.image = req.file.originalname
    }

    try {
        var updatedArticle = await ArticleService.updateArticle(article)
        return res.status(200).json({ status: 200, data: updatedArticle, message: "Succesfully Updated Article" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}
