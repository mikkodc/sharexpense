import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import App from "./App.vue";

import router from "./router";
import store from "./store";
import firebase from "firebase";

// import './assets/scss/main.scss'

import "./components/firebaseInit";
import "./registerServiceWorker";

Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.config.devtools = true;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      created() {
        const user = firebase.auth().currentUser;
        if (user) {
          this.$store.commit("updateCurUser", {
            userId: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified
          });
        }
      },
      render: h => h(App)
    }).$mount("#app");
  }
});
