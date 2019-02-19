<template>
  <v-app>
    <Navbar :key="$route.fullPath"></Navbar>
    <v-content transition="slide-x-transition">
      <v-container fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <BottomNav></BottomNav>
  </v-app>
</template>

<script>
import Navbar from "@/components/common/Navbar.vue";
import BottomNav from "@/components/common/BottomNav.vue";

export default {
  components: {
    Navbar,
    BottomNav
  },
  computed: {
    currentUser() {
      if(Object.entries(this.$store.state.currentUser).length === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss">
</style>
