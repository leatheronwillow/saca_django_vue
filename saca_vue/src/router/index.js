import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import HomeView from "../views/HomeView.vue";
import ShopView from "../views/ShopView.vue";
import ProductView from "../views/ProductView.vue";
import CategoryView from "../views/CategoryView.vue";
import SearchView from "../views/SearchView.vue";
import CartView from "../views/CartView.vue";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import MyAccountView from "../views/MyAccountView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import SuccessView from "../views/SuccessView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/shop",
    name: "shop",
    component: ShopView,
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/cart/success",
    name: "success",
    component: SuccessView,
  },
  {
    path: "/cart/checkout",
    name: "checkout",
    component: CheckoutView,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/shop/:category_slug/:product_slug",
    name: "product",
    component: ProductView,
  },
  {
    path: "/shop/:category_slug",
    name: "category",
    component: CategoryView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/myaccount",
    name: "myaccount",
    component: MyAccountView,
    meta: {
      requireLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
