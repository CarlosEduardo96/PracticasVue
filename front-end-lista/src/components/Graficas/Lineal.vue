<template>
     <v-card elevation="6" max-height="600">
        <v-card-title class="justify-center">Estadisticas de Edades</v-card-title>
        <v-card-subtitle class="d-flex justify-end">
            <div cols="3">
                <v-select v-model="año" outlined dense :items="item" background-color="success" dark></v-select>
            </div>
        </v-card-subtitle>
        <v-card-subtitle id="chart" class="my-2">            
        </v-card-subtitle>
    </v-card>
</template>
<script>
import ApexCharts from 'apexcharts'
export default {
    name:"Lineal",
    props:{
        Lista:{
            type: Array,
            require: true
        }
    },
    data(){
        return{
            año:this.$moment().year(),
            item:[this.$moment().year()],
            Grupos:[]
        }
    },
    mounted() {
       this.Agrupar();
    },
    methods:{
        Resultados(datos){
            var months=this.$moment.monthsShort();

            var data= new Array();
            var meses= datos.meses;
            var history=0;
            this.año=datos.año;

            for(var i=1; i<=12; i++){
                data.push(0);
                meses.find(elemento=>{
                    if(elemento.mes===i){
                        data[i]=elemento.total;
                        history+=1;
                    }
                }, i, history);

                if(history===meses.length){
                    break;
                }                
            }    
            
            console.log(data);
            var options={
                chart: {
                    type: 'line',
                    height: 340
                },
                series: [{
                    name: 'Rating',
                    data: data
                }],
                xaxis: {
                    categories: months
                },  
                markers: {
                    size: [7, 7]
                },
                responsive: [{
                    breakpoint: 400,
                    options: {
                        legend: {
                            position: "bottom"
                        }
                    },
                }]

            }

            var vista = new ApexCharts(document.querySelector("#chart"), options);
            vista.render();
        },
        Agrupar(){
            var meses=new Array();
            var count_year= 0;
            var count_month= 0;
            var lastmonth= 0;
            var lastyear=0;            

            for(var i=0; i<this.Lista.length; i++){
                
                var month=this.$moment(this.Lista[i].date).month();
                var year=this.$moment(this.Lista[i].date).year();        

                if(i===0){
                  lastyear=year;
                  lastmonth=month;
                }
                if(lastyear===year){ 

                    if(lastmonth===month){ 
                        
                        if(meses.length<=0){
                            count_month+=1;                           
                            meses.push({mes: month, total: count_month});
                        }
                        else{
                            count_month+=1
                            meses.find(elemento =>{
                                if(elemento.mes===month){
                                    elemento.total=count_month;
                                }
                            }, count_month, month);
                        }                        
                    }
                    else if(lastmonth!=month){
                        count_month=1;                        
                        lastmonth=month;
                        meses.push({mes: month, total: count_month});
                       
                    }    
                    count_year+=1;

                    if(this.Grupos.length<=0){
                        this.Grupos.push({año: lastyear, meses, total: count_year});
                    } 
                    else{
                        this.Grupos.find((elemento)=>{
                            if(elemento.año===year){
                                elemento.total=count_year;
                            }
                        },year,count_year);
                    }                            
                }else if(lastyear!=year){
                    meses=[];
                    count_year= 1;
                    count_month= 1;
                    lastmonth= month;
                    lastyear= year;    
                }   
            }
            // console.log(this.Grupos);
            this.Resultados(this.Grupos[0]);
        }
    }
    
}
</script>