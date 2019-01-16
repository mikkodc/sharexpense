import firebase from 'firebase';
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

let app = '';

firebase.initializeApp({
  apiKey: "AIzaSyB2pvfIfrZJ7eKOOPP7bDo4nbhka3lBPhg",
  authDomain: "share-expense-c8519.firebaseapp.com",
  databaseURL: "https://share-expense-c8519.firebaseio.com",
  projectId: "share-expense-c8519",
  storageBucket: "",
  messagingSenderId: "261585604660"
});

firebase.auth().onAuthStateChanged(()=> {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
