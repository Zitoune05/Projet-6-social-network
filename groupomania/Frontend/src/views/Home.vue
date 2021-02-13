<template>
  <div  id="feed"  class="row g-0 mx-auto" >

    <!----------  IF not connected ------------->
      <Wall/>
    <!----------- ELSE APP card  ------------->

  </div>
</template>

<script>
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
