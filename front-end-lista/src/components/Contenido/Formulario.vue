<template>
    <v-container fluid>
        <v-card elevation="0" class="mx-4">
            <v-form ref="Formulario">
                <v-row>
                    <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="Nombre" :rules="RulesGlobal" :counter="20" label="Nombre" require/>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="Apellido" :rules="RulesGlobal" :counter="20" label="Apellido" require/>
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                        <v-text-field v-model="Edad" :rules="RulesNumber" label="Edad" require/>
                    </v-col>
                    <v-col cols="12" sm="12" md="8">
                        <span>¿Sexo?</span>
                        <v-radio-group  v-model="Sexo" :rules="RulesGlobal" :mandatory="false"  row require>
                            <v-radio label="Femenino" value="F"/>
                            <v-radio label="Masculino" value="M"/>
                            <v-radio label="Otros" value="O"/>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12">
                        <div class="d-flex justify-end md-6">
                            <v-btn
                                color="warning"
                                class="ma-2 white--text"
                                @click="LimpiarFormulario"
                            >
                                Limpiar
                                <v-icon right dark>mdi-eraser</v-icon>
                            </v-btn>
                            <v-btn 
                                :loading="enviar" 
                                :disabled="enviar" 
                                color="success" 
                                class="ma-2 white--text"
                                @click="Enviar"
                            >
                                Guardar
                                <v-icon right dark>mdi-content-save</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name:"Formulario",
    data(){
        return{
            Nombre: undefined,
            Apellido: undefined,
            Sexo: undefined,
            Edad: undefined,
            RulesGlobal:[
                v=>!!v || 'Campo requerido'
            ],
            RulesNumber:[
                v=> !!v || 'Campo requerido',
                v=> (!!v && !isNaN(parseFloat(v)) && v.toString().search(/[A-Z]|[#]|[.]/ig) == -1 && v >= 0) || 'Se requiere un número entero',
                v=>( parseInt(v) <= 100)|| 'Excediste la edad promedio'
            ],
            enviar:false,
            editar:undefined
        }
    },
    methods:{
        Enviar(){
           
           if(this.$refs.Formulario.validate()&& !this.editar){
            let form={
                nombre:this.Nombre,
                apellidos:this.Apellido,
                sexo: this.Sexo,
                edad: this.Edad           
            }            
            
            this.sendData(form);
           }else if(this.$refs.Formulario.validate() && this.editar){
            
            this.editar.nombre=this.Nombre;
            this.editar.apellidos=this.Apellido;
            this.editar.sexo=this.Sexo;
            this.editar.edad=this.Edad;
            this.Actualizar(this.editar);
           }
        },
        sendData(Datos){
            axios.post(this.$Api_Rest+"/save-persona",Datos)
            .then(res=>{
                if(res.data.personaStored){ 
                    this.$refs.Formulario.reset();
                    this.$emit("guardar",res.data.personaStored);
                }
                else{
                    this.$emit("error","Error al guardar.");
                }
            })
            .catch(error=>console.log(error))
            .finally(console.log("Peticion finalizada"));
        },
        Editar(event){
            this.editar=event;
            this.Nombre=event.nombre;
            this.Apellido=event.apellidos
            this.Sexo=event.sexo;
            this.Edad=parseInt(event.edad);
        },
        Actualizar(item){
            axios.put(this.$Api_Rest+"/update-persona/"+item._id,item)
            .then(res=>{
                if(res.data.personaUpdate){                    
                    this.$emit("update",res.data.personaUpdate);
                }
                else{
                    this.$emit("error","Error al actualizar los datos.");
                }
            })
            .catch(error=>console.log(error))
            .finally(console.log("Peticion finalizada"));
        },
        LimpiarFormulario(){
            this.Nombre= undefined;
            this.Apellido= undefined;
            this.Sexo= undefined;
            this.Edad= undefined;
            this.$refs.Formulario.reset();
        }
    }

}
</script>