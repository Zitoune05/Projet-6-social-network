<template>
  <div  id="feed"  class="row g-0 mx-auto" >

    <!----------  IF not connected ------------->
      <Wall/>
    <!----------- ELSE APP card  ------------->

  </div>
</template>

<script>
// @ is an alias to /src
import Wall from '../components/Posts/AllPosts';

export default {
  name: 'Home',
  components: {
    Wall
  }
}
</script>

<style >
  
</style>
