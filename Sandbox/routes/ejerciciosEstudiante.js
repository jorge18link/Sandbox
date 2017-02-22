var Ejercicio=require('../models/ejercicio')
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}

var validacion=function(req,res,next){
	if(req.user.Rol !="Estudiante"){
  	res.sendStatus(401);
  	return;
  }
  next();	
}

router.get('/',ensureAuthenticated,validacion,function(req,res){
    res.render('index-Estudiantes')
})
router.get('/realizar/:id',function(req,res){
    var id=req.params.id;
	var busca = {_id: id};
    Ejercicio.findOne(busca,function(err, ej){
			if(err) throw err;
            res.render('HacerEjercicio', {list:ej});
            
    });    
})
router.get('/obtener/:dificultad',ensureAuthenticated,validacion,function(req,res){
   dificu= req.params.dificultad;
   var busca ={dificultad:dificu}
    Ejercicio.find(busca, function(err, ej) {
		if(err) throw err;
            console.log(ej);
            res.send(ej);
	});   
})
module.exports = router;
