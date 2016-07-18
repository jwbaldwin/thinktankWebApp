var socket = io();

var app = angular.module('myIdeaApp');

app.controller('chatController', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http){
  var roomid = $routeParams.id;

  $scope.submitFunction = function(){
    var from = $('#user').val();
    var message = $('#m').val();
    if(message != '') {
      socket.emit('chatMessage', from, message, roomid);
    }
    $('#m').val('').focus();
      return false;
  }

  $scope.notifyTyping = function() {
    var user = $('#user').val();
    socket.emit('notifyUser', user, roomid);
  }

  socket.on('chatMessage', function(from, msg){
    var me = $('#user').val();
    var color = (from == me) ? 'green' : '#009afd';
    var from = (from == me) ? 'Me' : from;
    $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
    updateScroll(); //update after message has been sent
  });

  socket.on('notifyUser', function(user){
    var me = $('#user').val();
    if(user != me) {
      $('#notifyUser').text(user + ' is typing ...');
    }
    setTimeout(function(){ $('#notifyUser').text(''); }, 10000);
  });

  //Get a single post by the roomid aka objectID
  var getPost = function(id){
    $http.get('/posts/post/' + id).success(function(response) {
      $scope.post = response;
    })
  };

  // On Entrance to the page
  $(document).ready(function(){
    var name = makeid();
    $('#user').val(name);
    getPost(roomid);
    socket.emit('create', roomid);
    socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion', roomid);
  });
  // On leaving the page disconnect the user
  $scope.$on('$locationChangeStart', function(event) {
    socket.emit('leave', roomid);
  });


  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  //Auto scroll
  function updateScroll(){
      var element = document.getElementById("chatDiv");
      if(element != null){
        element.scrollTop = element.scrollHeight;
      }
  }
}]);
