var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User=require('../models/usuario');

router.get('/', function(req, res){
	res.render('login',{message:req.flash('')});
});

router.get('/inicio', function(req, res){
	if(req.user.Rol=="Administrador"){
		res.redirect('/users')
	}if(req.user.Rol=='Profesor'|| req.user.Rol=='Ayudante'){
		res.redirect('/ejercicios')
	}if (req.user.Rol=='Estudiante'){
		res.redirect('/ejerciciosEstudiante');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
		User.getUserByUsername(username, function(err, user){
			if(err) throw err;
			if(!user){
				return done(null, false, {message: 'Unknown User'});		
			}
 
			User.comparePassword(password, user.Contrasena, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null, user);
				} else {
					return done(null, false, {message: 'Invalid password'});
				}
			});
   });
}));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
	passport.authenticate('local', {successRedirect:'/inicio', failureRedirect:'/',failureFlash: true}),
  function(req, res) {
		
    res.redirect('/inicio');
});

router.get('/logout', function(req, res){
	console.log("deslogeando y tu usuario era:"+req.user);
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
