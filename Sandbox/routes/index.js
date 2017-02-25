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

function sumarDias(fecha, dias){
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

router.get('/perfil/Insignias',function(req,res){
	/*
	var idUser = req.user._id
	var contEjercicios = 0;
	var contEjerciciosSemana = 0;
	busca = {idUsuario : idUser};
	console.log("El id del usuario logeado es: "+idUser);

	EjercicioResuelto.find(busca, function(err, ejercicios) {
    if(err) throw err;
		contEjercicios = Object.keys(ejercicios).length;
		console.log("la cantidad de ejercicios resueltos son: "+contEjercicios);
		console.log(ejercicios)
	});
	
	var hoy = new Date();
	
	var day1=  hoy.getDate();
	var month1=  hoy.getMonth();
	var year1= hoy.getFullYear();
	
	var eseDia = sumarDias(hoy, -7)
  var day0= eseDia.getDate();
	var month0= eseDia.getMonth();
	var year0= eseDia.getFullYear();
	*/

	idu="58aef054a174c10fb8bf2271"
	var momento = moment().format('YYYY MM DD');
	
	
	
  
	//La fecha debe estar guardada asi YYYY-MM-DD
	//db.posts.find({"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}})
	/*
	busca={
		fecha:{
			$gte: new Date(year1,month1,day1),
			$lt: new Date(year0,month0,day0)
		}
	}

	EjercicioResuelto.find(busca, function(err, ejercicios) {
		if(err) throw err;
		contEjerciciosSemana = Object.keys(ejercicios).length;
		console.log("la cantidad de ejercicios resueltos por semana son: "+contEjerciciosSemana);
	});
	*/
});

module.exports = router;
