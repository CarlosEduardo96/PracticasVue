<template>
    <v-card class="mx-auto">
    <v-list>
      <v-list-group :value="true" prepend-icon="mdi-chart-areaspline">
        <template v-slot:activator>
          <v-list-item-title>Tipos de graficas</v-list-item-title>
        </template>
        <v-list-item v-for="item in lista" :key="item.title" link @click="Selecion(item.value)">
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
    name:"Herramienta",
    props:{
      Lista:{
        type: Object,
        require: true
      }
    },
    data(){
        return{
            lista:
            [
                {title:"Estadisticas Sexos",value:"dona", icon:"mdi-chart-pie"},
                {title:"Estadisticas Edades",value:"barra", icon:"mdi-chart-bar"},
                {title:"Reathing",value:"lineal", icon:"mdi-chart-line"}
            ]
        }
    },
    methods:{
        Selecion(value){
            this.$emit("select",value);
        }
    }
    
}
</script>