<template>
        <template v-if="this.$store.getters.getUpdateResource[item.name]!=undefined">
            <div class="itemInfo" v-if="!this.edit">
                <button @click="this.edit=true" class="editBtn"><img class="imgEdit" src="../assets/edit.png" alt=""></button>
            <div class="price">Price : {{this.$store.getters.getUpdateResource[item.name].price}} k</div>
            <div class="infoDate">Last update : {{this.$store.getters.getUpdateResource[item.name].created_at}}</div>
        </div>
            <div class="itemInfo" v-if="this.edit">
                    <input type="text" class="input price" placeholder="price...">
                    <button class="btn valid" @click="up_item()">✓</button>
                    <button class="btn cancel" @click="this.edit=false">X</button>
            </div>
        </template>
        <div  v-if="this.$store.getters.getUpdateResource[item.name]==undefined">
        <div class=" itemInfo unknown" v-if="!this.edit">
                Unknown, you can add the information by clique on this button -->
          <button class="btn valid addBtn" @click="this.edit=true">+</button>
        </div>
        <div class="itemInfo itemEdit" v-if="this.edit">
                    <input type="text" class="input price" placeholder="price...">
                    <button class="btn valid" @click="up_item()">✓</button>
                    <button class="btn cancel" @click="this.edit=false">X</button>
            </div>
        </div>
</template>

<script>
// [item.name].price
// [item.name].created_at
export default {
  name: 'ressourceInfo',
  props:{
      item:Object,
      price:Number,
      infoDate:Date,
  },
  data(){
    this.$store.commit("clearUpdateRessource")
    // console.log(this.item);
    // console.log(this.$store.getters.getUpdateResource);
      this.$store.dispatch("getUpdate_ressource",this.item)
      return{
          found:false,
          edit:false,
      }
  },
  methods: {
      up_item(){
        let priceInput = document.querySelector(".price").value
        // console.log(priceInput);
        let result = {name:this.item.name,ressource_id:this.item.ankamaId,price:priceInput}
        this.$store.dispatch("postUpdate_ressource",result)
        this.edit= false
      },
  },


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
    border-radius: 7px;
}

.imgEdit{
    width: 25px;
}

.editBtn{
    background-color: rgba(0, 0, 0, 0);
    border: none;
}

.btn{
  flex-grow: 1; 
  margin: 3px;
  width: 25px;
  height: 25px;
  color: white;
  border: none;
  border-radius: 5px;
}

.addBtn{
    flex-grow: 0.5;
}
.valid{
  background-color: rgb(23, 138, 28);
}
.cancel{
  background-color: rgb(160, 20, 20);
  
}

.itemEdit{
  width: 100%;
}

.input{
flex-grow: 2;
  outline: none;
  border-radius: 5px;
  margin:0 5px;
  background-color: rgba(146, 146, 146, 0.63);
  color: rgb(41, 41, 41);
  border: none;
  margin-bottom: 5px;
}
.input::placeholder {
  color: rgb(58, 58, 58);
}
/* animation */
.imgEdit:hover{
    filter: drop-shadow(0 0 0.5rem rgb(255, 255, 255));
}

.btn:hover{
  filter: brightness(1.2)
}
</style>