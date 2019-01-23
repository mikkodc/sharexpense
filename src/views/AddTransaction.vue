<template>
  <v-layout justify-start align-space-betwee column>
    <v-form>
      <v-text-field v-model="amount" prepend-icon="payment" label="Amount" required></v-text-field>
      <v-select v-model="selectedPeople" :items="people" label="People" prepend-icon="people" multiple chips>
        <!-- Selection -->
        <template slot="selection" slot-scope="data">
          <v-chip :selected="data.selectedPeople" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
            {{ data.item.first_name }}
          </v-chip>
        </template>

        <!-- Item -->
        <template slot="item" slot-scope="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-avatar color="teal">
              <img v-if="data.item.avatar" :src="data.item.avatar">
              <v-icon dark v-else>person</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.first_name + ' ' +  data.item.last_name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="data.item.email"></v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </template>

        <v-divider slot="append-item" class="mb-2"></v-divider>

        <v-list-tile slot="append-item">
          <v-list-tile-content>
            <v-list-tile-title>
              Add New...
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-select>

      <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
        <v-text-field slot="activator" v-model="date" label="Picker in dialog" prepend-icon="event" readonly></v-text-field>
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
      <v-text-field v-model="description" prepend-icon="subject" label="Description"></v-text-field>
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
