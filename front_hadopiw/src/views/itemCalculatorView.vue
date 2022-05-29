<template>
    <input class="searchBar" type="text" placeholder="Ex: amulette du granduk">
    <button class ="searchBtn" @click="research">search</button>
   <div class="information" v-if="this.selected!=null">
        <div class="infoTop">
            <h2>{{this.selected.name}}</h2>
            <!-- Er:403 -->
            <!-- <div><img :src="this.$store.state.selected_item.imgUrl" alt="" srcset=""></div> -->
        </div>
        <ItemInfoCompo :price="'10000'" :coef="'95'" :infoDate="'10/12/2000'" />
        <div class="itemBottom">
            <div class="item left">
                <h3 class="collumnName">Recipe :</h3>
            <recipeCompo :recipe="this.selected.recipe"/>
            </div>
            <div class="bar"></div>
            <div class="item right">
                <h3 class="collumnName">Statistics :</h3>
                 <div class="rules">
                     <div>stat</div>
                    <div class="minMax">
                    <span>min</span>
                    <span>max</span>
                    </div>
                </div>
                <statsCompo :allStats="this.selected.statistics"/>
            </div>
        </div>
    </div>
</template>

<script>
import ItemInfoCompo from '../components/itemInfoCompo.vue';
import statsCompo from '../components/statsCompo.vue';
import recipeCompo from '../components/recipeCompo.vue';
export default {
    name: "ItemCalculator",
    components: { ItemInfoCompo,recipeCompo,statsCompo },
    data(){
        // this.$store.commit("clearUpdateRessource")
        let items = this.$store.getters.getAllItems
        console.log(items);
        return {items,
        selected:null}
    },
    methods: {
        research(){
            let value = document.querySelector(".searchBar").value.toLowerCase()
            console.log(this.items);
            for (let i in this.items){
                let name = this.items[i].name.toLowerCase()
                // console.log(this.items[i].name);
                if (value == name){
                    console.log("found");
                    let promise = new Promise((resolve, reject) => {
                        resolve(this.$store.dispatch("select_item",this.items[i]._id));
                    });
                    // console.log(this.items[i]._id);
                    promise.then(()=>{
                        this.selected=this.$store.getters.getItem
                        console.log(this.selected);
                        return this.selected
                    })
                    
                }
            }
            // console.log(value)
        }
    },
    // mounted() {
    //     let items = this.$store.getters.getAllItems
    //     console.log(items);
    //     return {items}
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
    border-radius:15px 0px 0px 15px;
    background-color: rgba(146, 146, 146, 0.63);
    color: rgb(41, 41, 41);
    font-size: 1.5em;
  }
.searchBar::placeholder {
  color: rgb(58, 58, 58);
}
.searchBtn{
     background: linear-gradient(90deg, rgba(146, 146, 146, 0.63) 0%, rgba(41, 41, 41, 0) 50%);
    height: 54px;
    border-radius:0px 15px 15px 0px;
    border: none;
    color: rgb(240, 240, 240);
    font-size: 1.5em;
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
    border-radius: 15px;
}
.itemBottom{
    margin: 50px 0 0 0;
    padding: 20px;
    height: 60vh;
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
    border-radius: 15px 0 0 15px ;

}
.right{
    border-radius: 0 15px 15px 0;

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
    color: rgb(41, 41, 41);
    /* color: rgb(41, 41, 41); */
}
</style>