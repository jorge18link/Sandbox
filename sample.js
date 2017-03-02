var fs = require('fs')
var csv = require('fast-csv')

fs.createReadStream('estudiantescsv.csv')
    .pipe(csv())
    .on('data',function(data){
        console.log(data);
        /*for (i = 0; i < data.length; i++) { 
            console.log(data[i]);
        } ASI PARA RECORRERLO*/
    })
    .on('end',function(data){
        console.log('Read finished');
    });