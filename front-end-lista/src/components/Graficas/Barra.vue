<template>  
    <v-card elevation="6" max-height="600">
        <v-card-title class="justify-center">Estadisticas de Edades</v-card-title>
        <v-card-subtitle id="chart" class="my-2">            
        </v-card-subtitle>
    </v-card>
</template>
<script>
import ApexCharts from 'apexcharts'
export default {
    name:"Barra",
    props:{
        Lista:{
            type:Array,
            require: true
        }
    },
    data(){
        return{
            
        }
    },
    mounted() {
        this.Resultados();
    },
    methods:{
        Resultados(){
            
            var MayorM=0;
            var MayorF=0;
            var MenorM=0;
            var MenorF=0;            
            this.Lista.forEach(item=>{
                if(item.edad<18 && item.sexo==='F'){ MenorF+=1;}
                else if(item.edad<18 && item.sexo==='M'){ MenorM+=1;}
                else if(item.edad>=18 && item.sexo==='F'){ MayorF+=1;}
                else if(item.edad>=18 && item.sexo==='M'){ MayorM+=1;}
            }); 
            // GraficaBarra
            var options= {
                chart: {
                    height: 400,
                    type: "bar"
                },
                plotOptions: {
                    bar: {
                    vertical:true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1,
                    colors: ["#fff"]
                },
                series: [
                    {
                        name:"Mayores de edad",
                        data: [MenorF,MenorM],
                    },
                    {
                        name:"Menores de edad",
                        data: [MayorF,MayorM]
                    }
                ],
                xaxis: {
                    categories: [
                    "Mujer",
                    "Hombre"
                    ]
                },
                legend: {
                    position: "right",
                    verticalAlign: "top",
                    containerMargin: {
                    left: 35,
                    right: 60
                    }
                },
                responsive: [
                    {
                    breakpoint: 1000,
                    options: {
                        plotOptions: {
                        bar: {
                            horizontal: false
                        }
                        },
                        legend: {
                        position: "bottom"
                        }
                    }
                    }
                ]
            }

            var grafic = new ApexCharts(document.querySelector("#chart"),options);
            grafic.render();
        }
    }
}
</script>