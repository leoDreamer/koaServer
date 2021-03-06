import Vue from "vue";
import Router from "vue-router";
import Hello from "src/components/Hello";
import Index from "src/pages/Index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    }
  ]
});
