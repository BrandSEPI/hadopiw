<template>
<div class="menu background">
    <a class="link" @click="itemCalculator"><img class="linkImg" src="../assets/item.png" alt="itemImage"></a>
    <a class="link" href="/ressourceCalculator"><img class="linkImg"  src="../assets/ressource.png" alt="RessourceImage"></a>
</div>

</template>

<script>

export default {
  name: 'choice',
  methods:{
    itemCalculator(e){
      this.$store.dispatch("getAllItems");
    }
  }
}

</script>



<style scoped>

.menu{
  margin: 10vh auto;
  display: flex;
  justify-content: space-around;
}
.linkImg{
  width: 10vw;
}
.link{
  border-radius: 15px;
  padding: 50px;
  border: solid 7px rgba(0, 0, 0, 0);

}
.link:hover{
  border: solid 7px rgba(255, 255, 255, 0.397);
}

</style>