<template lang="html">
  <v-card flat>
    <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
      <v-btn color="teal" flat value="recent">
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="add-new" to="/add-transaction">
        <span>Add New</span>
        <v-icon>add</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.v-item-group.v-bottom-nav .v-btn:hover {
  text-decoration: none;
}
</style>
