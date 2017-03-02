var columns = ["paralelo", "profesor", "estudiantes"];
require("csv-to-array")({
   file: './archivos/curso.csv',
   columns: columns
}, function (err, array) {
  console.log(array);
});