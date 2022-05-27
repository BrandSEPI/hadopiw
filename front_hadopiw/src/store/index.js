import { createStore } from "vuex";
import router from "../router/index";

let url = "https://fr.dofus.dofapi.fr/";
let api = "http://127.0.0.1:8000/api/";

const store = createStore({
  state: {
    user: null,
    items: null,
    selected_item: {
      _id: 70,
      ankamaId: 70,
      name: "Amulette du Hibou",
      level: 8,
      type: "Amulette",
      imgUrl:
        "https://s.ankama.com/www/static.ankama.com/dofus/www/game/items/200/1001.png",
      url: "https://www.dofus.com/fr/mmorpg/encyclopedie/equipements/70-amulette-hibou",
      description: "Cette amulette augmente l'intelligence de son porteur.",
      statistics: [
        {
          Intelligence: {
            min: 10,
            max: 13,
          },
        },
      ],
      recipe: [
        {
          "Bave de Bouftou": {
            ankamaId: 385,
            url: "https://www.dofus-touch.com/fr/mmorpg/encyclopedie/ressources/385-bave-bouftou",
            imgUrl:
              "https://s.ankama.com/www/static.ankama.com/dofus/www/game/items/52/15057.w48h48.png",
            type: "Ressources diverses",
            level: 7,
            quantity: 3,
          },
        },
        {
          "Relique d'Incarnam": {
            ankamaId: 16524,
            url: "https://www.dofus-touch.com/fr/mmorpg/encyclopedie/ressources/16524-relique-incarnam",
            imgUrl:
              "https://s.ankama.com/www/static.ankama.com/dofus/www/game/items/52/164068.w48h48.png",
            type: "Ressources diverses",
            level: 5,
            quantity: 3,
          },
        },
      ],
      setId: 0,
    },
    ressources: null,
    selected_ressource: null,
    update_item: {
      item_id: "70",
      price: "58000",
      coef: "113",
      updated_at: "2022-05-25T09:03:13.000000Z",
      created_at: "2022-05-25T09:03:13.000000Z",
      id: 1,
    },
    update_ressource: [],
  },

  // ---------- GETTER -------------------------------------------------------------------------------------------------------
  getters: {
    getUser(state) {
      return state.user;
    },
    getAllItems(state) {
      return state.items;
    },
    getItem(state) {
      return state.selected_item;
    },
    getAllRessources(state) {
      return state.ressources;
    },
    getRessource(state) {
      return state.selected_ressource;
    },
    getUpdateResource(state) {
      return state.update_ressource;
    },
    getIdItem(name, state) {
      for (item in state.items) {
        log;
      }
    },
  },

  // ---------- MUTATION -----------------------------------------------------------------------------------------------------
  mutations: {
    addItems(state, json) {
      // location.href = "/itemCalculator";
      console.log(json);
      state.items = json;
      router.push({ name: "itemCalculator" });
    },
    selectItem(state, item) {
      state.selected_item = item;
    },
    addRessources(state, json) {
      state.ressources = json;
    },
    selectRessource(state, ressource) {
      state.selected_ressource = ressource;
    },
    pushUpdateRessource(state, res) {
      let name = res.name;
      console.log(res.name);
      if (res.update != undefined) {
        let str = res.update.created_at.split("T");
        let hour = str[1].split(".")[0];
        res.update.created_at = `${str[0]} - ${hour}`;
      }

      state.update_ressource[name] = res.update;
      console.log(state.update_ressource);
    },
    clearItems(state) {
      state.items = null;
    },
    clearSelectItem(state) {
      state.SelectItem = null;
    },
    clearSelectRessource(state) {
      state.selectRessource = null;
    },
    clearUpdateRessource(state) {
      state.update_ressource = [];
    },
  },

  // ---------- ACTION -------------------------------------------------------------------------------------------------------
  actions: {
    async getAllItems({ commit }) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(url + "equipments/", requestOptions)
        .then((response) => response.json())
        .then((result) => commit("addItems", result))
        .catch((error) => console.log("error", error));
    },
    getAllRessources({ commit }) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(url + "resources/", requestOptions)
        .then((response) => response.json())
        .then((result) => commit("addRessources", result))
        .catch((error) => console.log("error", error));
    },
    select_item({ commit }, item_id) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(url + "equipments/" + item_id, requestOptions)
        .then((response) => response.json())
        .then((result) => commit("selectItem", result))
        .catch((error) => console.log("error", error));
    },

    getUpdate_ressource({ commit }, res) {
      var myHeaders = new Headers();
      console.log(res.ankamaId);
      myHeaders.append("ressource_id", res.ankamaId);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(api + "ressources/display", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          let resourceResult = { name: res.name, update: result[0] };
          console.log(resourceResult);
          commit("pushUpdateRessource", resourceResult);
          return resourceResult;
        })
        .catch((error) => console.log("error", error));
    },
    postUpdate_ressource({ commit }, res) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("ressource_id", res.ressource_id);
      urlencoded.append("price", res.price);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(api + "ressources", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          let resourceResult = { name: res.name, update: result[0] };
          console.log(resourceResult);
          commit("pushUpdateRessource", resourceResult);
          return resourceResult;
        })
        .catch((error) => console.log("error", error));
    },
  },
});

export default store;
