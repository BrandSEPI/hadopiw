<template>
  <div v-for="(stat) in allStats">
    <div  class="stat">
    <div class="name item">{{Object.keys(stat)[0]}}</div>
    <div class="minMax">
      <div class="mItem">{{Object.values(stat)[0].min}}</div>
      <div class="mItem">{{Object.values(stat)[0].max}}</div>
    </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'recipeCompo',
  props:{
      allStats:Array
  },
  data(){
    return{
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