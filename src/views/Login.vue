<template lang="html">
  <v-container>
    <v-card class="elevation-12">
      <v-toolbar dark color="teal">
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field prepend-icon="person" name="email" v-model="email" label="Email" type="text"></v-text-field>
          <v-text-field prepend-icon="lock" name="password" v-model="password" label="Password" type="password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="teal" dark @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        () => {
          alert('Well done! You are now connected');
          this.$router.push('/');
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style lang="css" scoped>
</style>
