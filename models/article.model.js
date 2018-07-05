var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    date: Date
});

articleSchema.plugin(mongoosePaginate);
const article = mongoose.model('Article', articleSchema);

module.exports = article;
