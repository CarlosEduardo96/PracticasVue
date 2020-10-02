import Vue from 'vue'
import App from './App.vue'
//Instalacion de router
import router from './router'

//Instalacion de vuetify
import vuetify from './plugins/vuetify';

//Instalacion de los toast
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.config.productionTip = false;

//URL Api Rest
Vue.prototype.$Api_Rest="http://localhost:3900/api";
// Vue.use(VuetifyDialog);
//Configuracion de los dialog
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  },
  confirm: {
    actions: {
      false: 'No',
      true: {
        text: 'Yes',
        color: 'primary'
      }
    },
    icon: false, // to disable icon just put false
    width: 500
  },
  warning: {},
  error: {},
  prompt: {}
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
