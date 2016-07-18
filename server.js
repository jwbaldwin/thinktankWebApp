//set up =========================
    var express  		= require('express');
    var app      		= express();                  // create our app w/ express
    var mongoose 		= require('mongoose');        // mongoose for mongodb
    var morgan 			= require('morgan');          // log requests to the console (express4)
    var bodyParser 		= require('body-parser');     // pull information from HTML POST (express4)
    var port            = process.env.PORT || 3000;   // server port
    var methodOverride 	= require('method-override'); // simulate DELETE and PUT (express4)
    var http            = require('http').Server(app);
    var io              = require('socket.io')(http);

// configuration =================
    //Mongo routes
    require('./app/models.js');
    mongoose.connect("mongodb://localhost/myIdeaApp");     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.get('/', function(req, res){
      //send the index.html file for all requests
      res.sendFile(__dirname + '/public/index.html');
    });
    //Routes
    require('./app/routes.js')(app);

// Register events on socket connection
io.on('connection', function(socket){
    socket.on('create', function(room){
        console.log("Room is ready!");
        socket.join(room);
    });
    socket.on('chatMessage', function(from, msg, room){
        io.to(room).emit('chatMessage', from, msg);
    });
    socket.on('notifyUser', function(user, room){
        io.to(room).emit('notifyUser', user);
    });
    socket.on('leave', function(room){
        socket.leave(room);
        console.log("A user disconnected");
    });
});

// listen (start app with node server.js) ======================================
    http.listen(port, function(){
        console.log("App listening on port " + port);
    });
