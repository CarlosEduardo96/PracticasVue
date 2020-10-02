<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
        
        <template v-slot:activator="{ on, attrs }">            
            <v-btn icon v-bind="attrs" v-on="on"  @click="dialog=true">            
                <v-icon>mdi-image</v-icon>
            </v-btn>           
        </template>           
       <v-card>
            <v-card-title class="headline info darken-2 justify-center">
                <span class="white--text">Foto grafia de {{Item.nombre}}</span>
            </v-card-title>           
           <div class="d-flex justify-center">
                <v-img
                    v-if="Item.archivo!='Sin imagen'"
                    :src="this.$Api_Rest+'/get-file/'+Item.archivo"
                    alt="Sin Imagen"               
                /> 
                <v-img
                    v-else
                    src="../../assets/Perfil.png"
                    alt="Sin Imagen"               
                /> 
            </div>

            <v-divider></v-divider>
            <v-card-actions>
                <v-file-input 
                    v-model="Imagen"
                    accept="image/png, image/jpeg, image/bmp" 
                    placeholder="Subir Imagen"
                    prepend-icon="mdi-camera"
                    label="Foto"
                />
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" @click="SubirImagen(Item)">            
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                    </template>
                    <span>Enviar Imagen</span>
                </v-tooltip>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    Cerrar
                </v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import axios from 'axios';
export default {
    name:"VistaImagen",
    props:{
        Item:{
            type: Object,
            require:true
        }
    },
    data(){
        return {
            dialog:false,
            Imagen:undefined
        }
    },
    methods:{
        SubirImagen(item){
            if(this.Imagen)
            {
                var form=new FormData();
                form.append("file0",this.Imagen);
                axios.post(this.$Api_Rest+"/upload-file/"+item._id,form).
                then(res=>{
                    if(res.data.personaUpdate){
                        this.Imagen=undefined;
                        this.Item.archivo=res.data.personaUpdate.archivo;
                        this.$dialog.notify.success("Datos guardados con exito.", {
                            position: 'top-right',
                            timeout: 3000
                        });
                        
                    }
                });
            }
            else{
                this.$dialog.notify.warning("Nada que enviar.", {
                    position: 'top-right',
                    timeout: 3000
                });
            }
        }
    }
}
</script>