<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar";

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/all";
  @import "variables";
  @import url('https://fonts.googleapis.com/css?family=Overpass');

  body {
    min-height: 100vh;
    background-color: $background-darker;
  }

  * {
    font-family: Overpass, Roboto, Arial, sans-serif;
  }

  #app {
    height: 100vh;
    width: 100vw;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  @import "~bulma/bulma";
  @import "~buefy/src/scss/buefy";
</style>
