<template lang="html">
  <div id="nav">
    <router-link v-if="isLoggedIn" to="/">Home</router-link>
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    <router-link v-if="!isLoggedIn" to="/sign-up">Sign Up</router-link>
    <a href="" v-if="isLoggedIn" @click="logOut">Log Out</a>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
    }
  },
  created() {
    if(firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logOut: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/login');
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
