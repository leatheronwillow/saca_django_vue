<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign Up</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label for="username">Username</label>
            <div class="control">
              <input
                class="input"
                type="text"
                id="username"
                placeholder="Username"
                v-model="username"
              />
            </div>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <div class="control">
              <input
                class="input"
                type="text"
                id="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
          </div>
          <div class="field">
            <label for="password2">Confirm Password</label>
            <div class="control">
              <input
                class="input"
                type="text"
                id="password2"
                placeholder="Confirm Password"
                v-model="password2"
              />
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">
              {{ error }}
            </p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign Up</button>
            </div>
          </div>
          <hr />
          or <router-link to="/login">click here</router-link> to log in.
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "SignUpView",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  methods: {
    submitForm() {
      this.errors = [];

      if (!this.username) {
        this.errors.push("Username is required.");
      }

      if (!this.password) {
        this.errors.push("Password is required.");
      }

      if (this.password !== this.password2) {
        this.errors.push("Passwords do not match.");
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };

        axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            toast({
              message: "Account created successfully. Please log in.",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              positions: "bottom-right",
            });

            this.$router.push("/login");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: $error.response.data[property]`);
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again.");
              console.log(JSON.stringify);
            }
          });
      }
    },
  },
};
</script>
