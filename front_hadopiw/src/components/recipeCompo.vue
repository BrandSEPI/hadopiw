<template>
<!-- {{recipe}} -->
<div>total : {{this.total}}</div>
  <div v-for="ressource in recipe" class="test">
  <!-- {{ressource}} -->
  <resourceCompo :resource="ressource" @updateRessource="getPrice"/> 
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
      let total = 0
      let resUndefined=false;
      console.log(this.$store.getters.getUpdateResource);
      console.log("data");
      console.log(this.$store.getters.getUpdateResource["Gelée Bleutée Royale"]);
      for(let ressource in this.$store.getters.getUpdateResource){
        console.log(this.$store.getters.getUpdateResource[ressource]);
        if(this.$store.getters.getUpdateResource[ressource]!=undefined){
          total+=(this.$store.getters.getUpdateResource[ressource].price);
        } else {

            resUndefined=true;
        }
      }

      if(resUndefined){
        total = total.toString() + "+ ?"
      }

    
    return{
      edit:false,
      total:null,

    }
  },
  methods:{
      getPrice(value){
        console.log(value);
      },
  } ,
}

</script>



<style scoped>
/* amulette du granduk */
</style>
