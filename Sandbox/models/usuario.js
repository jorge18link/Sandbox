var mongoose= require('mongoose');
var bcrypt = require('bcrypt');
var Schema = require('mongoose').Schema

var usuarioSchema = new Schema({
   CorreoElectronico:String,
   Contrasena:String,
   Rol:String,
   TipoDeIdentificacion:String,
   Identificacion:String,
   Nombres:String,
   Apellidos:String,
   Carrera:String,
   puntajeObtenido:Number,
   paralelo:Number
})

var User=module.exports=mongoose.model('usuario',usuarioSchema);

module.exports.getUserByUsername = function(username, callback){
	var query = {CorreoElectronico: username};
    User.findOne(query, callback);
    
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	console.log(hash)
    console.log(candidatePassword)
    var salt = bcrypt.genSaltSync(10);
    bcrypt.hash(hash, salt, function(err, hash) {
        if (err) { throw (err); 
        }
         bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) { throw (err); }
            callback(null, isMatch);
            console.log('Ver isMatch');
            console.log(isMatch);
     });
    });
}
