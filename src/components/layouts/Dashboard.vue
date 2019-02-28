<template>
  <div>
    <p>DashBoard</p>
    <p v-html="information"></p>
    {{errorstatus}}
    <!-- <h2>{{firstname}}</h2>
    <h2>{{lastname}}</h2>
    <h2>{{username}}</h2>-->
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";
export default {
  name: "Dashboard",
  methods: {},
  data() {
    return {
      information: "Temp",
      errorstatus: ""
    };
  },
  mounted() {
    var url = "http://localhost:3000/dashboard";
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.information = res.data;
      })
      .catch(err => {
        if (!err.response) {
          // network error
          this.errorStatus = "Error: Network Error";
        } else {
          this.errorStatus = error.response.data.message;
        }
      });
  }
};
</script>

<style lang="scss" scoped>
</style>


