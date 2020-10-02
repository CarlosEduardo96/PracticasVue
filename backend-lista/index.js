'use strict'

var mongoose=require("mongoose");
var app=require("./app");

var port=3900;

//Configuracion
var url="mongodb://localhost:27017/api_rest_lista";
var opciones={useNewUrlParser: true};

//Conexion a la base de datos
mongoose.set('useFindAndModify', false);//desactivar configuraciones viejas y usar las modernas
mongoose.Promise=global.Promise;
mongoose.connect(url,opciones).then(()=>{
    console.log("Conectado a la base de datos....");

    //CREAR SERVIDOR Y ESCUCHAR PETICIONES HTTP
    app.listen(port, ()=> {
        console.log("Servidor corriendo en http://localhost/"+port);
    });
})
.catch(error=>console.log(error))
.finally(console.log("Hasta luego :)"));