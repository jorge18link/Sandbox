var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');

var curso =require('../models/curso');
/*var User=require('../models/usuario');

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
        user: 'lilibeth.karen@gmail.com',
        pass: 'redkaren94'
    }
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/');
    }
}*/

router.get('/', function(req, res){
    /*User.find({}, function(err, users) {
        if(err) throw err;
        res.render('auto')
    });*/
    res.render('curso')
});

module.exports = router;