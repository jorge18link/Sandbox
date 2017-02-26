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
	}
);

router.get('/logout', function(req, res){
	console.log("deslogeando y tu usuario era:"+req.user);
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

router.get('/perfil',ensureAuthenticated,function(req,res){
	res.render('perfil');
})

router.post('/modifContrasena',ensureAuthenticated,function(req,res){
	var nuevaContraseña=req.body.nContraseña;
	var antiguaContraseña=req.user.Contrasena;
	var validarAntigua=req.body.validarAntigua;
	var idUsuario=req.user._id;
	var busca= {_id : idUsuario}
	var modificacion={
		Contrasena: nuevaContraseña
	}
	//console.log('mostrar contraseñas');
	//console.log(antiguaContraseña);
	//console.log(validarAntigua);
	if(antiguaContraseña==validarAntigua){
		User.findOneAndUpdate(busca, {$set:modificacion}, {new: true}, function(err, doc){
			if(err){					
				console.log("Something wrong when updating data!");
				res.json({cambio:0, mensaje:'Algo salió mal'});
			}
			console.log("Contrasena modificado con exito");
			res.json({cambio: 1, mensaje:'Contraseña cambiada con éxito'});
		}); 
	}else{
		console.log("No coincide");
		res.json({cambio:0, mensaje:'La contraseña anterior no coincide'});
	}
})

router.get('/usulog',function(req,res){
	res.send(req.user);
})

router.get('/totalInsignias', function(req,res){
	idUser = req.user._id;
	var contEjercicios=0;
	var contEjerciciosSemana=0;
	var contarPuntos=0;
	busca = {idUsuario : idUser};
	//console.log("El id del usuario logeado es: " + idUser);

	EjercicioResuelto.find(busca, function(err, ejercicios) {
		if(err){
			console.log("ocurrio un error al buscar usuario con id: "+idUser);
			throw err;
		} 
		contEjercicios = Object.keys(ejercicios).length;
		//console.log("la cantidad de ejercicios resueltos son: "+contEjercicios);
		
		for(var i in ejercicios){
			contarPuntos = contarPuntos + ejercicios[i].puntos;
		}

		//Buscar por fecha rango de fecha e idUser
		var hoy = new Date();
		var eseDia = new Date();
		eseDia.setDate(hoy.getDate()-8);

		var busca2={
			idUsuario: idUser,
			fecha : {$gte: eseDia}
		}

		EjercicioResuelto.find(busca2, function(err2, ejercicios2) {
			if(err2){
				console.log("ocurrio un error al buscar usuario con id: "+idUser);
				throw err2;
			}
			contEjerciciosSemana = Object.keys(ejercicios2).length;
			//console.log("ejercicios2: "+ejercicios2);
			var respuesta = {
				total : contEjercicios,
				totalSemana: contEjerciciosSemana,
				totalPuntos: contarPuntos
			}
			//console.log(respuesta);
			res.send(respuesta);
		});
	});
});

module.exports = router;
