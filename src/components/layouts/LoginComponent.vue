<template>
  <div>
    <NavBar/>
    <LoginPage/>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import LoginPage from "../layouts/LoginPage.vue";
export default {
  name: "LoginComponent",
  components: {
    NavBar,
    LoginPage
  }
};
</script>

<style scoped>
</style>


