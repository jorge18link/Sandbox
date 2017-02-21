var ejercicio=require('../models/ejercicio')
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

router.get('/',function(req,res){
    res.render('index-Estudiantes')
})

module.exports = router;
