<template>
  <v-layout justify-start align-space-betwee column>
    <v-form v-model="valid">
      <v-text-field
        v-model="amount"
        :rules="amount"
        prepend-icon="payment"
        label="Amount"
        required
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Picker in dialog"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <v-select
        label="Category"
        prepend-icon="adjust"
        required
      ></v-select>
      <v-text-field
        v-model="description"
        :rules="description"
        prepend-icon="subject"
        label="Description"
      ></v-text-field>
    </v-form>
  </v-layout>
</template>

<script>
import db from '../components/firebaseInit';

export default {
  name: "add-transaction",
  created() {
    db.collection('people').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id' => doc.id,
          'first_name' => doc.data().first_name,
          'last_name' => doc.data().last_name
          'email' => doc.data().email
        }
      })
    })
  },
  data: () => ({
    amount: '',
    category: '',
    description: '',
    people: [],
    date: new Date().toISOString().substr(0, 10),
    modal: false,
  })
};
</script>
