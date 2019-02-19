<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-subheader>Monkeys<v-spacer></v-spacer>
      <v-btn flat color="teal" to="/add-monkey">Add Monkey</v-btn></v-subheader>

      <v-list two-line v-if="monkeys.length != 0">
        <template v-for="(monkey, index) in monkeys">
          <v-list-tile :key="monkey.first_name" @click="">
            <v-list-tile-content>
              <v-list-tile-title v-html="monkey.first_name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="monkey.email"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">edit</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
  </v-layout row>
</template>

<script>
import db from "../firebaseInit";
import firebase from "firebase";

export default {
  name: "dashboard",
  data: () => ({
    monkeys: []
  }),
  methods: {},
  created() {
    db.collection("sharedMonkey")
      .where("monkeyBelongsTo", "==", this.$store.state.currentUser.userId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          db.collection("people")
            .where(firebase.firestore.FieldPath.documentId(), "==", doc.data().monkeyId)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(i => {
                const data = {
                  id: i.id,
                  first_name: i.data().first_name,
                  last_name: i.data().last_name,
                  email: i.data().email
                };
                this.monkeys.push(data);
              });
            });
        });
      });
  }
};
</script>
