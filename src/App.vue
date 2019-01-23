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
      Navbar, BottomNav
    }
  }
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
