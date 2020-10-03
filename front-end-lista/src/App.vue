<template>
  <v-app>
    <Menu/>
    <v-main>
     <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Menu from './components/Menu/Menu'
import HelloWorld from './components/HelloWorld'
import Footer from './components/Footers/Footer'

export default {
  name: 'App',

  components: {
    HelloWorld,
    Menu,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
