<template>
  <div id="app">
      <Navbar/>
      <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 1000px;
  background-color: rgba(123, 141, 158, 0.418);
}
#app a{
  text-decoration: none; 
}

</style>
