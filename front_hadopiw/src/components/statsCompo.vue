<template>
  <div v-for="(stat) in allStats">
    <div  class="stat">
    <div class="name item">{{Object.keys(stat)[0]}}
    <runeCompo :rune="this.test(Object.keys(stat)[0])" v-if="Object.values(stat)[0].min>0"/>
    </div>
    
    <div class="minMax">
      <div class="mItem">{{Object.values(stat)[0].min}}</div>
      <div class="mItem">{{Object.values(stat)[0].max}}</div>
    </div>
    </div>

  </div>
</template>

<script>
import runeCompo from '../components/runeCompo.vue';

export default {
  name: 'recipeCompo',
  components: { runeCompo },
  props:{
      allStats:Array
  },
  data(){
    // console.log(this.$store.getters.getAllRunes);
    
    return{
    }
    
  },
  methods: {
    test(name){
      // console.log(this.$store.getters.getAllRunes);
        switch(name){
          case 'Force':
            return this.$store.getters.getAllRunes[0];
          case 'Sagesse':
            return this.$store.getters.getAllRunes[1];
          case 'Intelligence':
            return this.$store.getters.getAllRunes[2];
          case 'Vitalité':
            return this.$store.getters.getAllRunes[3];
          case 'Agilité':
            return this.$store.getters.getAllRunes[4];
          case 'Chance':
            return this.$store.getters.getAllRunes[5];
          case 'PA':
            return this.$store.getters.getAllRunes[18];
          case 'PM':
            return this.$store.getters.getAllRunes[19];
          case '% Critique':
            return this.$store.getters.getAllRunes[20];
          case 'Soins':
            return this.$store.getters.getAllRunes[21];
          case 'Dommages':
            return this.$store.getters.getAllRunes[22];
          case 'Puissance':
            return this.$store.getters.getAllRunes[23];
          case 'Renvoie de dommages':
            return this.$store.getters.getAllRunes[24];
          case 'Portée':
            return this.$store.getters.getAllRunes[25];
          case 'Invocations':
            return this.$store.getters.getAllRunes[26];
          case 'Pods':
            return this.$store.getters.getAllRunes[27];
          case 'Dommages Pièges':
            return this.$store.getters.getAllRunes[30];
          case 'Puissance (pièges)':
            return this.$store.getters.getAllRunes[31];
          case 'Initiative':
            return this.$store.getters.getAllRunes[32];
          case 'Prospection':
            return this.$store.getters.getAllRunes[35];
          case 'Résistance Feu':
            return this.$store.getters.getAllRunes[36];
          case 'Résistance Air':
            return this.$store.getters.getAllRunes[37];
          case 'Résistance Eau':
            return this.$store.getters.getAllRunes[38];
          case 'Résistance Terre':
            return this.$store.getters.getAllRunes[39];
          case 'Résistance Neutre':
            return this.$store.getters.getAllRunes[40];
          case '% Résistance Feu':
            return this.$store.getters.getAllRunes[41];
          case '% Résistance Air':
            return this.$store.getters.getAllRunes[42];
          case '% Résistance Terre':
            return this.$store.getters.getAllRunes[43];
          case '% Résistance Neutre':
            return this.$store.getters.getAllRunes[44];
          case '% Résistance Eau':
            return this.$store.getters.getAllRunes[45];
          case 'Arme de chasse':
            return this.$store.getters.getAllRunes[46];
          case 'Fuite':
            return this.$store.getters.getAllRunes[53];
          case 'Tacle':
            return this.$store.getters.getAllRunes[55];
          case 'Esquive PA':
            return this.$store.getters.getAllRunes[57];
          case 'Esquive PM':
            return this.$store.getters.getAllRunes[59];
          case 'Retrait PA':
            return this.$store.getters.getAllRunes[61];
          case 'Retrait PM':
            return this.$store.getters.getAllRunes[63];
          case 'Dommages Poussée':
            return this.$store.getters.getAllRunes[65];
          case 'Résistance Poussée':
            return this.$store.getters.getAllRunes[67];
          case 'Dommages Critiques':
            return this.$store.getters.getAllRunes[69];
          case 'Résistance Critiques':
            return this.$store.getters.getAllRunes[71];
          case 'Dommages Terre':
            return this.$store.getters.getAllRunes[73];
          case 'Dommages Feu':
            return this.$store.getters.getAllRunes[75];
          case 'Dommages Eau':
            return this.$store.getters.getAllRunes[77];
          case 'Dommages Air':
            return this.$store.getters.getAllRunes[79];
          case 'Dommages Neutre':
            return this.$store.getters.getAllRunes[81];
          case '% Dommages mêlée':
            return this.$store.getters.getAllRunes[83];
          case '% Dommages distance':
            return this.$store.getters.getAllRunes[84];
          case "% Dommages d'armes":
            return this.$store.getters.getAllRunes[85];
          case '% Dommages aux sorts':
            return this.$store.getters.getAllRunes[86];
          case '% Résistance mêlée':
            return this.$store.getters.getAllRunes[87];
          case '% Résistance distance':
            return this.$store.getters.getAllRunes[88];
          case '% Dommages distance':
            return this.$store.getters.getAllRunes[89];
          case '% Dommages distance':
            return this.$store.getters.getAllRunes[90];
          case '% Dommages distance':
            return this.$store.getters.getAllRunes[84];
          
        }
    }
  },
  
}
</script>



<style scoped>
.stat{
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  background-color: rgba(255, 255, 255, 0.068);
  margin: 15px 0px;
  border-radius: 5px;
  padding: 3px 5px;
}

.update{
  display: flex;
  justify-content: space-between;
}
.minMax{
  display: flex;
}
.mItem{
  margin: 0 8px;
}
</style>