var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.send("front end ejercicios")
});


module.exports = router;
