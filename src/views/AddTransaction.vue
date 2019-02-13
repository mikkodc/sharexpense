<template>
  <v-layout justify-start align-space-betwee column>
    <v-form @submit.prevent="addTransaction">
      <v-text-field v-model="amount" prepend-icon="payment" label="Amount" @input="updateAmount" required clearable></v-text-field>
      <v-autocomplete v-model="selectedPeople" :items="people" label="People" prepend-icon="people" item-text="first_name"
      item-value="id" color="teal" multiple chips	@input="updateAmount">
        <!-- Selection -->
        <template slot="selection" slot-scope="data">
          <v-chip :selected="data.selectedPeople" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
            <v-avatar
                class="teal white--text"
                v-text="data.item.first_name.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item.first_name }}
          </v-chip>
        </template>

        <!-- Item -->
        <template slot="item" slot-scope="data">
          <v-list-tile-avatar color="teal">
            <img v-if="data.item.avatar" :src="data.item.avatar">
            <v-icon dark v-else>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.first_name + ' ' +  data.item.last_name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="data.item.email"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>

        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Add New</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-autocomplete>

      <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
        <v-text-field slot="activator" v-model="date" label="Picker in dialog" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="date" color="teal" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <!-- <v-select
        label="Category"
        prepend-icon="adjust"
        color="teal"
        required
      ></v-select> -->
      <v-text-field v-model="description" prepend-icon="subject" label="Description"></v-text-field>

      <p v-if="splitAmount != null"><b>Amount per Monkey:</b> {{ splitAmount }}</p>
      <v-btn dark color="teal" type="submit">Save</v-btn>
      <v-btn>Cancel</v-btn>
    </v-form>
  </v-layout>
</template>

<script>
import db from '../components/firebaseInit';
import firebase from 'firebase';

export default {
  name: "add-transaction",
  data: () => ({
    amount: '',
    splitAmount: null,
    category: '',
    description: '',
    people: [],
    selectedPeople: [],
    date: new Date().toISOString().substr(0, 10),
    modal: false,
  }),
  computed: {
    formDate() {
      const timestamp = new Date(this.date + "T00:00:00");
      return timestamp;
    }
  },
  methods: {
    addTransaction() {
      db.collection('transactions').add({
        transOwner: this.$store.state.currentUser.userId,
        totalAmount: this.amount,
        description: this.description,
        date:  firebase.firestore.Timestamp.fromDate(this.formDate)
      }).then(docRef => {
        this.selectedPeople.forEach((doc) => {
          db.collection('sharedTransactions').add({
            paid: false,
            splitOwner: doc,
            transId: docRef.id
          });
        });
        this.$router.push('/');
      }).catch(error => {
        console.log(error);
      });
    },
    updateAmount() {
      if(this.selectedPeople.length > 0) {
        this.splitAmount = this.amount / (this.selectedPeople.length + parseInt(1));
      } else {
        this.splitAmount = null;
      }
    },
  },
  created() {
    db.collection('people').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'first_name': doc.data().first_name,
          'last_name': doc.data().last_name,
          'email': doc.data().email
        }
        this.people.push(data)
      })
    })
  },
};
</script>
