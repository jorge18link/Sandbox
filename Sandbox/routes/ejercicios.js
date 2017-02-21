var express = require('express');
var router = express.Router();

var Ejercicio = require('../models/ejercicio');

router.get('/', function(req, res){
	res.send("front end ejercicios")
});

router.get('/crear', function(req, res){
	res.render('ejerciciosCrear');
});


router.post('/crear', function(req,res){
	var ejercio = Ejercicio(req.body);
	ejercicio.save(function(err){
		if (err) {
			return err;
  		}else {
			res.render('indexProfesor');
		}
	});
});

router.post('/modificar', function(req,res){
		id = req.body.id
		//query de busqueda
		var ejercio = Ejercicio(req.body);
		ejercicio.save(function(err){
			if (err) {
				return err;
			}else {
				res.render('indexProfesor');
			}
		});
});

router.post('/eliminar', function(req,res){
		id = req.body.id
		
		var busca = {_id: id};

		User.findOne(busca,function(err, user){
			if(err) throw err;
			if(!user){
				return done(null, false, {message: 'Unknown User'});		
			}
			user.remove();
			console.log('Usuario eliminado con exito');
		});
		
});


module.exports = router;
