var ejercicio=require('../models/ejercicio')
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

router.get('/',function(req,res){
    res.render('index-Estudiantes')
})
router.get('/realizar/:id',function(req,res){
    var id=req.params.id;
	var busca = {_id: id};
    ejercicio.findOne(busca,function(err, ejercicio){
			if(err) throw err;
			res.render('HacerEjercicio');
    });    
})
module.exports = router;
