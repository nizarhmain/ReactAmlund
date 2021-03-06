const express = require('express');
const router = express.Router();
const passport = require('passport');
const Article = require('../models/article');
const config = require('../config/database');
const authenticate = require('../middlewares/authenticate');


// create an article
router.post('/post', authenticate.authenticate , function(req,res){

	// so we need to make a count of all the articles, add 1 to it, and divide that number by the pagesize number
	var article = req.body;
	if (article.title == null || article.content == null || article.cover == null) {
		return res.sendStatus(400);
	}
	// if everything goes well server side validation, initialize the article variable

	var newArticle = new Article({
		title: article.title,
		cover: article.cover,
		is_published: article.is_published,
		content: article.content,
		author: article.author
	});


	Article.AddArticle(newArticle, function(err, article){
		if(err){
			return res.sendStatus(400);
		} else {

			return res.sendStatus(200);
		}
	});
});

//get all the articles
router.get('/all/:page', function(req, res){
	
	var page = req.params.page;
	if(page > 0 && page < 5000) {
	Article.paginate( Article.find().sort('-created') ,{page: page, limit: 8}, function(err, articles){
		return res.status(200).json({articles: articles.docs, pages: articles.pages});
	});

	} else {
		return res.sendStatus(404);
	}
	
});


// get the published articles 
router.get('/published/:page', function(req, res){

	var page = req.params.page;
	if(page > 0 && page < 5000) {
	Article.paginate( Article.find({is_published: true}).sort('-created') ,{page: page, limit: 8}, function(err, articles){
		return res.status(200).json({articles: articles.docs, pages: articles.pages});
	});

	} else {
		return res.sendStatus(404);
	}
	
	
});

// get article by id and read it 
router.get('/post/:id', function(req,res){

	var id = req.params.id || '';
	if(id == ''){
		return res.sendStatus(404);
	}

	var query = Article.findOne({_id: id, is_published: true});
	query.exec(function(err, article){

		if(article != null){
			article.update({ $inc: {read: 1}}, function(err, nbRows, raw){
				return res.status(200).json({article: article});
			});
		} else {
			return res.sendStatus(404);
		}
	});       
 
});

//the id in question is sent in the body request, for liking an article
router.post('/post/like', function(req,res){
	var id = req.body.id || '';
	if(id == ''){
		return res.sendStatus(400);
	}
	Article.update({_id:id}, { $inc: {likes:1}}, function(err,nbRows,raw){
		if(err) throw err;
		return res.sendStatus(200);
	});
});

router.post('/post/unlike', function(req,res){
	var id = req.body.id || '';
	if(id == ''){
		return res.sendStatus(400);
	}
	Article.update({_id:id}, { $inc: {likes:-1}}, function(err,nbRows,raw){
		if(err) throw err;
		return res.sendStatus(200);
	});
});

// editing a post
router.put('/post/update', authenticate.authenticate, function(req,res){
	var article = req.body;
	if(article == null || article._id == null){
		return res.sendStatus(400);
	} else {

	var updatedArticle = {};
	if(article.title != null && article.title != ""){
		updatedArticle.title = article.title;
	} else {
		return res.sendStatus(400);
	}

	if(article.is_published != null){
		updatedArticle.is_published = article.is_published;
	} else {
		return res.sendStatus(400);
	}

	if(article.content != null && article.content != ""){
		updatedArticle.content = article.content;
	} else {
		return res.sendStatus(400);
	}
	
	updatedArticle.updated = new Date();
	Article.update({_id: article._id}, updatedArticle, function(err,nbRows, raw){
	if(err){
		    return res.sendStatus(400);
		} else {
			return res.json({success: true, msg: 'article registered'});
		}
	});
  }

});

//quick publish an article
router.put('/post/publish/:id',  authenticate.authenticate , function(req, res){
	setTimeout(function() {
			var id = req.params.id;
			if(id == null || id == ''){
				res.sendStatus(400);
			}
			Article.update({_id: id}, {$set: {is_published:"true"}}, function(err, result){
				if(err) throw err;
				return res.sendStatus(200);
			});
	}, 1000);
	
});

router.put('/post/hide/:id', authenticate.authenticate, function(req, res){
	setTimeout(function() {
			var id = req.params.id;
			if(id == null || id == ''){
				res.sendStatus(400);
			}
			Article.update({_id: id}, {$set: {is_published:"false"}}, function(err, result){
				if(err) throw err;
				return res.sendStatus(200);
			});       
	}, 1000);
});

router.delete('/post/:id', authenticate.authenticate, function(req, res){
	var id = req.params.id;
	if(id == null || id == ''){
		res.sendStatus(400);
	}

	var query = Article.findOne({_id: id});
	query.exec(function(err, result){
		if(err){
			return res.sendStatus(400);
		}
		if(result != null) {
			result.remove();
			return res.sendStatus(200);
		} else {
			return res.sendStatus(400);
		}
	})
});


module.exports = router;