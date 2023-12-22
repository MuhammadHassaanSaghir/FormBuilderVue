<template>
  <div class="login-page d-flex justify-center align-center">
    <v-card
      class="login-form-card px-12 rounded-lg"
      :class="$vuetify.breakpoint.smAndDown ? 'py-6' : 'py-12'"
      color="#fff"
      flat
      :style="
        $vuetify.breakpoint.smAndDown
          ? 'width: 90% !important;'
          : 'width: 30% !important;'
      "
    >
      <div>
        <img src="../assets/images/logo.svg" alt="logo" width="40px" />
      </div>
      <v-card-text class="pa-0 py-4">
        <v-form
          ref="loginForm"
          v-model="validForm"
          lazy-validation
          @submit.prevent="login"
          @keyup.native.enter="login"
        >
          <div>
            <label for="" class="black--text"> Email Address </label>
            <v-text-field
              v-model="emailAddress"
              placeholder="Email address"
              outlined
              class="rounded-lg mt-1"
              color="#000"
              :rules="emailRule"
            ></v-text-field>
          </div>
          <div class="mt-3">
            <label for="" class="black--text">Password</label>
            <v-text-field
              v-model.trim="password"
              placeholder="Password"
              outlined
              class="rounded-lg mt-1"
              color="#000"
              :rules="passwordRule"
              @input="checkPasswordStrength"
              :type="visible ? 'text' : 'password'"
              :append-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="visible = !visible"
            ></v-text-field>
            <div v-if="password" class="mb-3">
              <p
                class="ma-0 font-weight-bold"
                :class="
                  passwordStrength == 1
                    ? 'very-weak-text'
                    : passwordStrength == 2
                    ? 'weak-text'
                    : passwordStrength == 3
                    ? 'moderate-text'
                    : passwordStrength == 4
                    ? 'strong-text'
                    : passwordStrength == 5
                    ? 'very-strong-text'
                    : ''
                "
              >
                {{ strengthText }}
              </p>
              <div class="password-bar d-flex align-center">
                <div
                  class="bar mr-2"
                  :class="passwordStrength >= 1 ? 'very-weak' : ''"
                ></div>
                <div
                  class="bar mr-2"
                  :class="passwordStrength >= 2 ? 'weak' : ''"
                ></div>
                <div
                  class="bar mr-2"
                  :class="passwordStrength >= 3 ? 'moderate' : ''"
                ></div>
                <div
                  class="bar mr-2"
                  :class="passwordStrength >= 4 ? 'strong' : ''"
                ></div>
                <div
                  class="bar mr-2"
                  :class="passwordStrength === 5 ? 'very-strong' : ''"
                ></div>
                <div>
                  <v-tooltip content-class="white tooltip-bottom" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" icon color="#000" small>
                        <v-icon size="18" color="#000">
                          mdi-help-circle-outline
                        </v-icon>
                      </v-btn>
                    </template>
                    <span class="tooltip-text">
                      <ul class="unordered-list-passowrd-criteria text-size-12">
                        <li v-for="(criterion, index) in criteria" :key="index">
                          <v-icon
                            class="mr-1 mb-1"
                            dense
                            :color="
                              checkCriterion(criterion.regex) ? 'green' : 'red'
                            "
                          >
                            {{
                              checkCriterion(criterion.regex)
                                ? "mdi-check-circle"
                                : "mdi-check-circle-outline"
                            }}
                          </v-icon>
                          <span
                            :class="
                              checkCriterion(criterion.regex)
                                ? 'tooltip-text'
                                : 'red--text'
                            "
                          >
                            {{ criterion.text }}
                          </span>
                        </li>
                      </ul>
                    </span>
                  </v-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap align-center justify-space-between">
            <v-checkbox
              :ripple="false"
              hide-details
              class="ma-0"
              dense
              color="#000"
            >
              <template v-slot:label>
                <span class="black--text"> Remember Me </span>
              </template>
            </v-checkbox>
            <router-link to="/" class="black--text">
              Forgot Password?
            </router-link>
          </div>
          <div>
            <v-btn
              block
              color="#000"
              elevation="0"
              class="text-capitalize rounded-lg my-5 text-size-16"
              height="46px"
              :dark="validForm"
              :disabled="!validForm"
              @click="login"
              :loading="loginBtnLoader"
            >
              Login
            </v-btn>
          </div>
          <div class="d-flex align-center justify-center">
            <p class="ma-0 not-account-text">Not account yet?</p>
            <router-link to="/" class="black--text ml-1">
              Register
            </router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { emailRule, passwordRule } from "@/Constants/validations.js";
export default {
  name: "LoginPage",
  data() {
    return {
      emailRule,
      passwordRule,
      validForm: true,
      emailAddress: "",
      password: "",
      visible: false,
      passwordStrength: 0,
      loginBtnLoader: false,

      criteria: [
        { text: "One lowercase letter", regex: /[a-z]/ },
        { text: "One uppercase letter", regex: /[A-Z]/ },
        { text: "One number", regex: /[0-9]/ },
        {
          text: "One special character",
          regex: /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]+/,
        },
        { text: "Password must be at least 6 characters", regex: /.{6,}/ },
      ],
    };
  },
  computed: {
    strengthText() {
      if (this.passwordStrength === 1) return "Very Weak";
      if (this.passwordStrength === 2) return "Weak";
      if (this.passwordStrength === 3) return "Moderate";
      if (this.passwordStrength === 4) return "Strong";
      return "Very Strong";
    },
  },
  methods: {
    checkPasswordStrength() {
      // Your password validation logic here
      const metCriteria = this.criteria.filter((criterion) =>
        criterion.regex.test(this.password)
      );
      this.passwordStrength = metCriteria.length;
    },

    checkCriterion(regex) {
      return regex.test(this.password);
    },

    login() {
      if (this.$refs.loginForm.validate()) {
        this.loginBtnLoader = true;
        let payloadData = {
          url: "https://dummyjson.com/auth/login",
          data: {
            username: "kminchelle",
            password: "0lelplR",
          },
        };
        this.$store
          .dispatch("postData", payloadData)
          .then((response) => {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            this.$router.push("/app-layout");
          })
          .catch(() => {})
          .finally(() => {
            this.loginBtnLoader = false;
          });
      }
    },
  },
};
</script>
<style scoped>
.login-page {
  background-color: #ebecf0 !important;
  height: 100vh !important;
  overflow-y: auto !important;
}
.login-form-card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;
}
.password-bar {
  width: 100% !important;
}
.bar {
  width: 25% !important;
  height: 6px !important;
  background-color: #ebecf0 !important;
  border-radius: 1em !important;
}
.not-account-text {
  color: #677083 !important;
}

.very-weak {
  background-color: #ff6666 !important;
}
.weak {
  background-color: #ffa07a !important;
}
.moderate {
  background-color: #ffd700 !important;
}
.strong {
  background-color: #6dd16d !important;
}
.very-strong {
  background-color: #4caf50 !important;
}
.very-weak-text {
  color: #ff6666 !important;
}
.weak-text {
  color: #ffa07a !important;
}
.moderate-text {
  color: #ffd700 !important;
}
.strong-text {
  color: #6dd16d !important;
}
.very-strong-text {
  color: #4caf50 !important;
}
.unordered-list-passowrd-criteria {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
