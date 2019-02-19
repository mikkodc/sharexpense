<template>
  <v-layout justify-start align-space-between column>
    <v-form @submit.prevent="addMonkey">
      <v-text-field v-model="first_name" label="First Name" required></v-text-field>
      <v-text-field v-model="last_name" label="Last Name" required></v-text-field>
      <v-text-field type="email" v-model="email" label="Email" required></v-text-field>

      <v-btn dark color="teal" type="submit">Save</v-btn>
      <v-btn @click="goBack">Cancel</v-btn>
    </v-form>
  </v-layout>
</template>

<script>
import db from "../firebaseInit";
import firebase from "firebase";

export default {
  name: "add-transaction",
  data: () => ({
    first_name: '',
    last_name: '',
    email: ''
  }),
  computed: {
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addMonkey() {
      db.collection("people")
        .add({
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email
        })
        .then(docRef => {
          db.collection("sharedMonkey").add({
            monkeyBelongsTo: this.$store.state.currentUser.userId,
            monkeyId: docRef.id
          });
          this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
};
</script>
