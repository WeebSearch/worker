import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    path: "/login",
    name: "Login",
    component: Login
  }]
})
