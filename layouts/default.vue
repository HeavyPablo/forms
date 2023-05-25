<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app color="surface">
      <span>&copy; {{ new Date().getFullYear() }} <span class="text--secondary">|</span> Mario Pablo Bustos Sanchez <span class="text--secondary">|</span> HeavyPablo</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      title: 'Vuetify.js by Mario Bustos as HeavyPablo'
    }
  }
}
</script>
