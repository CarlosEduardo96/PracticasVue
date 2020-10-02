'use strict'

//Se carga el esquema de nuestra base de datos
var mongoose= require('mongoose');
var Schema=mongoose.Schema;

//Esta propiedad indica el formato que va a tener la tabla de base de datos.
var PersonaSchema=Schema({
    nombre: String,
    apellidos: String,
    sexo: String,
    edad: {type: Number, default: 0},
    archivo: {type: String, default:"Sin imagen"},
    data:{ type: Date, default: Date.now()}
});

//Guarda el documento en la base de datos de mongoose
module.exports=mongoose.model('Persona',PersonaSchema);