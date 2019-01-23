<template lang="html">
  <v-card flat>
    <v-bottom-nav :value="true" absolute color="transparent">
      <v-btn color="teal" flat value="transactions">
        <span>Transactions</span>
        <v-icon>payment</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="add-new" to="/add-transaction">
        <span>Add New</span>
        <v-icon>add</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="people">
        <span>People</span>
        <v-icon>people</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
