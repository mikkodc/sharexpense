import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {}
  },
  mutations: {
    updateCurUser(state, payload) {
      state.currentUser = payload;
    },
    updateCurUserName(state, payload) {
      state.currentUser.name = payload;
    }
  },
  actions: {
    setCurUser(context, payload) {
      context.commit("updateCurUser", payload);
    }
  }
});
