<template>
    
    <v-data-table :headers="Header" :items="datos" height="400"> 
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Listado</v-toolbar-title>               
            </v-toolbar>
        </template>
        <template v-slot:[`item.archivo`]="{ item }">
           
            <VistaImagen v-bind:Item="item" v-if="item"/>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="Editar(item)">            
                        <v-icon>mdi-account-edit</v-icon>
                    </v-btn>
                </template>
                <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="Eliminar(item)">            
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Eliminar</span>
            </v-tooltip>
        </template>
    </v-data-table>
    
</template>
<script>
import axios from 'axios';
import VistaImagen from './VistaImagen'
export default {
    name: "Lista",
    components: {
        VistaImagen
    },
    data(){
        return {
            Header:[
                {text: "Nombre", value:"nombre", sortable: false},
                {text: "Apellidos", value:"apellidos", sortable: false},
                {text: "Edad", value:"edad"},
                {text: "Sexo", value:"sexo"},
                {text: "Acciones", value:"archivo",align:"center",sortable: false}
            ],
            datos:[]
        }
    },
    mounted(){
        this.CargarLista();
    },
    methods:{
        CargarLista(){
            axios.get(this.$Api_Rest+"/todas-personas/")
            .then((res)=>{
                if(res.data.Personas){
                    this.datos=res.data.Personas;
                }
            })
            .catch(error=>console.log(error))
            .finally(console.log("Peticion finalizada"));
        },
        Insertar(event){
            this.datos.push(event);
        },
        async Eliminar(event){

            let ok= await this.$dialog.confirm({
                text: '¿Deseas eliminar a esta persona?',
                title: 'Advertencia'
            });

            if(ok){
                axios.delete(this.$Api_Rest+"/delete-persona/"+event._id)
                .then(res=>{
                    if(res.data.persona){
                        var index =this.datos.indexOf(event);        
                        this.datos.splice(index,1);
                        this.$dialog.notify.success("Eliminad con exito.", {
                            position: 'top-right',
                            timeout: 3000
                        });
                    }
                    else{
                        this.$emit("error","Error al eliminar.");
                    }
                })
                .catch(error=>console.log(error))
                .finally(console.log("Peticion realizada"));
            }
        },
        Editar(event){  
            this.$emit("editar",event);
        }
    }
}
</script>