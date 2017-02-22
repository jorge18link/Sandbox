var Ejercicio=require('../models/ejercicio')
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

router.get('/',function(req,res){
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
router.get('/obtener/:dificultad',function(req,res){
   dificu= req.params.dificultad;
   var busca ={dificultad:dificu}
    Ejercicio.find(busca, function(err, ej) {
		if(err) throw err;
            console.log(ej);
            res.send(ej);
	});   
})
module.exports = router;
