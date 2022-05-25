<template>
    <div class="itemInfo">
        <div class="price">Price : {{this.price}} k</div>
        <div class="coef">Coef : {{this.coef}}%</div>
        <div class="infoDate">Last update : {{this.infoDate}}</div>
    </div>
</template>

<script>

export default {
  name: 'itemInfo',
  props:{
      price:Number,
      coef:Number,
      infoDate:Date,
  }
}
</script>



<style scoped>
.background{
    background-color: black;
}
.itemInfo{
    padding: 20px 50px;
    border: solid 3px rgba(255, 255, 255, 0.63);
    margin: 30px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
    font-size: 1.2em;
    border-radius: 15px;
}
</style>