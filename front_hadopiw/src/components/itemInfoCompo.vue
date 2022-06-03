<template>
        <template v-if="this.$store.getters.getUpdateItem!=null">
            <div class="itemInfo" v-if="!this.edit">
                <button @click="this.edit=true" class="editBtn"><img class="imgEdit" src="../assets/edit.png" alt=""></button>
            <div class="price">Price : {{this.$store.getters.getUpdateItem.price}} k</div>
                <div class="coef">Coef : {{this.$store.getters.getUpdateItem.coef}}%</div>
            <div class="infoDate">Last update : {{this.$store.getters.getUpdateItem.created_at}}</div>
        </div>
            <div class="itemInfo" v-if="this.edit">
                    <input type="text" class="input price" placeholder="price...">
                    <input type="text" class="input coef" placeholder="Coef : can be empty">
                    <button class="btn valid" @click="up_item()">✓</button>
                    <button class="btn cancel" @click="this.edit=false">X</button>
            </div>
        </template>
        <!-- <div class="itemInfo" v-if="this.$store.getters.getUpdateItem.item_id==null">
        <div class="unknown" v-if="!this.edit">
                Unknown, you can add the information by clique on this button -->
            <!-- <button class="btn valid" @click="this.edit=Object.values(resource)[0].ankamaId">+</button>
        </div>
        </div> --> -->
</template>

<script>

export default {
  name: 'itemInfo',
  props:{
      item:Number,
      price:Number,
      coef:Number,
      infoDate:Date,
      found:Boolean,
      edit:Boolean,
  },
  data(){
    // this.$store.commit("clearUpdateItem")
    console.log(this.item);
    // console.log("test");
      this.$store.dispatch("getUpdate_item",this.item)
      return{
          found:false,
          edit:false,
      }
  },
  methods: {
      up_item(){
        let priceInput = document.querySelector(".price").value
        let coefInput = document.querySelector(".coef").value
        // console.log(priceInput);
        let result = {item_id:this.item,price:priceInput,coef:coefInput}
        this.$store.dispatch("postUpdate_item",result)
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
.valid{
  background-color: rgb(23, 138, 28);
}
.cancel{
  background-color: rgb(160, 20, 20);
  
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
</style>