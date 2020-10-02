<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="5">
                <Formulario ref="SeccionForm" @guardar="Guardar($event)" @update="Actualizar($event)" @error="Mensaje($event)"/>
            </v-col>
            <v-col  cols="12" md="7">
                <Lista ref="ListaPersonas" @editar="Editar($event)" @error="Mensaje($event)"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import Formulario from '../components/Contenido/Formulario'
import Lista from '../components/Contenido/Lista'
export default {
    name:"Inicio",
    components:{
        Formulario,
        Lista        
    },
    methods:{
        Guardar(event){
            this.$refs.ListaPersonas.Insertar(event);
            this.$dialog.notify.success("Datos guardados con exito.", {
                position: 'top-right',
                timeout: 3000
            });
        },
        Editar(event){
            this.$refs.SeccionForm.Editar(event);
        },
        Actualizar(event){
            this.$dialog.notify.success("Datos actializados.", {
                position: 'top-right',
                timeout: 3000
            });
        },
        Mensaje(event){
            this.$dialog.notify.warning(event, {
                position: 'top-right',
                timeout: 3000
            });
        }
    }
}
</script>