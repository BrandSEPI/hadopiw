<template>
    <div class="resource">
        <div  class="resourceFlex">
            <div @click="goToRessource" class="name item">{{Object.keys(resource)[0]}}</div>
                 <div class="quantity item">x{{Object.values(resource)[0].quantity}}</div>
            </div >
            <template v-if="this.$store.getters.getUpdateResource[Object.keys(resource)[0]]">
                <div class="update toUpdate" v-if="!this.edit">
                    <!-- <div class="upEdit"  @click="this.edit=Object.values(resource)[0].ankamaId">edit</div> -->
                    <button @click="edit=Object.values(resource)[0].ankamaId" class="editBtn"><img class="imgEdit" src="../assets/edit.png" alt=""></button>
                    <div class="upItem price"  >Price : {{this.$store.getters.getUpdateResource[Object.keys(resource)[0]].price}} k</div>
                    <div class="upItem infoDate">Last update : {{this.$store.getters.getUpdateResource[Object.keys(resource)[0]].created_at}}</div>

                </div>
                <div class="update" v-if="this.edit==Object.values(resource)[0].ankamaId">
                    <input type="text" class="priceInput" placeholder="Price..">
                    <div class="myBtn">
                        <button class="valid btn"  @click="up_resource(resource)">✓</button>
                        <button class="cancel btn"  @click="edit= false">X</button>
                    </div>
                </div> 
            </template>
            <template v-if="this.$store.getters.getUpdateResource[Object.keys(resource)[0]]==undefined">
                <div class="unknown" v-if="this.edit!=Object.values(resource)[0].ankamaId">
                    Unknown, you can add the information by clique on this button -->
                    <button class="btn valid" @click="edit=Object.values(resource)[0].ankamaId">+</button>
                </div>
                <div class="update" v-if="this.edit==Object.values(resource)[0].ankamaId">
                    <input type="text" class="priceInput" placeholder="Price..">
                    <div class="myBtn">
                        <button class="valid btn" @click="up_resource(resource)">✓</button>
                        <button class="cancel btn"  @click="this.edit= false">X</button>
                    </div>
                </div>
            </template>
  </div>
</template>

<script>
export default {
  name: 'resourceCompo',
  props:{
      resource:Object,
  },
  data(){
    // console.log(this.resource);
    // console.log(this.$store.getters.getUpdateResource);
    let id = Object.values(this.resource)[0].ankamaId
    let res= {ankamaId:id,
    name:Object.keys(this.resource)[0]}
    this.$store.dispatch("getUpdate_ressource",res)
    // this.$store.commit("totalMutation",this.$store.getters.getUpdateResource[Object.keys(resource)[0]].price);
    // if(this.$store.getters.getUpdateResource[Object.keys(this.resource)[0]]){
    //   this.$emit('updateRessource',{price : this.$store.getters.getUpdateResource[Object.keys(this.resource)[0]].price, quantity:Object.values(this.resource)[0].quantity})
    // } else {
    //   this.$emit('updateRessource',undefined)
    // }

    return{
      edit:false,
      ressourceList:this.$store.getters.getUpdateResource[Object.keys(this.resource)[0]],
      update:null
    }
  },
  methods: {
    up_resource(resource){
        // console.log(Object.values(resource)[0].ankamaId);
        let priceInput = document.querySelector(".priceInput").value
        // console.log(priceInput);
        let result = {name:Object.keys(resource)[0],ressource_id:Object.values(resource)[0].ankamaId,price:priceInput}
        this.$store.dispatch("postUpdate_ressource",result)
        this.edit= false
    },
    goToRessource(){
      console.log("test");
    }
  },
  async mounted(){

  }
  
}
</script>



<style scoped>
.resourceFlex{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item{
  margin: 20px;
}
.update{
  display: flex;
  justify-content: space-between;
}
.upEdit{
  display: none;
  margin: auto;
  font-size: 1.2em;
  color: rgba(59, 59, 59, 0.959);
}
.toUpdate{
  background-color: rgba(255, 255, 255, 0.068);
  border-radius: 5px;
}
.resource{
  background-color: rgba(255, 255, 255, 0.068);
  margin: 15px 0px;
  border-radius: 5px;
  padding: 3px 15px;
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
    width: 25px;
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
