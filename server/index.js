var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require("http");
var path = require("path");
var browserify = require("browserify-middleware");

var assetFolder = path.join(__dirname, '..', 'client');
var port = process.env.PORT || 4000;

var User = require('../client/models/user');
var Session = require('../client/models/session')

module.exports = app;



app.use(express.static(assetFolder))

app.get('/app-bundle.js',
 browserify('./client/components/app.js', {
    transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
  })
);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Signup


app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findByUsername( username )
    .then(function(user) {
      if ( user && user.length >= 1) {
        res.redirect('/signup');
      }
      else {
        User.create({
          username: username,
          password: password
        })
          .then(function(newUser) {
            return Session.create(newUser.id);
          })
          .then(function (newSession) {
            res.cookie('sessionId', newSession.id);
            return res.redirect('/');
          })
      }
    })
});

//Login


app.post('/login', function(req, res) {


  var username = req.body.username;
  var password = req.body.password;

  User.findByUsername( username )
    .then(function(user) {
      if ( ! user ) {
        res.redirect('/login');
      }
      else {
        User.comparePassword( user[0].password_hash, password )
          .then(function (isMatch) {
            if ( ! isMatch ) {
              res.redirect('/login');
            } else {
              Session.create( user[0].id )
                .then(function (newSession) {
                  res.cookie('sessionId', newSession.id);
                  return res.redirect('/');
                })
            }
          });
      }
    });
});

app.get('/logout', function(req, res) {

  Session.destroy( req.headers.cookie )
    .then(function (response) {
      return res.redirect('/');
    })
});


// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

// Start server
app.listen(port);

