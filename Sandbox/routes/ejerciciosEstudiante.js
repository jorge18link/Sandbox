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
			console.log(ej);
            res.render("HacerEjercicio", {list:ej});
            //sres.send(ej);
    });    
})
router.get('/obtener/:dificultad',function(req,res){
   dificultad= req.params.id;
   var busca ={dificultad:dificultad}
    Ejercicio.findOne(busca,function(err, ej){
			if(err) throw err;
            res.send(ej);
    });    
})
module.exports = router;
