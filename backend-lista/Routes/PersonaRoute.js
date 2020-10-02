'use strict'

var express= require('express');
var PersonaController= require("../Controllers/PersonasController");
var router= new express.Router();

var multipart= require("connect-multiparty");
var md_upload=new multipart({uploadDir:"./upload"});
//Rutas de prueba
router.post('/datos-personas',PersonaController.DatosPrersona);
router.get('/test-personas',PersonaController.test);

//Rutas funcionales

//Traer la lista.
router.get("/todas-personas/:last?",PersonaController.getPersonas);

//Buscar persona por id
router.get("/by-persona/:id",PersonaController.getPersonaID);

//guardar
router.post("/save-persona",PersonaController.save);

//Actualizar
router.put("/update-persona/:id",PersonaController.updatePersona);

//eliminar
router.delete("/delete-persona/:id",PersonaController.deletePersona);

//Subida de archivos
router.post("/upload-file/:id",md_upload,PersonaController.uploadFile);

router.get("/get-file/:imagen_name",PersonaController.getImagen);

//Busqueda de personas
router.get("/buscar-personas/:buscar",PersonaController.buscarPersona);

module.exports= router;
