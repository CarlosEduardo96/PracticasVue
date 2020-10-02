<template>
    <div></div>
</template>
<script>
import { loadModules } from 'esri-loader';

export default {
    name:"Mapa",
    data(){
        return {
            mapa: undefined
        }
    },
    mounted() {
      this.CargarMapa();
    },
    methods:{
        CargarMapa(){
            loadModules([
            'esri/WebMap', 
            'esri/views/MapView',
            "esri/widgets/BasemapGallery",
            "esri/geometry/Extent",
            "esri/geometry/SpatialReference",
            "esri/widgets/Home",
            "esri/widgets/Search",
            "esri/widgets/Bookmarks",
            "esri/widgets/Expand",
            "esri/widgets/ScaleBar"

            ],{ css: true })
            .then(([
                    WebMap, MapView,
                    BasemapGallery, Extent,
                    SpatialReference,Home,
                    Search,Bookmarks,Expand,
                    ScaleBar
                               
                ]) => {
                this.MapaPrincipal(WebMap, MapView, Extent, SpatialReference,ScaleBar);
                this.Casa(Home);
                this.Buscar(Search, Expand);
                this.Bookmarks(Bookmarks,Expand);
                this.VistaMapas(BasemapGallery, Expand);

            });
        },
        MapaPrincipal(WebMap, MapView, Extent, SpatialReference,ScaleBar){
            const map = new WebMap({
                basemap: "hybrid"
            });
            var initExtent = new Extent(
                    -121,
                    13,
                    -83,
                    33,
                    new SpatialReference({ wkid: 4326 })
            );

            this.view = new MapView({
                container: this.$el,
                map: map,
                center: [-118, 34],
                zoom: 8,
                extent: initExtent
            });
            const scaleBar = new ScaleBar({
                view: this.view,
                unit: "dual",
            });

            this.view.ui.add(scaleBar, { position: "bottom-left", index: 0 });
            this.mapa=map;
        },
        Casa(Home){
            
            const home = new Home({
                view: this.view,
            });
            this.view.ui.add(home,{
                position: "top-left",
                index:1
            });           

        },
        Buscar(Search, Expand){

            var searchWidget = new Search({
                view: this.view
            });

            const vista= new Expand({
                view: this.view,
                expandIconClass: "esri-icon-search",
                content: searchWidget,
                expandTooltip:"Buscador",
                expanded:false
            });

            this.view.ui.add(vista, {
                position: "top-right",
                index:0
            });
        },
        Bookmarks(Bookmarks,Expand){

            const bookmarks = new Bookmarks({
                view: this.view,
                // allows bookmarks to be added, edited, or deleted
                editingEnabled: true
            });

            const vista = new Expand({
                view: this.view,
                content: bookmarks,
                expandIconClass:"esri-icon-favorites",
                expandTooltip:"Marcadores",
                expanded: false
            });

            this.view.ui.add(vista, {
                position: "top-right",
                index:1
            });
        },
        VistaMapas(BasemapGallery, Expand){

            const Galerias = new BasemapGallery({
                view: this.view,
            });

            const vistas = new Expand({
                expandIconClass: "esri-icon-layers",
                view: this.view,
                expandTooltip: "Mapas",
                content: Galerias
            });

            this.view.ui.add(vistas, {
                position: "top-right",
                index: 2
            });
        }
    },
    beforeDestroy() {
      // Destruye la vista del mapa
      if (this.view) {
        this.view.container = null;
      }
    }
}
</script>

<style lang="scss" scoped>
div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>
