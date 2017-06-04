const mongoose = require('mongoose');
const config = require('../config/database');

const ArticleSchema = mongoose.Schema({
    title: { type: String, required: true },
    cover: { type: String },
    is_published: { type: Boolean, default: false },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    read: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
});

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.getArticleById = function(id, callback){
    Article.findById(id, callback);
};

module.exports.getArticleByTitle = function(title, callback){
    const query = {title: title};
    Article.findOne(query, callback);
};

module.exports.AddArticle = function (newArticle, callback){
        newArticle.save(callback);
};
