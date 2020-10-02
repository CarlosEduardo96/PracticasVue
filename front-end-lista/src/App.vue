<template>
  <v-app>
    <Menu/>
    <v-main>
     <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menu/Menu'
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
    Menu
  },

  data: () => ({
    //
  }),
};
</script>
