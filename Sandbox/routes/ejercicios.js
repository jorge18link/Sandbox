var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}

var validacion=function(req,res,next){
	if(req.user.Rol !="profesor"|| req.user.Rol !="ayudante"){
  	res.sendStatus(401);
  	return;
  }
  next();	
}

router.get('/',ensureAuthenticated,validacion, function(req, res){
	res.send("front end ejercicios")
});


module.exports = router;
