<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
      integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
      crossorigin="anonymous"
    >
    <form @submit.prevent="onLogin">
      <input
        name="usrname"
        type="text"
        placeholder="username"
        v-model.trim="userLogin.usrname"
        v-validate="{ required: true}"
      >
      <div class="invalid-feedback">{{ errors.first("usrname") }}</div>
      <input
        name="password"
        type="password"
        placeholder="password"
        v-model.trim="userLogin.pwd"
        v-validate="{ required: true}"
      >
      <div class="invalid-feedback">{{ errors.first("password") }}</div>
      <button type="Submit">Submit</button>
    </form>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div id="container">
      <video autoplay="true" id="videoElement"></video>
    </div>
    <button value="Open Camera" @click="cameraAccess">Open Camera</button>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import axios from "axios";
import VueAxios from "vue-axios";
import Header from "./Header.vue";

Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {
  validity: true,
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});
export default {
  name: "LoginPage",
  data() {
    return {
      error: false,
      resu: "",
      userLogin: {
        usrname: "",
        pwd: ""
      }
    };
  },
  methods: {
    // loginSuccessful(req) {
    //   if (!req.data.token) {
    //     this.loginFailed();
    //     return;
    //   }

    //   localStorage.token = req.data.token;
    //   this.error = false;

    //   this.$router.replace(this.router.query.redirect || "/dashboard");
    // },
    // loginFailed() {
    //   this.error = "Login Failed!";
    //   delete localStorage.token;
    // },
    onLogin() {
      this.$validator.validateAll().then(result => {
        if (result) {
          let user = {
            username: this.userLogin.usrname,
            password: this.userLogin.pwd
          };

          // this.$http
          //   .post("/auth", user)
          //   .then(req => this.loginSuccessful(req))
          //   .catch(() => this.loginFailed());
          console.log(user);
          this.axios.defaults.withCredentials = true;
          this.axios
            .post("http://localhost:3000/login", user)
            .then(res => {
              console.log(res.status);
              localStorage.setItem("userToken", JSON.stringify(res.data.user));
              this.userLogin.usrname = "";
              this.userLogin.pwd = "";
              this.$router.push({ name: "Dashboard" });
            })
            .catch(err => {
              localStorage.removeItem("userToken");
              console.log(err);
            });

          //            .then(function (response) {
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
          // this.emitMethod();
          return;
        }
        // this.background = "linear-gradient(to bottom right, red, white)";
        alert("Correct them errors!");
      });
    },
    emitMethod() {
      Header.$emit("logged-in", "loggedin");
    },
    cameraAccess() {
      let video = document.getElementById("videoElement");
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function(stream) {
            video.srcObject = stream;
          })
          .catch(function(err0r) {
            console.log(err0r);
          });
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
#container {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 0px auto;
  overflow: hidden;
  border-radius: 50%;
}

.form {
  .invalid-feedback {
    background: #ce4242;
    display: block;
    border-radius: 5px;
    opacity: 0.9;
    // width: 80%;
    // transform: translateX(12%);
    font-size: 90%;
  }
}

video {
  display: inline;
  margin: 0 auto;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
  height: 100%;
  width: auto;
}
</style>

