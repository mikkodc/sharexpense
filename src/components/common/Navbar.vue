<template lang="html">
  <div>
    <v-toolbar dark color="teal">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <!-- <v-toolbar-title>Sharexpense</v-toolbar-title> -->
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat v-if="!isLoggedIn" to="/">Login</v-btn>
      <v-btn flat v-if="!isLoggedIn" to="/sign-up">Sign Up</v-btn>
      <!-- <v-btn v-if="isLoggedIn" @click="logOut">Log Out</v-btn> -->
      <v-menu offset-y transition="slide-y-transition">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="logOut">
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
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
        sheet = false;
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
