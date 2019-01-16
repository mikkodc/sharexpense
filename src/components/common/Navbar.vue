<template lang="html">
  <v-toolbar dark color="teal">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Sharexpense</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-if="isLoggedIn" to="/">Home</v-btn>
      <v-btn flat v-if="!isLoggedIn" to="/">Login</v-btn>
      <v-btn flat v-if="!isLoggedIn" to="/sign-up">Sign Up</v-btn>
      <v-btn v-if="isLoggedIn" @click="logOut">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
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
