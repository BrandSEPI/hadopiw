<template>
<!-- {{recipe}} -->
<div>total : {{this.$store.getters.getTotal}} k</div>
  <div v-for="ressource in recipe" :key="ressource">
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
    this.$store.commit("clearUpdateRessource")
    this.$store.commit("clearTotal")
  },

}

</script>



<style scoped>
/* amulette du granduk */
</style>
