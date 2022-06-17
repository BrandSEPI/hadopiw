<template>
    <input class="searchBar" type="text" placeholder="Ex: Rune Ga Pa">
    <button class ="searchBtn" @click="research">search</button>
   <!-- <template v-if="selected_resource==undefined"> -->
     <div class="information" v-if="this.$store.getters.getRessource!=null">
        <div class="infoTop">
            <h2>{{this.$store.getters.getRessource.name}}</h2>
            <!-- Er:403 -->
            <!-- <div><img :src="this.$store.state.selected_item.imgUrl" alt="" srcset=""></div> -->
        </div>
        <resourceInfoCompo :item="this.$store.getters.getRessource"  :key="this.$store.getters.getRessource.ankamaId"/>
    </div>
   <!-- </template> -->
</template>

<script>


// <template v-if="selected_resource">
//    <div class="information" v-if="this.$store.getters.getRessource!=null">
//         <div class="infoTop">
//             <h2>{{this.selected_resource.name}}</h2>
//             <!-- Er:403 -->
//             <!-- <div><img :src="this.$store.state.selected_item.imgUrl" alt="" srcset=""></div> -->
//         </div>
//         <resourceInfoCompo :item="this.selected_resource.ankamaId"  :key="this.selected_resource.ankamaId"/>
//     </div>
//    </template>
import resourceInfoCompo from '../components/resourceInfoCompo.vue';

export default {
    name: "ressourceCalculator",
    components: { resourceInfoCompo},
    props:{
      // selected_resource:Object,
  },
    data(){
        
        // console.log(this.$store.getters.getItem);
        // console.log(items);
        return {resources:null,
        selected:null,
        loading:null,}
    },
    methods: {
        research(){
          // this.selected_resource=undefined;
            let value = document.querySelector(".searchBar").value.toLowerCase()
            console.log(value);
            console.log(this.$store.getters.getAllRessources);
            for (let i in this.$store.getters.getAllRessources){
                let name = this.$store.getters.getAllRessources[i].name.toLowerCase()
                // console.log(this.items[i].name);
                if (value == name){
                    console.log("found");
                    this.$store.dispatch("select_resource",this.$store.getters.getAllRessources[i]._id)
                    
                }
            }
            // console.log(value)
        },
    },
    async mounted() {
        await this.$store.dispatch("getAllRessources");
        // this.$store.commit("clearUpdateRessource")
        this.resources = this.$store.getters.getAllRessources
        return this.resources
    },
    // computed(){

    //     this.select_item=this.$store.state.selected_item.then(console.log("changed"))
    // },

}
</script>



<style scoped>
.information{
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.searchBar{
    outline: none;
    padding: 2px 30px;
    width: 80%;
    margin: 20px auto;
    height: 50px;
    border: none;
    border-radius:3px;
    background-color: rgba(146, 146, 146, 0.63);
    color: rgb(41, 41, 41);
    font-size: 1.5em;
  }
.searchBar::placeholder {
  color: rgb(58, 58, 58);
}
.searchBtn{
    height: 54px;
    border-radius:3px;
    border: none;
    font-size: 1.5em;
    background: rgba(105, 105, 105, 0.63);
    /* background: linear-gradient(90deg, rgba(146, 146, 146, 0.63) 0%, rgba(41, 41, 41, 0) 50%); */
    color: rgb(41, 41, 41);
}

.infoTop{
    color: aliceblue;
    font-size: 1.05em;
    display: flex;
    justify-content: center;
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
.itemBottom{
    margin: 50px 0 0 0;
    padding: 20px;
    height: 100%;
    /* background-color: brown; */
    display: flex;
    justify-content: space-around;
    color: white;
}
.bar{
    margin: auto 0;
    background-color: rgba(255, 255, 255, 0.63);
    height: 100%;
    width: 4px;
}

.left{
    border-radius: 5px 0 0 5px ;

}
.right{
    border-radius: 0 5px 5px 0;

}
.item{
    width: 45vw;
    background-color: rgb(58, 58, 58);
    padding:0 2vw ;
}
.collumnName{
    margin-bottom: 6vh;
}
.rules{
    display: flex;
    justify-content: space-between;
    font-size: 1.07em;
    margin:  0 0 20px 0;
}
.minMax{
    margin-left: auto;
}
.minMax>span{
    padding: 2px
}




/* Animations */

.searchBtn:hover{
     background: rgba(146, 146, 146, 0.63);
    /* background: linear-gradient(90deg, rgba(146, 146, 146, 0.63) 0%, rgba(41, 41, 41, 0) 50%); */
    color: rgb(240, 240, 240);
    /* color: rgb(41, 41, 41); */
}
</style>