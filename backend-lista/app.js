'use strict'

//Cargar modulos de node para crear servidor
var express= require('express');
var bodyParser=require('body-parser');

//ejecutar express (HTTP)
var app=express();

//Cargar ficheros rutas
var PersonaRoute = require('./Routes/PersonaRoute');

//Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Añadir prefijos a rutas
app.use('/api',PersonaRoute);

//Exportar mudulos
module.exports= app;