var express = require('express');
var passport = require('passport');
// var Auth0Strategy = require('passport-auth0');
var session = require('express-session');
var GithubStrategy = require('passport-github2');
var config = require('./config.js');
var request = require('request');
var port = 3030;

var app = express();

app.use(session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GithubStrategy({
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/gibhub/callback',
  passport.authenticate('github', {successRedirect: '/#/home'}), function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
})

app.get('/api/github/following', function(req, res){
    res.send(req.user);
})

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}

request.get('https://api.github.com/user/followers').auth('username', 'password', false);
request.get('https://api.github.com/users/<username>/events').auth('username', 'password', false);

app.listen(port, function(){
    console.log('Listening on port ' + port);
})