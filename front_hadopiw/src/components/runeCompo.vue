<template>
    <div class="rune" v-if="this.rune!=undefined">
        <div class="name">
            {{this.rune.name}}
        </div>
        <template v-if="this.$store.getters.getUpdateResource[this.rune.name]">
            <div class="runeInfo" v-if="!this.edit">
            <div class="price">
            Price : {{this.$store.getters.getUpdateResource[this.rune.name].price}} k
        </div>
        <div class="date">
           Last update : {{this.$store.getters.getUpdateResource[this.rune.name].created_at}}
        </div>
        <div class="edit" @click="this.edit=this.rune.ankamaId">
            <img class="imgEdit" src="../assets/edit.png" alt="editBtn">
        </div>
        </div>
        <div class="runeEdit" v-if="this.edit==this.rune.ankamaId">
        <input type="text" class="priceInput" placeholder="Price..">
        <button class="btn valid" @click="up_resource()">✓</button>
        <button class="btn cancel" @click="this.edit=false">X</button>
        </div>
        </template>
        <template v-if="!this.$store.getters.getUpdateResource[this.rune.name]">
                <div class="unknown" v-if="this.edit==false">
                    Unknown price 
                    <button class="btn valid" @click="this.edit=this.rune.ankamaId">+</button>
                </div>
                <div class="runeEdit" v-if="this.edit==this.rune.ankamaId">
                    <input type="text" class="priceInput" placeholder="Price..">
                    <button class="btn valid" @click="up_resource()">✓</button>
                    <button class="btn cancel" @click="this.edit=false">X</button>
                </div>
        </template>
    </div>
</template>

<script>
export default {
  name: 'runeCompo',
  props:{
      rune:Object,
  },
  data(){
        if (this.rune!=undefined) {
        let res= {ankamaId:this.rune.ankamaId,
        name:this.rune.name}
        this.$store.dispatch("getUpdate_ressource",res)
        }
    return{
        edit:false
    }
  },
  methods: {
        up_resource(){
            // console.log("up");
        // console.log(Object.values(resource)[0].ankamaId);
        let priceInput = document.querySelector(".priceInput").value
        // console.log(priceInput);
        let result = {name:this.rune.name,ressource_id:this.rune.ankamaId,price:priceInput}
        this.$store.dispatch("postUpdate_ressource",result)
        this.edit= false
    },
  },
  // mounted(){

  //     if(this.$store.getters.getUpdateResource[Object.keys(this.resource)[0]]){
  //       console.log("in");
  //     this.$emit('updateRessource',{price : this.$store.getters.getUpdateResource[Object.keys(this.resource)[0]].price, quantity:Object.values(this.resource)[0].quantity})
  //   } else {
  //     console.log("none");
  //     this.$emit('updateRessource',undefined)
  //   }
  // }
  
}
</script>



<style scoped>
.rune{
    margin: 5px;
    background-color: rgba(255, 255, 255, 0.068);;
    border-radius: 5px;
    width: 25vw;
}
.runeInfo{
    display: flex;
    margin: 10px;
    justify-content: space-between;
}
.priceInput{
  outline: none;
  border-radius: 3px;
  background-color: rgba(146, 146, 146, 0.63);
  color: rgb(41, 41, 41);
  border: none;
  margin-bottom: 5px;
}
.btn{
  margin: 3px;
  width: 20px;
  height: 25px;
  color: white;
  border: none;
  border-radius: 3px;
}
.valid{
  background-color: rgb(23, 138, 28);
}
.imgEdit{
    width: 15px;
}

.editBtn{
    background-color: rgba(0, 0, 0, 0);
    border: none;
}

.cancel{
  background-color: rgb(160, 20, 20);
  
}
.priceInput::placeholder {
  color: rgb(58, 58, 58);
}
/* animations */

.imgEdit:hover{
    filter: drop-shadow(0 0 0.5rem rgb(255, 255, 255));
}

.btn:hover{
  filter: brightness(1.2)
}

</style>
