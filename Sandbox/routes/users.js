var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var User=require('../models/usuario');

var validacion=function(req,res,next){
	if(req.user.Rol !="Administrador"){
  	res.sendStatus(401);
  	return;
  }
  next();	
}
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: 'aqui va el correo',
        pass: 'aqui va la contraseña de ese correo'
    }
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/');
	}
}

router.get('/crear',ensureAuthenticated,validacion,function(req,res){
    res.render('usuarioCrear');
})

router.get('/',ensureAuthenticated,validacion, function(req, res){
	User.find({}, function(err, users) {
    if(err) throw err;
		res.render('verUsuarios',{listaUsers:users});
	});
});

router.get('/:id',ensureAuthenticated,validacion, function(req, res){
	idUsuario=req.params.id;
	var busca = {_id: idUsuario};
	User.findOne(busca,function(err, user){
		if(err) throw err;
		return res.send(user);
	});
});

router.post('/crear', ensureAuthenticated, function(req, res){
	req.body.Contrasena=Math.random().toString(36).slice(-8); 
	req.body.puntajeObtenido=0;
	req.body.paralelo=0;
	req.body.resueltos=0;
	var  nuevo=new User(req.body);
	nuevo.save(function(err){ 
		if (err) {
			return err;
  		}
  		else {
  			//console.log("Post saved");
  				var correo= req.body.CorreoElectronico;
				var Subject="Creacion de cuenta en Sandbox"
				var contenido="Bienvenido/a al curso Fundamentos de programacion, tu contrasena Temporal para andbox es: " +req.body.Contrasena; 
				var mailOptions = {		
					to: correo,
					subject: Subject,
					text: contenido
				}
					//console.log(mailOptions);
				smtpTransport.sendMail(mailOptions, function(error, response){
					if (error) {
						console.log(error);
						res.end('Error al enviar el Email con contraseña');
					} else {
						//console.log('Message sent:'  + response.message);
						res.send("Ya cree el usuario");
					}
				})
 		 }

	});
	
});

router.delete('/eliminarUsuario/:id',ensureAuthenticated, function(req,res){
		idUsuario = req.params.id
		var busca = {_id: idUsuario};
		User.findOne(busca,function(err, user){
			if(err) throw err;
			user.remove();
			console.log('Usuario eliminado con exito');
			return res.send("se elimino");
		});

});

router.put('/modificar/:id',ensureAuthenticated, function(req,res){
		idUsuario = req.params.id;
		//query de busqueda
		var busca = {_id: idUsuario};
		/*
		User.findOne(busca,function(err, user){
			console.log('Usuario Anterior:');
			console.log(user);
		});
		*/
		//Se toman los datos de la vista con los parametros que vas a modificar
		var modificacion = {
			Rol: req.body.Rol,
			CorreoElectronico: req.body.CorreoElectronico,
			TipoDeIdentificacion: req.body.TipoDeIdentificacion,
			Identificacion: req.body.Identificacion,
			Nombres: req.body.Nombres,
			Apellidos: req.body.Apellidos,
			Carrera: req.body.Carrera
		}

		//Ejemplo ----> Cat.findOneAndUpdate({age: 17}, {$set:{name:"Naomi"}}, {new: true}, function(err, doc){
		User.findOneAndUpdate(busca, {$set:modificacion}, {new: true}, function(err, doc){
			if(err){					
			console.log("Something wrong when updating data!");
			res.send("algo salió mal")
		}
			console.log("Usuario modificado con exito")
			res.send('Usuario Modificado con exito');
			//console.log(doc);
		});
});

module.exports = router;
