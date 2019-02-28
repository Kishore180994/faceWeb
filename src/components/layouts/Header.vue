<template>
<body>
  <div class="header background"></div>
  <div class="vueParticle">
    <vue-particles color="#dedede" class="background" :particlesNumber="100"></vue-particles>
  </div>
  <div class="bind">
    <div class="content">
      <div class="hero">
        <h1>{{heading}}</h1>
        <p>{{subHeading}}</p>
      </div>
    </div>
    <div class="bind content">
      <router-link to="/login" tag="button" class="Button">{{login}}</router-link>
      <router-link to="/register" tag="button" class="Button">{{register}}</router-link>
    </div>
  </div>
  <div class="visuals">
    <img class="face-filter" src="../../assets/faceid.png">
  </div>

  <div class="scene">
    <div class="cube">
      <div class="side back"></div>
      <div class="side left"></div>
      <div class="side right"></div>
      <div class="side top"></div>
      <div class="side bottom"></div>
      <div class="side front"></div>
    </div>
  </div>
</body>
</template>

<script>
import Vue from "vue";
import VueParticles from "vue-particles";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
Vue.use(VueParticles);
export default {
  name: "Header",
  data() {
    return {
      heading: "Web Login Using Face ID",
      subHeading: "Get Started to experience new way to login",
      login: "Login",
      register: "Register"
    };
  },
  mounted() {
    this.axios
      .get("http://localhost:3000/")
      .then((req, res) => {
        console.log(req.session.page_views);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" src='../../assets/styles/headerStyle.scss' scoped>
</style>