var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var EjercicioResuelto =require('../models/resuelto');
var User=require('../models/usuario');
require('moment');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}

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

router.get('/perfil/Insignias',ensureAuthenticated,function(req,res){
	var idUser = req.user._id
	var contEjercicios = 0;
	var contEjerciciosSemana = 0;
	busca = {idUsuario : idUser};
	console.log("El id del usuario logeado es: "+idUser);

	EjercicioResuelto.find({}, function(err, ejercicios) {
    if(err) throw err;
		//console.log("Sus ejercicios resueltos son: ");
		//console.log(ejercicios);
		contEjercicios = Object.keys(ejercicios).length;
		console.log("la cantidad de ejercicios resueltos son: "+contEjercicios);
		/*
		leng=3;
		maximo=leng-1;
		minimo=0
 			cont=0
			while(cont<100){
				cont++;
				num =Math.floor(Math.random()*(maximo-minimo+1)+(minimo));
      	console.log(num);
		 	}
		*/
		//res.send(ejercicios);
		});

		//var today = moment().startOf('day');
		//console.log("El dia es: "+today);
		//var tomorrow = moment(today).add(1, 'days');
		//res.send(today)
	
		/*
		MyModel.find({
			createdAt: {
				$gte: today.toDate(),
				$lt: tomorrow.toDate()
			}
		})
		*/
})

module.exports = router;
