<template>    
    <v-card elevation="6" max-height="600">
        <v-card-title class="justify-center">Estadisticas Sexos</v-card-title>
        <v-card-subtitle id="chart" class="my-2"> 
        </v-card-subtitle>
    </v-card>   
</template>
<script>
import ApexCharts from 'apexcharts'
export default {
    name:"Dona",
    props:{
        Lista:{
            type: Array,
            require: true
        }
    },
    mounted(){
        this.Resultados();
    },
    methods:{
        Resultados(){
            var totalF=0;
            var totalM=0;
            var totalO=0;
            this.Lista.forEach(item=>{
                if(item.sexo==='F'){
                    totalF+=1;
                }
                else if(item.sexo==='M'){
                    totalM+=1;
                }
                else if(item.sexo==='O'){
                    totalO+=1;
                }
            });

            var options = {
                chart: {
                    type: 'donut',
                    width:"100%",
                    height:400
                },
                series: [totalF,totalM,totalO],
                labels: ['Mujer', 'Hombre','Otros'],
                plotOptions: {
                    pie:{
                        donut: {
                            labels: {
                                show: true,                                
                                total: {
                                    show: true,
                                    showAlways: false,
                                    label: 'Total',
                                    fontSize: '22px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 600,
                                    color: '#FF2121',
                                    formatter: ()=>{
                                        return this.Lista.length;
                                    }
                                }
                            }

                        }
                    }
                },
                responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom'
                    }
                }
                }]
            }
            var grafic = new ApexCharts(document.querySelector("#chart"),options);
            grafic.render();
        }
    }
}
</script>