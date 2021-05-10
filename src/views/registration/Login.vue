<template>
  <div class="c-app flex-row align-items-center">
    <div class="container-fluid">
      <CRow class="justify-content-center">
        <CCol md="2"> </CCol>
        <CCol md="5">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="loginPerform">
                  <h1 class="mb-4">Login</h1>
                  <p class="text-muted mb-2">Sign In to your account</p>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text px-3">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      :class="validationForEmail"
                      id="email"
                      v-model="email"
                      aria-describedby="emailHelp"
                      class="form-control pl-3"
                    />
                    <!-- If the errors is empty -->
                    <div v-if="!validationEmail" class="valid-feedback">
                      Looks good!
                    </div>
                    <!-- If the errors is full -->
                    <div v-if="validationEmail" class="invalid-feedback">
                      <span
                        class="d-block"
                        v-for="(error, index) in emailErrors"
                        :key="index"
                      >
                        {{ error }}
                      </span>
                    </div>
                  </div>

                  <div class="input-group mt-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text px-3">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      :class="validationForPassword"
                      id="passwordInput"
                      v-model="password"
                      required
                      placeholder="Enter your passsword"
                      autocomplete="curent-password"
                      class="form-control pl-3"
                    />
                    <!-- If the errors is empty -->
                    <div v-if="!validationPassword" class="valid-feedback">
                      Looks good!
                    </div>
                    <!-- If the errors is full -->
                    <div v-if="validationPassword" class="invalid-feedback">
                      <span
                        class="d-block"
                        v-for="(error, index) in passwordErrors"
                        :key="index"
                      >
                        {{ error }}
                      </span>
                    </div>
                  </div>
                  <CRow>
                    <button class="btn btn-submit mt-3" type="submit">
                      Sign In
                    </button>

                    <!-- show error -->
                    <div
                      class="alert alert-danger error text-center mt-3 mb-1 px-4 py-2 mx-auto"
                      v-if="error"
                    >
                      {{ error }}
                    </div>
                  </CRow>
                </CForm>
                <!-- loading Spinner -->
                <div
                  class="d-flex justify-content-center px-4 py-3 mt-4"
                  v-if="isLoading"
                >
                  <b-spinner variant="success" label="Spinning"></b-spinner>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
        <CCol md="2"> </CCol>
      </CRow>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
      error: null,
      /* data for validation */
      emailErrors: [],
      passwordErrors: [],
      validationForEmail: null,
      validationForPassword: null,
    };
  },
  computed: {
    /* computed methods for validation */
    validationEmail() {
      return this.emailErrors.length ? true : false;
    },
    emailStatus() {
      return this.email ? true : false;
    },
    passwordStatus() {
      return this.password ? true : false;
    },
    validationPassword() {
      return this.passwordErrors.length ? true : false;
    },
  },
  methods: {
    /**
     *  Method to validate Email
     */
    validEmail: function(e) {
      this.emailErrors = [];

      if (!this.email) {
        this.emailErrors.push("Email should not be empty");
      }
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.email)) {
        this.emailErrors.push("Email must have a valid format");
      }
      this.validationForEmail = this.emailErrors.length
        ? "is-invalid"
        : "is-valid";
    },

    /**
     *  Method to validate Email
     */
    validPassword: function(e) {
      this.passwordErrors = [];

      if (!this.password) {
        this.passwordErrors.push("Password should not be empty");
      }
      /**
       *  this code will be available after update all users passsword
       */
      /*var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!re.test(this.password)) {
        this.passwordErrors.push("password must have a valid format");
      }*/

      this.validationForPassword = this.passwordErrors.length
        ? "is-invalid"
        : "is-valid";
    },

    loginPerform() {
      this.error=null;
      this.isLoading = true;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validEmail();
      this.validPassword();
      /**
       * Return if the errors is here
       */
      if (this.emailErrors.length || this.passwordErrors.length) {
        this.isLoading = false;
        return;
      }
      this.$store
        .dispatch("loginPerform", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.error = "Error While Sign In, Try again";
        });
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #f3f3f38f;
}
.login-container {
  border: 1px solid #cdcbcb;
  border-radius: 15px;
  width: 90%;
  box-shadow: 0 0 15px 7px rgba(37, 50, 70, 0.1);
}
.part-left {
  background-color: #152467;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.part-right {
  background-color: #fff;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.box {
  color: #fff;
}
.sign-up-text {
  text-align: center;
  font-size: 1.5rem;
}
.btn-sign-up {
  color: #3f54b2;
  padding: 10px 45px;
  border-radius: 50px;
  background-color: #fff;
  text-transform: capitalize;
  font-weight: 600;
}
.form-container label {
  color: #152467;
  font-weight: bold;
  text-transform: capitalize;
}
.form-container .form-group,
.error {
  width: 90%;
}
.btn-submit {
  color: #fff;
  padding: 8px 35px;
  border-radius: 10px;
  background-color: #4055b2;
  text-transform: capitalize;
  font-weight: 600;
}
.btn-submit:hover {
  background-color: #3b4fa6;
  color: #fff;
}
</style>
