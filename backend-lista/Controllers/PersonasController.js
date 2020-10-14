'use strict'
//Libreria para validar los datos recibidos
var validator=require('validator');
const PersonasModel = require('../Models/PersonasModel');

//Exportar el modelo de la base de datos para interactial con la base de datos
var Persona= require('../Models/PersonasModel');


//librerias multi-party crud
var fs=require('fs');
var path=require('path');


var controller={
   DatosPrersona:(req, res)=>{
    var params=req.body.hola;
    return res.status(200).send({
        nombre:"Carlos Eduardo",
        apellidos:"Rodriguez Cruz",
        sexo:"M",
        edad: 24,
        params
    });
   },

   test: (req,res)=>{
    return res.status(200).send({
        Mensaje:"Soy la accion test de mi controlador de articulos"
    });
   },

   save(req,res){
    //Recojer los parametros
    var params=req.body;
    //validar parametros
    try {
        var validate_nombre=!validator.isEmpty(params.nombre);
        var validate_apellidos=!validator.isEmpty(params.apellidos);
        var validate_sexo=!validator.isEmpty(params.sexo);
        var validate_edad=!validator.isEmpty(params.edad);        
    } catch (error) {
        return res.status(404).send({
            params,
            mensaje:"Ocurrio un error al recibir la petición, faltan datos..",
            estado:404

        });
    }

    if(validate_nombre && validate_apellidos && validate_sexo && validate_edad){
        // Crear el objeto a guardar
        var persona=new Persona();

        //Asignar valores
        persona.nombre=params.nombre;
        persona.apellidos=params.apellidos;
        persona.sexo=params.sexo;
        persona.edad=params.edad;

        //Guardar
        persona.save((error,personaStored)=>{
            if(error || !personaStored){
                return res.status(500).send({
                    estado:500,
                    mensaje:"No fue posible registrar a la persona..."
                });
            }else{
                return res.status(200).send({
                    estado:200,
                    mensaje:"Success",
                    personaStored
                });
            }
        });
    }
    else{
        return res.status(411).send({
            estado:411,
            mensaje:"Faltan datos por enviar",
            params
        });
    }
   },
   getPersonas(req,res){

    var query=PersonasModel.find({});
    var last=req.params.last;
    if(last){
        query.limit(5);
    }
    //find
    query.sort('-_id')
    .exec((error,Personas)=>{

        if(error){
            return res.status(500).send({
                estado: 500,
                mensaje:"Se produjo un error al traer los datos..."
            })
        }
        else if(!Personas){
            return res.status(500).send({
                estado:500,
                mensaje:"No hay personas registradas"
            });
        }
        return res.status(200).send({
            estado: 200,
            mensaje:"Success",
            Personas
        });
    });
   },
   getPersonaID: (req,res)=>{
    //Recoger el id
    var persona_id=req.params.id;
    if(!persona_id || persona_id===null || persona_id===undefined){
        return res.status(404).send({
            estado:404,
            mensaje: "No hay persona que mostrar"
        });
    }
    //Comprobar que existe
    PersonasModel.findById(persona_id,(err,persona)=>{
        if(err){
            return res.status(500).send({
                estado: 500,
                mensaje:"Error al devolver los datos..."
            });
        }else if(!persona){
            return res.status(500).send({
                estado:500,
                mensaje:"No existe la persona...."
            });
        }else{
            //Devolver el _id
            return res.status(200).send({
                estado:200,
                mensaje:"Success",
                persona
            });
        }

    });
    
   },

   updatePersona:(req,res)=>{
       
    //recoger el id de la url
    var persona_id=req.params.id;

    //recoger los datos por put
    var params=req.body;

    //validar los datos
    try {
        var validate_nombre=!validator.isEmpty(params.nombre);
        var validate_apellidos=!validator.isEmpty(params.apellidos);
        var validate_sexo=!validator.isEmpty(params.sexo);
        var validate_edad=!validator.isEmpty(params.edad);
        //var validate_archivo=!validator.isEmpty(params.archivo);
    } catch (error) {
        return res.status(500).send({
            estado:500,
            mensaje:"Faltan datos por enviar"
        });
    }
    if(validate_nombre && validate_apellidos && validate_sexo && validate_edad){
        //realizar la consulta
        PersonasModel.findByIdAndUpdate({_id: persona_id}, params,{new: true},(error,personaUpdate)=>{
            if(error){
                return res.status(404).send({
                    estado: 404,
                    mensaje:"Error al actualizar.."
                })
            }
            else if(!personaUpdate){
                return res.status(500).send({
                    estado:500,
                    mensaje:"No existe la persona..."
                });
            }else{
                return res.status(200).send({
                    estado:200,
                    mensaje:"Successs",
                    personaUpdate
                });
            }
        });
    
    }

   },
   deletePersona:(req,res)=>{
    //recoger el id de la url
    var persona_id=req.params.id;

    //realizar consulta
    PersonasModel.findByIdAndDelete({_id:persona_id},(err,persona)=>{
        if(err){
            return res.status(500).send({
                estado: 500,
                mensaje:"Error al borar los datos..."
            });
        }else if(!persona){
            return res.status(500).send({
                estado:500,
                mensaje:"No existe la persona...."
            });
        }else{
            fs.unlink('./upload/'+persona.archivo,(error)=>{                
                console.log("Archivo eliminado conexito");                
            });

            //Devolver el _id
            return res.status(200).send({
                estado:200,
                mensaje:"Success",
                persona
            });
        }
    });
   },
   
   uploadFile: (req,res)=>{
    //configurar el modulo multi-party
    var file_name="Imagen no subida";
   
    if(!req.files){
        return res.status(404).send({
            estado: 404,
            mensaje: file_name
        });
    }
    //recoger el fichero
    var file_path= req.files.file0.path;
    var file_split=file_path.split('\\');

    //ADVERTENCIA en linux o en mac
    //var file_split=file_path.file_split('/');

    //Consegir el nombre y la extencion de archivo
    file_name=file_split[1];

    //Extencion del fichero
    var extencion_split=file_name.split('\.');
    var file_ext= extencion_split[1];
    //comprobar la extenxion
    if(file_ext!="png" && file_ext!="jpg" && file_ext!="jpeg"){
        //borrar el archivo
        fs.unlink(file_path, (error)=>{
            return res.status(404).send({
                estado:404,
                mensaje:"La extencion de la imagen no es valida"
            });
        });
    }
    else{
        //buscar si es valida
        var persona_id=req.params.id;
        //buscar el articulo, asignar el nombre de la imagen y actualizarlo
        PersonasModel.findByIdAndUpdate(
            {_id: persona_id},
            {archivo: file_name},
            {new:true},
            (err, personaUpdate)=>{
                if(err || !personaUpdate){
                    return res.status(500).send({
                        estado: 500,
                        mensaje: "Error al actualizar los datos"
                    });
                }
                else if(personaUpdate){
                    return res.status(200).send({
                        estado:200,
                        mensaje:"Datos actulizados con exito...",
                        personaUpdate
                    });
                }
            }
        );
    }    
   },

   getImagen:(req,res)=>{
    var file=req.params.imagen_name;
    var file_path='./upload/'+file;

    fs.exists(file_path,(existe)=>{
        if(existe){
            return res.sendFile(path.resolve(file_path));
        }
        else{
            return res.status(404).send({
                estado: 404,
                mensaje:"El fichero no exite..."
            });
        }
    });
   },

   buscarPersona:(req,res)=>{

    //Sacar el string a buscar,
    var searchPersona= req.params.buscar;

    //Find or en el modelo

    PersonasModel.find({
        $or:[
            { 
                nombre:
                { 
                    $regex: searchPersona, 
                    $options: "i"
                }
            },            
            {
                apellidos:
                { 
                    $regex: searchPersona, 
                    $options: "i"
                }
            }
        ]
    }).sort('-_id').exec((err,getPersonas)=>{
           if(err || !getPersonas || getPersonas.length==0){ 
               return res.status(500).send({
                   estado: 500,
                   mensaje:"Es posible que no alla coincidencia..."
               })
           }
           else if(getPersonas){
               return res.status(200).send({
                estado:200,
                mensaje:"Busquda realizada con exito",
                getPersonas
               });
           }
       });
   }
   
};

//
module.exports = controller;