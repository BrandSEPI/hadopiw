<template>
<!-- {{recipe}} -->
  <div v-for="ressource in recipe" class="test">
  <!-- {{ressource}} -->
  <resourceCompo :resource="ressource"/> 
  </div>
</template>

<script>
import resourceCompo from '../components/resourceCompo.vue';

export default {
  name: 'recipeCompo',
  components:{resourceCompo,},
  props:{
      recipe:Array,
  },
  data(){
    return{
      edit:false,
      // ressource:null,
      // update:null
    }
  },
  
}
</script>



<style scoped>
/* amulette du granduk */
</style>
