var express = require('express');
var router = express.Router();

var User=require('../models/usuario');

router.get('/', function(req, res){
	res.render('prueba')
});

router.post('/modificar', function(req,res){
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
   		TipoIdentificacion: req.body.tipoIdentificacion,
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
		});

		//Aqui Carga la pagina que sigue
		res.send("sw")

});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}




module.exports = router;
