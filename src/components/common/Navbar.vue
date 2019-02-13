<template lang="html">
  <div>
    <v-navigation-drawer fixed app v-model="drawer">
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed app color="teal">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
      drawer: false,
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
