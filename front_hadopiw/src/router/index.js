import { createRouter, createWebHistory } from "vue-router";
import homeView from "../views/homeView.vue";
import choice from "../views/choiceView.vue";
import itemCalculator from "../views/itemCalculatorView.vue";
import ressourceCalculator from "../views/ressourceCalculatorView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: homeView,
  },
  {
    path: "/kamasChoice",
    name: "choice",
    component: choice,
  },
  {
    path: "/itemCalculator",
    name: "itemCalculator",
    component: itemCalculator,
  },
  {
    path: "/ressourceCalculator",
    name: "ressourceCalculator",
    component: ressourceCalculator,
  },
  {
    path: "/connect",
    name: "SignInView",
    component: SignInView,
  },
  {
    path: "/createAccount",
    name: "SignUpView",
    component: SignUpView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
