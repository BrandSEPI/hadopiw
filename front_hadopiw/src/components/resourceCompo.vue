<template>
{{this.$store.getters.getUpdateResource}}
    <div class="resource">
        <div  class="resourceFlex">
            <div class="name item">{{Object.keys(resource)[0]}}</div>
                 <div class="quantity item">x{{Object.values(resource)[0].quantity}}</div>
            </div >
            <template v-if="this.$store.getters.getUpdateResource[Object.keys(resource)[0]]">
                <div class="update" v-if="!this.edit">
                    <div class="price" @click="this.edit=Object.values(resource)[0].ankamaId"  >Price : {{this.$store.getters.getUpdateResource[Object.keys(resource)[0]].price}} k</div>
                        <div class="infoDate">Last update : {{this.$store.getters.getUpdateResource[Object.keys(resource)[0]].created_at}}</div>
                </div>
                <div class="update" v-if="this.edit==Object.values(resource)[0].ankamaId">
                    <input type="text" class="priceInput" placeholder="Price..">
                    <div class="myBtn">
                        <button class="valid btn"  @click="up_resource(resource)">✓</button>
                        <button class="cancel btn"  @click="this.edit= false">X</button>
                    </div>
                </div> 
            </template>
            <template v-if="this.$store.getters.getUpdateResource[Object.keys(resource)[0]]==undefined">
                <div class="unknown" v-if="this.edit!=Object.values(resource)[0].ankamaId">
                    Unknown, you can add the information by clique on this button -->
                    <button class="btn valid" @click="this.edit=Object.values(resource)[0].ankamaId">+</button>
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
    let id = Object.values(this.resource)[0].ankamaId
    let res= {ankamaId:id,
    name:Object.keys(this.resource)[0]}
    this.$store.dispatch("getUpdate_ressource",res)
    return{
      edit:false,
    //   ressource:null,
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
    }
  },
  async mounted() {
  },
  
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
.resource{
  background-color: rgba(255, 255, 255, 0.068);
  margin: 15px 0px;
  border-radius: 15px;
  padding: 3px 15px;
}
.priceInput{
  outline: none;
  border-radius: 12px;
  background-color: rgba(146, 146, 146, 0.63);
  color: rgb(41, 41, 41);
  border: none;
  margin-bottom: 5px;
}
.btn{
  margin: 3px;
  width: 2vw;
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
.priceInput::placeholder {
  color: rgb(58, 58, 58);
}
/* amulette du granduk */
</style>
