module.exports ={
    modules: [
      // Simple usage
      'vuetify-dialog/nuxt'
   
      // Optionally passing options in module configuration
      ['vuetify-dialog/nuxt', { property: '$dialog' }]
    ],
   
    // Optionally passing options in module top level configuration
    vuetifyDialog: {
      property: '$dialog',
      confirm: {}
      // ...
    }
  }