import { createStore } from "vuex";
import router from "../router/index";
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
      console.log(state.selected_item);
    },
    addRessources(state, json) {
      state.ressources = json;
    },
    selectRessource(state, ressource) {
      state.selected_ressource = ressource;
    },
    pushUpdateRessource(state, res) {
      let name = res.name;
      // console.log(res.name);
      if (res.update != undefined) {
        let str = res.update.created_at.split("T");
        let hour = str[1].split(".")[0];
        res.update.created_at = `${str[0]} - ${hour}`;
      }

      state.update_ressource[name] = res.update;
      // console.log(state.update_ressource);
    },

    clearSelectRessource(state) {
      state.selectRessource = null;
    },
    clearUpdateRessource(state) {
      state.update_ressource = [];
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

    connectUser(state, userObject) {
      console.log(userObject);
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
          console.log(resourceResult);
          commit("pushUpdateRessource", resourceResult);
          return resourceResult;
        })
        .catch((error) => console.log("error", error));
    },

    getUpdate_item({ commit }, itemId) {
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
        console.log(result.user_id);
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
