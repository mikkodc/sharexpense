import Vue from "vue";
import Router from "vue-router";

import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import Profile from "@/views/Profile.vue";

import Monkeys from "@/components/monkeys/IndexMonkey.vue";
import AddMonkey from "@/components/monkeys/AddMonkey.vue";

import AddTransaction from "@/views/AddTransaction.vue";

import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    // Authentication
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
    // Profile
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    // Transactions
    {
      path: "/add-transaction",
      name: "AddTransaction",
      component: AddTransaction,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/monkeys/",
      name: "Monkeys",
      component: Monkeys,
      meta: {
        requiresAuth: true
      },
      children: [
        { path: 'add', component: AddMonkey },
      ]
    },
    {
      path: "/add-monkey",
      name: "AddMonkey",
      component: AddMonkey,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (currentUser) {
      next({
        path: "/",
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
