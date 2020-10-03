<template>
<v-app-bar color="info" dark max-height="60">
    <v-toolbar-title>{{Titulo}}</v-toolbar-title>
    <v-spacer/> 

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }" >
        <v-btn icon v-bind="attrs" v-on="on" to="/Inicio" @click="Titulo='Home'">            
            <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <span>Lista</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" to="/Graficas" @click="Titulo='Gestion de graficas'">         
            <v-icon>mdi-chart-pie</v-icon>
        </v-btn>
      </template>
      <span>Graficas</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" to="/Mapa" @click="Titulo='Mapa'">          
            <v-icon>mdi-google-maps</v-icon>
        </v-btn>
        </template>
        <span>Mapas</span>
    </v-tooltip>
</v-app-bar>
</template>
<script>
export default {
    name: "Menu",
    data(){
        return {
            Titulo:this.$route.name
        }
    }
}
</script>