<template>
  <div v-for="(ressource) in recipe" class="test">
    <div class="resource">
      <div  class="resourceFlex">
    <div class="name item">{{Object.keys(ressource)[0]}}</div>
    <div class="quantity item">x{{Object.values(ressource)[0].quantity}}</div>
    </div>
    <div class="update" v-if="!this.edit">
      <div class="price" @click="this.edit=this.props.update.ressource_id"  >Price : {{this.props.update.price}} k</div>
        <div class="infoDate">Last update : {{this.props.update.created_at}}</div>
    </div>
      <div class="update" v-if="this.edit==this.props.update.ressource_id">
            <input type="text" class="priceInput" placeholder="Price..">
            <div class="myBtn">
              <button class="valid btn">✓</button>
              <button class="cancel btn"  @click="this.edit= false">X</button>
            </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'recipeCompo',
  props:{
      recipe:Array,
      update:Object,
  },
  data(){
    
    return{
      edit:false,
    }
  },
  methods: {
    // up_resource(ressource){
    //   this.$store.dispatch("update_ressource",Object.values(ressource)[0].ankamaId)
    //   this.update.push(this.$store.getters.getUpdateResource)
    //   return this.update
    // }
  },
  async mounted() {
    for(let i in this.recipe){
      let id = Object.values(this.recipe[i])[0].ankamaId;
      console.log(id);
      await this.$store.dispatch("update_ressource",id)
     let allUpdate = await this.$store.getters.getUpdateResource
     console.log(allUpdate);
     for (i in allUpdate){
        console.log(allUpdate[i].ressource_id);
        if(allUpdate[i].ressource_id==id){
          this.props.update = allUpdate[i];
        }
     }
    }
    return this.props.update
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
