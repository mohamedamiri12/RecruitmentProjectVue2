<template>
  <CCol md="12">
    <CCard>
      <CCardHeader>
        <strong>Edit User Profil</strong>
      </CCardHeader>
      <CCardBody>
        <div
          class="alert-success text-center my-3 px-4 py-3"
          v-if="successUpdate"
        >
          {{ successUpdate }}
        </div>
        <div class="alert-danger text-center my-3 px-4 py-3" v-if="error">
          {{ error }}
        </div>

        <div
          class="d-flex justify-content-center px-4 py-3 my-3"
          v-if="isLoading"
        >
          <b-spinner
            variant="success"
            label="Spinning"
            class="mr-3"
          ></b-spinner>
          Loading ...
        </div>
        <form action="" enctype="multipart/form-data">
          <!--First name-->
          <div class="mb-2">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  :class="validationForFirstName"
                  id="first_name"
                  v-model="user.first_name"
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
            <div class="mb-2">
            <label>Last Name</label>
            <input
                  type="text"
                  placeholder="Enter your last name"
                  :class="validationForLastName"
                  id="last_name"
                  v-model="user.last_name"
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

              <!-- phone -->
              <div class="mb-2">
              <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  :class="validationForPhoneNumber"
                  id="phone_number"
                  v-model="user.phone_number"
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
          <!-- email -->
          <div class="mb-2">
              <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  :class="validationForEmail"
                  id="email"
                  v-model="user.email"
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
          <!-- Upload File -->
          <p class="mt-3 mb-2">Administrator Image</p>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="validatedCustomFile"
              required
              accept="image/*"
              @change="uploadImage"
            />
            <label class="custom-file-label" for="validatedCustomFile"
              >Choose file...</label
            >
          </div>
        </form>
      </CCardBody>
      <CCardFooter>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="mr-3"
          @click.prevent="updateUser"
        >
          <CIcon name="cil-check-circle" /> Submit</CButton
        >
        <CButton type="reset" size="sm" color="danger"
          ><CIcon name="cil-ban" /> Reset</CButton
        >
      </CCardFooter>
    </CCard>
  </CCol>
</template>

<script>
import axios from "axios";
export default {
  props: ["editedUser"],
  data() {
    return {
      password: "",
      isLoading: false,
      successUpdate: "",
      error: "",
      administrator_image: null,
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
    user() {
      return this.editedUser;
    },
    status() {
      return this.user.is_suspended === 0 ? false : true;
    },
  },
  methods: {
    /**
     *  Method to validate First Name
     */
    validFirstName: function(e) {
      console.log("valid first Name ? ");
      this.firstNameErrors = [];

      if (!this.user.first_name) {
        this.firstNameErrors.push("First Name should not be empty");
      }
      if (this.user.first_name.length < 4) {
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

      if (!this.user.last_name) {
        this.lastNameErrors.push("Last Name should not be empty");
      }
      if (this.user.last_name.length < 4) {
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

      if (!this.user.email) {
        this.emailErrors.push("Email should not be empty");
      }
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.user.email)) {
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

      if (!this.user.phone_number) {
        this.phoneNumberErrors.push("Phone Number should not be empty");
      }
      if (this.user.phone_number.length != 10) {
        this.phoneNumberErrors.push("Phone Number must be 10 numbers");
      }

      this.validationForPhoneNumber = this.phoneNumberErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    uploadImage(e) {
      this.administrator_image = e.target.files[0];
      console.log(this.administrator_image);
    },
    updateUser() {
      this.error = null;
      this.isLoading = true;
      //this.checkUploadForm;


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
        this.firstNameErrors.length  ||
        this.lastNameErrors.length ||
        this.emailErrors.length ||
        this.phoneNumberErrors.length
      ) {
        this.isLoading = false;
        return;
      }

      const updatedAdmin = new FormData();

      updatedAdmin.append("first_name", this.user.first_name);
      updatedAdmin.append("last_name", this.user.last_name);
      updatedAdmin.append("email", this.user.email);
      updatedAdmin.append("password", this.password);
      updatedAdmin.append("phone_number", this.user.phone_number);
      updatedAdmin.append("administrator_image", this.administrator_image);
      updatedAdmin.append('_method', 'PUT'); 

      console.log(11111111);

      const id = this.user.id;

      const apiUpdateRoute = "http://localhost:8000/api/administrators/" + id;
      const config = { headers: { 'content-type': 'multipart/form-data' } };

      axios.post(apiUpdateRoute, updatedAdmin, config)
        .then((res) => {
          console.log("After Done Axios ==> update User");
          this.isLoading = false;
          this.successUpdate = "The update succeded";
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
        });
    },
  },
};
</script>
