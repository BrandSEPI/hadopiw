import { createStore } from "vuex";
// import router from "../router/index";
import Cookies from "js-cookie";

let url = "https://fr.dofus.dofapi.fr/";
let api = "http://127.0.0.1:8000/api/";

const store = createStore({
  state: {
    user: null,
    items: null,
    selected_item: null,
    ressources: null,
    selected_ressource: null,
    update_item: null,
    update_ressource: [],
    history: [
      {
        id: 5,
        item_id: "2469",
        coef: "60",
        price: "10",
        created_at: "2022-06-03T01:56:53.000000Z",
        updated_at: "2022-06-03T01:56:53.000000Z",
      },
      {
        id: 6,
        item_id: "2469",
        coef: "696969",
        price: "42",
        created_at: "2022-06-03T02:34:55.000000Z",
        updated_at: "2022-06-03T02:34:55.000000Z",
      },
      {
        id: 7,
        item_id: "2469",
        coef: "1",
        price: "1",
        created_at: "2022-06-03T02:36:15.000000Z",
        updated_at: "2022-06-03T02:36:15.000000Z",
      },
      {
        id: 8,
        item_id: "2469",
        coef: "10",
        price: "10",
        created_at: "2022-06-03T02:36:55.000000Z",
        updated_at: "2022-06-03T02:36:55.000000Z",
      },
      {
        id: 9,
        item_id: "2469",
        coef: "6",
        price: "5",
        created_at: "2022-06-03T02:37:27.000000Z",
        updated_at: "2022-06-03T02:37:27.000000Z",
      },
      {
        id: 10,
        item_id: "2469",
        coef: null,
        price: "0",
        created_at: "2022-06-03T02:40:31.000000Z",
        updated_at: "2022-06-03T02:40:31.000000Z",
      },
      {
        id: 12,
        item_id: "2469",
        coef: "123",
        price: "789",
        created_at: "2022-06-07T14:16:18.000000Z",
        updated_at: "2022-06-07T14:16:18.000000Z",
      },
    ],
    runes: null,
    total: 0,
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
    getUpdateItem(state) {
      return state.update_item;
    },
    getAllRunes(state) {
      return state.runes;
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
    getTotal(state) {
      return state.total;
    },
    getHistory(state){
      return state.history
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
      // console.log(json);
      state.items = json;
      // router.push({ name: "itemCalculator" });
    },
    selectItem(state, item) {
      state.selected_item = item;
      // console.log(state.selected_item);
    },
    addRessources(state, json) {
      state.ressources = json;
    },
    selectRessource(state, ressource) {
      state.selected_ressource = ressource;
    },
    pushUpdateRessource(state, res) {
      // console.log(res);
      let name = res.name;
      // console.log(res.name);
      if (res.update != undefined) {
        let str = res.update.created_at.split("T");
        let hour = str[1].split(".")[0];
        res.update.created_at = `${str[0]} - ${hour}`;
      }

      state.update_ressource[name] = res.update;
    },

    clearSelectRessource(state) {
      state.selectRessource = null;
    },
    clearUpdateRessource(state) {
      // console.log(state.update_ressource);
      // console.log("clear !");
      state.update_ressource = [];
      // console.log(state.update_ressource);
    },

    pushUpdateItem(state, res) {
      // console.log(res);
      if (res.created_at != undefined) {
        let str = res.created_at.split("T");
        let hour = str[1].split(".")[0];
        res.created_at = `${str[0]} - ${hour}`;
      }

      state.update_item = res;
      // console.log(state.update_item);
    },
    clearItems(state) {
      state.items = null;
    },
    clearSelectItem(state) {
      state.SelectItem = null;
    },
    clearUpdateItem(state) {
      state.update_item = null;
    },
    clearTotal(state) {
      state.total = 0;
    },

    pushRunes(state, runesList) {
      // console.log(runesList);
      state.runes = runesList;
    },
    totalMutation(state, resource) {
      // console.log(state.selected_item.recipe);
      for (let i in state.selected_item.recipe) {
        // console.log(Object.keys(state.selected_item.recipe[i]));
        if (resource.name == Object.keys(state.selected_item.recipe[i])) {
          // console.log(typeof resource.update.price);
          // console.log(typeof Object.values(state.selected_item.recipe[i])[0].quantity);
          let price =
            parseInt(resource.update.price) *
            Object.values(state.selected_item.recipe[i])[0].quantity;
          // console.log(price);
          state.total += price;
        }
      }
    },

    connectUser(state, userObject) {
      // console.log(userObject);
      state.user = userObject;
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
        .then((result) => {
          commit("addRessources", result);
          let runesList = [];
          for (let i in result) {
            let resource = result[i];
            if (resource.type == "Rune de forgemagie") {
              // console.log(resource);
              runesList.push(resource);
            }
          }
          commit("pushRunes", runesList);
        })
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

    select_resource({ commit }, resource_id) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(url + "resources/" + resource_id, requestOptions)
        .then((response) => response.json())
        .then((result) => commit("selectRessource", result))
        .catch((error) => console.log("error", error));
    },

    getUpdate_ressource({ commit }, res) {
      var myHeaders = new Headers();
      // console.log(res.ankamaId);
      myHeaders.append("ressource_id", res.ankamaId);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(api + "ressources/display", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          let resourceResult = { name: res.name, update: result[0] };
          // console.log(resourceResult);
          commit("pushUpdateRessource", resourceResult);
          if (result[0] != undefined) {
            commit("totalMutation", resourceResult);
          }
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
          let resourceResult = { name: res.name, update: result };
          // console.log(resourceResult);
          commit("pushUpdateRessource", resourceResult);
          return resourceResult;
        })
        .catch((error) => console.log("error", error));
    },

    getUpdate_item({ commit }, itemId) {
      // console.log(itemId);
      var myHeaders = new Headers();
      // console.log(itemId);
      myHeaders.append("item_id", itemId);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(api + "items/display", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          commit("pushUpdateItem", result[0]);
          return result;
        })
        .catch((error) => console.log("error", error));
    },

    postUpdate_item({ commit }, res) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("item_id", res.item_id);
      urlencoded.append("coef", res.coef);
      urlencoded.append("price", res.price);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(api + "items", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          commit("pushUpdateItem", result);
          return result;
        })
        .catch((error) => console.log("error", error));
    },
  },

  // -----USER------ACTION--------------------------------------------------------------------------
  createUser({ commit }, userObject) {
    // console.log(userObject);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", userObject.username);
    urlencoded.append("email", userObject.email);
    urlencoded.append("password", userObject.password);

    var requestOptions = {
      // mode: "no-cors",
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    // console.log(requestOptions);
    fetch(api + "users", requestOptions)
      // fetch(`${api}users`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        location.href = "/connect";
      })
      .catch((error) => {
        console.log(error);
        return "error";
      });
  },

  LoginUser({ commit }, userObject) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", userObject.email);
    urlencoded.append("password", userObject.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(api + "login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.user_id);
        Cookies.set("HaToken", JSON.stringify(result), {
          expires: 1,
          path: "./",
          secure: true,
        });
        location.href = "./";
        return result;
      })
      .catch((error) => console.log("error", error));
  },

  disconectUser({ commit }) {
    let cook = Cookies.get("HaToken");
    let userId = cook.user_id;
    console.log(userId);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("id", userId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(api + "logout/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        Cookies.remove("HaToken");
        location.href = "";
      })
      .catch((error) => console.log("error", error));
  },
});

export default store;
