<template>
  <div>
    <div class="body" v-bind:style="{ 'background-image': computedBg, 'background-color': def}">
      <!-- v-bind:style="{ 'background-image': computedBg, 'background-color': def}" -->
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossorigin="anonymous"
      >
      <div class="wrapper">
        <div class="form-container">
          <!-- <img src="../../assets/faceid.png"> -->
          <h1>
            <i :class="icons"></i>
            {{heading}}
            <router-link
              to="/"
              tag="button"
              class="Button"
              v-bind:style="{ 'visibility': h1visibility }"
            >Back to Home Page</router-link>
          </h1>
          <form
            class="form"
            @submit.prevent="onSubmit"
            v-bind:style="{ 'visibility': formVisiblity }"
          >
            <input
              name="firstname"
              type="text"
              calss="form-control"
              placeholder="First Name"
              v-validate="{ required: true,alpha_spaces: true, min: 4 }"
              v-model.trim="firstName"
            >
            <div class="invalid-feedback">{{ errors.first("firstname") }}</div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              v-validate="{ required: true,alpha_spaces: true, min: 4 }"
              v-model.trim="lastName"
            >
            <div class="invalid-feedback">{{ errors.first("lastName") }}</div>
            <input
              type="text"
              name="userName"
              v-validate="{ required: true,alpha_num: true, min: 4 }"
              placeholder="Username"
              v-model.trim="userName"
            >
            <div class="invalid-feedback">{{ errors.first("userName") }}</div>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              v-validate="{ required: true, min: 5 }"
              v-model.trim="Password"
              ref="Password"
            >
            <div class="invalid-feedback">{{ errors.first("Password") }}</div>
            <input
              type="password"
              name="verifyPassword"
              placeholder="Re-enter password"
              v-validate="'required|confirmed:Password'"
              v-model.trim="verifyPassword"
              data-vv-as="Password"
            >
            <div class="invalid-feedback">{{ errors.first("verifyPassword") }}</div>
            <input
              type="submit"
              value="Register"
              v-bind:style="{'opacity': submitOpacity, 'cursor': submitCursor}"
            >
          </form>
          <!-- <pre>{{ nameFlags }}</pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {
  validity: true,
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});
// import { mapFields } from "vee-validate";

export default {
  name: "RegisterPage",
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      Password: "",
      verifyPassword: "",
      background: "",
      h1visible: "hidden",
      formvisible: "visible",
      header: "You are just one step away",
      icon: "fas fa-user-plus",
      counter: [false, false, false, false, false],
      counterLength: 0,
      LengthPercentage: 0,
      def: "black",
      submitCursor: "not-allowed",
      submitOpacity: "0.6"
    };
  },
  beforeUpdate() {
    if (this.$validator.fields.find({ name: "firstname" }).flags.valid)
      this.counter[0] = true;
    else this.counter[0] = false;
    if (this.$validator.fields.find({ name: "lastName" }).flags.valid)
      this.counter[1] = true;
    else this.counter[1] = false;
    if (this.$validator.fields.find({ name: "userName" }).flags.valid)
      this.counter[2] = true;
    else this.counter[2] = false;
    if (this.$validator.fields.find({ name: "Password" }).flags.valid)
      this.counter[3] = true;
    else this.counter[3] = false;
    if (this.$validator.fields.find({ name: "verifyPassword" }).flags.valid)
      this.counter[4] = true;
    else this.counter[4] = false;
  },
  updated() {
    this.counterLength = this.counter.filter(v => v).length;

    this.LengthPercentage = (this.counterLength / 5) * 100;
    if (this.counterLength == 0) {
      this.background = "linear-gradient(to top , #19e474 50%, black 50%)";
      this.submitOpacity = "0.6";
      this.submitCursor = "not-allowed";
    } else {
      this.submitOpacity = "1.0";
      this.submitCursor = "pointer";
      this.background =
        "linear-gradient(to top , #19e474 " +
        (this.counterLength * 10 + 50) +
        "%, black " +
        50 +
        "%)";
    }
  },
  computed: {
    // ...mapFields(["firstname", "lastName", "userName"]),
    computedBg() {
      return this.background;
    },
    h1visibility() {
      return this.h1visible;
    },
    formVisiblity() {
      return this.formvisible;
    },
    icons() {
      return this.icon;
    },
    heading() {
      return this.header;
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          this.background = "linear-gradient(to bottom right, green, white)";
          this.h1visible = "visible";
          this.formvisible = "hidden";
          this.icon = "fas fa-check";
          this.header = "Successfully Registered";
          // alert("Form Submitted!");
          // this.$router.push({ name: "Header" });
          let user = {
            firstname: this.firstName,
            lastname: this.lastName,
            username: this.userName,
            password: this.Password
          };
          console.log(user);

          this.axios
            .post("http://localhost:3000/users", user)
            .then(() => {
              console.log("Data Inserted");
            })
            .catch(err => {
              console.log(err);
            });
          return;
        }
        // this.background = "linear-gradient(to bottom right, red, white)";
        alert("Correct them errors!");
      });
    }
  }
};
</script> 


<style lang="scss" src='../../assets/styles/registerStyle.scss' scoped>
</style>
