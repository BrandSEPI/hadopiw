<template>
  <nav class="navbar">
        <router-link to="/"><img class="navLogo" src="./assets/hadopiw.png" alt="HadopiwLogo"></router-link>
        <router-link to="/kamasChoice" ><img class="navItem" src="./assets/kamas.png" alt="Kamas"></router-link>
        <button v-if="logged!=undefined" @click="disconnect()" class="right exitBtn"><img class="navItem right" src="./assets/exit.png" alt="exit"></button>
        <router-link v-if="logged==undefined" to="/connect" class="right"><img class="navItem right" src="./assets/user.png" alt="user"></router-link>
        <!-- <button @click="disconnect()" class="right exitBtn"><img class="navItem right" src="./assets/exit.png" alt="exit"></button>
        <router-link to="/connect" class="right"><img class="navItem right" src="./assets/user.png" alt="user"></router-link> -->
  </nav>

  <router-view/>
</template>

<script>
  import Cookies from "js-cookie";

export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      logged : Cookies.get('HaToken')
    }
  },
  methods: {
      disconnect(){
        this.$store.dispatch("disconectUser");
      }
  },
}
</script>

<style>
body{
  background-color: rgb(49, 49, 49);
  animation: 0.2s;
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
.exitBtn{
  background-color: rgba(5, 5, 5, 0);
  border: none;
}

</style>
