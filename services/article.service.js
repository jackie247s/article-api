var Article = require('../models/article.model');

_this = this;

exports.getArticles = async function(query, page, limit){
    var options = {
        page,
        limit
    }

    try {
        var articles = await Article.paginate(query, options);
        return articles;
    }
    catch(e) {
        throw Error('Error while paginating articles');
    }
}

exports.createArticle = async function(article) {
    var newArticle = new Article({
        title: article.title,
        image: article.image,
        description: article.description,
        date: new Date()
    });

    try{
        var savedArticle = newArticle.save();
        return savedArticle;
    }
    catch(e) {
        throw Error('Error inserting article');
    }
}

exports.updateArticle = async function(article) {
    var id = article.id;

    try{
        var oldArticle = await Article.findById(id);
    }
    catch(e) {
        throw Error('Error finding old article');
    }

    if(!oldArticle) return false;

    console.log(oldArticle);

    oldArticle.title = article.title;
    oldArticle.description = article.description;
    oldArticle.image = article.image;

    console.log(oldArticle);

    try {
        var savedArticle = oldArticle.save();
        return savedArticle;
    }
    catch(e) {
        throw Error('Error while updating article');
    }
}