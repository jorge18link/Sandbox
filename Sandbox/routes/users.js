var express = require('express');
var router = express.Router();

var User=require('../models/usuario');

router.get('/', function(req, res){
	User.find({}, function(err, users) {
    if(err) throw err;
		res.send(users);
	});
});

router.get('/prueba', function(req, res){
	res.render('prueba');
});

router.post('/crear', ensureAuthenticated, function(req, res){
	var randomstring = Math.random().toString(36).slice(-8);
	var  nuevo=new User({ 
		CorreoElectronico:req.body.correo,
	   	Contrasena: randomstring,
	   	Rol: req.body.rol,
	   	TipoDeIdentificacion: req.body.TipodeIdentificacion,
	   	Identificacion: req.body.Identificacion,
	   	Nombres: req.body.Nombres,
	   	Apellidos: req.body.apellidos,
	   	Carrera: req.body.carrea

	});
	nuevo.save(function(err){ 
		if (err) {
			return err;
  		}
  		else {
  			console.log("Post saved");
  				var correo= req.body.correo;
				var Subject="Creacion de cuenta en Sandbox"
				var contenido="Bienvenido/a al curso Fundamentos de programacion, tu contrasena Temporal para andbox es: " +randomstring
				var mailOptions = {		
					to: correo,
					subject: Subject,
					text: contenido
				}
					console.log(mailOptions);
				smtpTransport.sendMail(mailOptions, function(error, response){
						if (error) {
							console.log(error);
							res.end('error');
						} else {
							console.log('Message sent:'  + response.message);
							response.end('sent');
						}
				})
 		 }

	});

	res.send("creado");
});


router.post('/modificar',ensureAuthenticated, function(req,res){
		correo = req.body.correo
		//query de busqueda
		var busca = {CorreoElectronico: correo};
		/*
		User.findOne(busca,function(err, user){
			console.log('Usuario Anterior:');
			console.log(user);
		});
		*/
		//Se toman los datos de la vista con los parametros que vas a modificar
		var modificacion = {
			Rol: req.body.rol,
			TipoDeIdentificacion: req.body.tipoIdentificacion,
			Identificacion: req.body.identificacion,
			Nombres: req.body.nombres,
			Apellidos: req.body.apellidos,
			Carrera: req.body.carrera
		}

		//Ejemplo ----> Cat.findOneAndUpdate({age: 17}, {$set:{name:"Naomi"}}, {new: true}, function(err, doc){
		User.findOneAndUpdate(busca, {$set:modificacion}, {new: true}, function(err, doc){
			if(err){
					console.log("Something wrong when updating data!");
			}
			console.log('Usuario Modificado con exito');
			//console.log(doc);
		});

		//Aqui Carga la pagina que sigue
		res.redirect('/');
});

router.post('/eliminar',ensureAuthenticated, function(req,res){
		correo = req.body.correo
		var busca = {CorreoElectronico: correo};

		User.findOne(busca,function(err, user){
			if(err) throw err;
			if(!user){
				return done(null, false, {message: 'Unknown User'});		
			}
			user.remove();
			console.log('Usuario eliminado con exito');
		});

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}




module.exports = router;
