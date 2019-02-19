<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-subheader>Transactions</v-subheader>
      <v-list two-line v-if="transactions.length != 0">
        <template v-for="(transaction, index) in transactions">
          <v-list-tile :key="transaction.description" @click="">
            <v-list-tile-content>
              <v-list-tile-title v-html="transaction.description"></v-list-tile-title>
              <v-list-tile-sub-title v-html="transaction.totalAmount"></v-list-tile-sub-title>
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
import db from "../components/firebaseInit";
import firebase from "firebase";

export default {
  name: "dashboard",
  data: () => ({
    transactions: []
  }),
  methods: {},
  created() {
    db.collection("transactions")
      .where("transOwner", "==", this.$store.state.currentUser.userId)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            date: doc.data().date,
            description: doc.data().description,
            totalAmount: doc.data().totalAmount
          };
          this.transactions.push(data);
        });
      });
  }
};
</script>
