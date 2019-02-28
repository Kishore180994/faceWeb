<template>
  <div>
    <NavBar/>
    <RegisterPage/>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import RegisterPage from "./RegisterPage";
export default {
  name: "RegisterComponent",
  components: {
    NavBar,
    RegisterPage
  }
};
</script>

<style scoped>
</style>


