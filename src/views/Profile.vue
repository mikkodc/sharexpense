<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-subheader>Edit Profile</v-subheader>
      <v-form @submit.prevent="updateProfile">
        <v-text-field v-model="name" label="Name" required clearable></v-text-field>
        <v-text-field v-model="email" label="Email" disabled></v-text-field>

        <v-btn dark color="teal" type="submit">Save</v-btn>
        <v-btn to="/">Cancel</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import db from "../components/firebaseInit";
import firebase from "firebase";

export default {
  data: () => ({
    name: ""
  }),
  computed: {
    displayName() {
      const displayName = this.$store.state.currentUser.name;
      if (displayName) {
        this.name = displayName;
        return this.name;
      }
    },
    email() {
      return this.$store.state.currentUser.email;
    }
  },
  methods: {
    updateProfile() {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: this.name
        })
        .then(() => {
          alert("Profile successfully updated!");
          this.$store.commit("updateCurUserName", this.name);
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    db.collection("people")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            // 'id': doc.id,
            // 'first_name': doc.data().first_name,
            // 'last_name': doc.data().last_name,
            // 'email': doc.data().email
          };
          // this.people.push(data)
        });
      });
  }
};
</script>
