// Opens App Routes
var mongoose 		= require('mongoose');
var Post 			= mongoose.model('Post');

module.exports = function(app){

	app.get('/posts', function(req, res, next) {
	  Post.find(function(err, posts){
	    if(err){ return next(err); }
	    res.json(posts);
	  });
	});

	app.get('/posts/post/:id', function(req, res, next) {
		var id = req.params.id;
		Post.findById(id, function(err, post){
		if(err){ return next(err); }
			res.json(post);
		});
	});

	app.post('/posts', function(req, res, next) {
	  console.log(req.body);
	  var post = new Post(req.body);
	  post.save(function(err, post){
	    if(err){ return next(err); }

	    res.json(post);
	  });
	});

	app.delete('/posts/:id', function(req, res) {
		var id = req.params.id;
		Post.remove( {_id: id}, function(err, post){
			res.json(post)
		});
	});
	//Up votes and downvotes
	app.put('/posts/upvote/:post', function(req, res, next) {
		req.post.upvote(function(err, post){
			if (err) {return next(err); }
			res.json(post);
		});
	});

	app.put('/posts/downvote/:post', function(req, res, next) {
		req.post.downvote(function(err, post){
			if (err) {return next(err); }
			res.json(post);
		});
	});

	app.param('post', function(req, res, next, id) {
	  var query = Post.findById(id);

	  query.exec(function (err, post){
	    if (err) { return next(err); }
	    if (!post) { return next(new Error('can\'t find post')); }

	    req.post = post;
	    return next();
	  });
	});

	app.get('/posts/:post', function(req, res) {
	  res.json(req.post);
	});
}