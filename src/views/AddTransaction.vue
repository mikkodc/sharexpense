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
      <v-select v-model="selectedPeople" :items="people" label="People" multiple>

        <v-divider
          slot="append-item"
          class="mb-2"
        ></v-divider>
        <v-list-tile
          slot="append-item"
          disabled
        >
          <v-list-tile-avatar color="grey lighten-3">
            <v-icon>mdi-food-apple</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content v-if="likesAllFruit">
            <v-list-tile-title>Holy smokes, someone call the fruit police!</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-content v-else-if="likesSomeFruit">
            <v-list-tile-title>Fruit Count</v-list-tile-title>
            <v-list-tile-sub-title>{{ selectedFruits.length }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-content v-else>
            <v-list-tile-title>
              How could you not like fruit?
            </v-list-tile-title>
            <v-list-tile-sub-title>
              Go ahead, make a selection above!
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-select>
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
          'id': doc.id,
          'first_name': doc.data().first_name,
          'last_name': doc.data().last_name,
          'email': doc.data().email
        }
        this.people.push(data)
      })
    })
  },
  data: () => ({
    amount: '',
    category: '',
    description: '',
    people: [],
    selectedPeople: [],
    date: new Date().toISOString().substr(0, 10),
    modal: false,
  })
};
</script>
