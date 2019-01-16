import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";

import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp,
      meta: {
        requiresGuest: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if(currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
