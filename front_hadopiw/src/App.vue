<template>
  <nav class="navbar">
        <router-link to="/"><img class="navLogo" src="./assets/hadopiw.png" alt="HadopiwLogo"></router-link>
        <router-link to="/kamasChoice" ><img class="navItem" src="./assets/kamas.png" alt="TabLogo"></router-link>
        <router-link to="/connect" class="right"><img class="navItem right" src="./assets/kamas.png" alt="TabLogo"></router-link>
  </nav>

  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body{
  background-color: rgb(49, 49, 49);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar{
  gap:30px;
  width: 100%;
  height: 75px;
  display: flex;
  background-color: rgb(26, 26, 27);
  align-items: center;
}
.navLogo{
  width: 50px;
  border-radius: 12px;
  border: solid 3px rgba(5, 5, 5, 0.342)}
.navItem{
  margin: 0 30px;
  width: 35px;
}
.right{
  margin-left: auto;
}

</style>
