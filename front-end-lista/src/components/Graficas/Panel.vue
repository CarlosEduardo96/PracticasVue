<template>
   <v-container fluid>
       <v-row dense>
        <v-col cols="12" ms="12" md="3" class="pb-10">
            <Herramienta @select="Seleccion($event)"/>
        </v-col>
        <v-col cols="12" md="9" v-if="personas">
            <GraficaBarra v-bind:Lista="personas" v-if="seleccion==='barra'"/>
            <GraficaDona  v-bind:Lista="personas" v-if="seleccion==='dona'"/>
            <GraficaLineal v-bind:Lista="personas" v-if="seleccion==='lineal'"/>
        </v-col>
        <v-col cols="12" ms="12" md="9"  align-self="center" v-if="!personas">
           <div class="d-flex justify-center flex-column md-6 mx-10">
               <div cols="12">Cargando...</div>               
                <v-progress-linear
                        color="deep-purple accent-4"
                        indeterminate
                        rounded
                        height="6"
                ></v-progress-linear>
           </div>
        </v-col>
       </v-row>
   </v-container>
</template>
<script>
import axios from 'axios'
import Herramienta from './Herramienta'
import GraficaBarra from './Barra'
import GraficaDona from './Dona'; 
import GraficaLineal from './Lineal'
export default {
    name:"Panel",
    components: {
        Herramienta,
        GraficaBarra,
        GraficaDona,
        GraficaLineal
    },
    data(){
        return{
            seleccion: "dona",
            personas:undefined
        }
    },
    mounted() {
        this.getPersonas();
    },
    methods:{
        Seleccion(value){
            this.seleccion=value;
        },
        getPersonas(){
            axios.get(this.$Api_Rest+"/todas-personas/")
            .then((res)=>{
                if(res.data.Personas){
                    this.personas=res.data.Personas;
                }
            })
            .catch(error=>console.log(error))
            .finally(console.log("Peticion finalizada"));
        }
    }
}
</script>