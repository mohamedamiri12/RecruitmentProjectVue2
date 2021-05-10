<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mx-auto">
        <div class="card">
          <div class="card-header">
            <b>Add User</b>
          </div>
          <div class="card-body">
            <div
              class="alert-success text-center mb-3 px-4 py-3"
              v-if="success_message"
            >
              {{ success_message }}
            </div>
            <div
              class="alert-dange text-center mb-3 px-4 py-3"
              v-if="error"
            >
              {{ error }}
            </div>
            <form
              @submit.prevent="registrationPerform"
              enctype="multipart/form-data"
            >
              <!-- first name -->
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text px-3">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  :class="validationForFirstName"
                  id="first_name"
                  v-model="firstName"
                  aria-describedby="emailHelp"
                  class="form-control pl-3"
                />
                <!-- If the errors is empty -->
                <div v-if="!validationFirstName" class="valid-feedback">
                  Looks good!
                </div>
                <!-- If the errors is full -->
                <div v-if="validationFirstName" class="invalid-feedback">
                  <span
                    class="d-block"
                    v-for="(error, index) in firstNameErrors"
                    :key="index"
                  >
                    {{ error }}
                  </span>
                </div>
              </div>
              <!-- last name -->
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text px-3">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  :class="validationForLastName"
                  id="last_name"
                  v-model="lastName"
                  aria-describedby="emailHelp"
                  class="form-control pl-3"
                />
                <!-- If the errors is empty -->
                <div v-if="!validationLastName" class="valid-feedback">
                  Looks good!
                </div>
                <!-- If the errors is full -->
                <div v-if="validationLastName" class="invalid-feedback">
                  <span
                    class="d-block"
                    v-for="(error, index) in lastNameErrors"
                    :key="index"
                  >
                    {{ error }}
                  </span>
                </div>
              </div>
              <!-- email -->
              <div class="input-group mt-3">
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
              <!-- password -->
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
              <!-- phone number -->
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text px-3">
                    <i class="fas fa-phone"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  :class="validationForPhoneNumber"
                  id="phone_number"
                  v-model="phoneNumber"
                  aria-describedby="emailHelp"
                  class="form-control pl-3"
                />
                <!-- If the errors is empty -->
                <div v-if="!validationPhoneNumber" class="valid-feedback">
                  Looks good!
                </div>
                <!-- If the errors is full -->
                <div v-if="validationPhoneNumber" class="invalid-feedback">
                  <span
                    class="d-block"
                    v-for="(error, index) in phoneNumberErrors"
                    :key="index"
                  >
                    {{ error }}
                  </span>
                </div>
              </div>
              <!-- user image -->
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text px-3">
                    <i class="fas fa-phone"></i>
                  </span>
                </div>
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="validatedCustomFile"
                    required
                    accept="image/*"
                    placeholder="browse image"
                    :class="validationForUserImage"
                    @change="uploadImage"
                  />
                  <label class="custom-file-label" for="validatedCustomFile"
                    >Choose file...</label
                  >
                </div>
                <!-- If the errors is empty -->
                <div v-if="!validationUserImage" class="valid-feedback">
                  Looks good!
                </div>
                <!-- If the errors is full -->
                <div v-if="validationUserImage" class="invalid-feedback">
                  <span
                    class="d-block"
                    v-for="(error, index) in userImageErrors"
                    :key="index"
                  >
                    {{ error }}
                  </span>
                </div>
              </div>
              <!-- loading Spinner -->
              <div
                class="d-flex justify-content-center px-4 py-3 mt-4"
                v-if="isLoading"
              >
                <b-spinner variant="success" label="Spinning"></b-spinner>
              </div>
            </form>
          </div>
          <div class="card-footer text-muted">
            <button class="btn btn-primary float-left" @click="goBack">
              Back
            </button>
            <button
              class="btn btn-success float-right"
              type="submit"
              @click.prevent="registrationPerform"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersOpened: null,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      isLoading: false,
      error: "",
      administrator_image: "",
      success_message: null,
      /* data for validation */
      firstNameErrors: [],
      lastNameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      phoneNumberErrors: [],
      userImageErrors: [],
      validationForFirstName: null,
      validationForLastName: null,
      validationForEmail: null,
      validationForPassword: null,
      validationForPhoneNumber: null,
      validationForUserImage: null,
    };
  },
  computed: {
    /* computed methods for validation */
    validationFirstName() {
      return this.firstNameErrors.length ? true : false;
    },
    validationLastName() {
      return this.lastNameErrors.length ? true : false;
    },
    validationEmail() {
      return this.emailErrors.length ? true : false;
    },
    validationPassword() {
      return this.passwordErrors.length ? true : false;
    },
    validationPhoneNumber() {
      return this.phoneNumberErrors.length ? true : false;
    },
    validationUserImage() {
      return this.userImageErrors.length ? true : false;
    },
  },
  methods: {
    /**
     *  Method to validate First Name
     */
    validFirstName: function(e) {
      console.log("valid first Name ? ");
      this.firstNameErrors = [];

      if (!this.firstName) {
        this.firstNameErrors.push("First Name should not be empty");
      }
      if (this.firstName.length < 4) {
        this.firstNameErrors.push("First Name must be more than 4 characters");
      }

      this.validationForFirstName = this.firstNameErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /**
     *  Method to validate Last Name
     */
    validLastName: function(e) {
      this.lastNameErrors = [];

      if (!this.lastName) {
        this.lastNameErrors.push("Last Name should not be empty");
      }
      if (this.lastName.length < 4) {
        this.lastNameErrors.push("Last Name must be more than 4 characters");
      }

      this.validationForLastName = this.lastNameErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /*
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
      var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!re.test(this.password)) {
        this.passwordErrors.push(
          "password must contains letter,numbers and symbols like : @+:-..."
        );
      }

      this.validationForPassword = this.passwordErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /**
     *  Method to validate Phone Number
     */
    validPhoneNumber: function(e) {
      this.phoneNumberErrors = [];

      if (!this.phoneNumber) {
        this.phoneNumberErrors.push("Phone Number should not be empty");
      }
      if (this.phoneNumber.length != 10) {
        this.phoneNumberErrors.push("Phone Number must be 10 numbers");
      }

      this.validationForPhoneNumber = this.phoneNumberErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /**
     *  Register new User ==> Add user
     */
    registrationPerform() {
      console.log("appel");
      this.error = null;
      this.isLoading = true;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validFirstName();
      this.validLastName();
      this.validEmail();
      this.validPhoneNumber();

      /**
       *    Return if the errors is here
       */
      if (
        this.firstNameErrors.length ||
        this.lastNameErrors.length ||
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.phoneNumberErrors.length
      ) {
        this.isLoading = false;
        return;
      }

      const formData = new FormData();

      formData.append("first_name", this.firstName);
      formData.append("last_name", this.lastName);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("phone_number", this.phoneNumber);
      formData.append("administrator_image", this.administrator_image);

      console.log(this.administrator_image);

      this.$store
        .dispatch("registrationPerform", formData)
        .then((res) => {
          this.isLoading = false;
          console.log("Registration Done");
          console.log(res.data);
          this.success_message = "User has been added succesfully";
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
          this.error = "Registration Failed";
        });
    },
    uploadImage(e) {
      this.administrator_image = e.target.files[0];
    },
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/dash/clients" });
    },
  },
};
</script>
