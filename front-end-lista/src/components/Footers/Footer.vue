<template>
   <v-footer padless color="info" dark max-height="60">
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>CharlyCode</strong>
    </v-col>
  </v-footer>
</template>
<script>
export default {
    name:"Footer"
}
</script>