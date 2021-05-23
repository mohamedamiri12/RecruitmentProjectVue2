<template>
  <CCol md="12">
    <CCard>
      <CCardHeader>
        <strong>Edit CLient Profil</strong>
      </CCardHeader>
      <CCardBody>
        <div
          class="alert-success text-center my-3 px-4 py-3"
          v-if="successUpdate && countDown > 0"
        >
          {{ successUpdate }}
        </div>
        <div class="alert-danger text-center my-3 px-4 py-3" v-if="error && countDown > 0">
          {{ error }}
        </div>

        <div
          class="d-flex justify-content-center px-4 py-3 my-3"
          v-if="isLoading"
        >
          <b-spinner variant="success" label="Spinning"></b-spinner>
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
                  v-model="client.first_name"
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
                  v-model="client.last_name"
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
                  v-model="client.phone_number"
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
                  v-model="client.email"
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
          <p class="mt-3 mb-2">Client Image</p>
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
          @click="updateClient"
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
import axiosInstance from "../../axiosInstance";

export default {
  props: ["editedClient"],
  data() {
    return {
      /*firstName: this.editedClient.first_name,
      lastName: this.client.last_name,
      email: this.client.email,
      password: this.client.password,
      phoneNumber: this.client.phoneNumber,
      status: this.client.status,*/
      password: "",
      isLoading: false,
      successUpdate: "",
      error: "",
      client_image: null,
      countDown: 5,
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
    client() {
      return this.editedClient;
    },
    status() {
      return this.client.is_suspended === 0 ? false : true;
    },
  },
  methods: {
    /*
    **
     *  Method to validate First Name
     */
    validFirstName: function(e) {
      console.log("valid first Name ? ");
      this.firstNameErrors = [];

      if (!this.client.first_name) {
        this.firstNameErrors.push("First Name should not be empty");
      }
      if (this.client.first_name.length < 4) {
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

      if (!this.client.last_name) {
        this.lastNameErrors.push("Last Name should not be empty");
      }
      if (this.client.last_name.length < 4) {
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

      if (!this.client.email) {
        this.emailErrors.push("Email should not be empty");
      }
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.client.email)) {
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

      if (!this.client.phone_number) {
        this.phoneNumberErrors.push("Phone Number should not be empty");
      }
      if (this.client.phone_number.length != 10) {
        this.phoneNumberErrors.push("Phone Number must be 10 numbers");
      }

      this.validationForPhoneNumber = this.phoneNumberErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    uploadImage(e) {
      this.client_image = e.target.files[0];
      console.log(this.client_image);
    },
    updateClient() {
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
        this.firstNameErrors.length  ||
        this.lastNameErrors.length ||
        this.emailErrors.length ||
        this.phoneNumberErrors.length
      ) {
        this.isLoading = false;
        return;
      }


      const updatedCLient = new FormData();

      updatedCLient.append("first_name", this.client.first_name);
      updatedCLient.append("last_name", this.client.last_name);
      updatedCLient.append("email", this.client.email);
      updatedCLient.append("password", this.client);
      updatedCLient.append("phone_number", this.client.phone_number);
      updatedCLient.append("client_image", this.client_image);
      updatedCLient.append("_method", "PUT");

      const id = this.client.id;

      const apiUpdateRoute =
        "http://localhost:8000/api/administrator/clients/" + id;
      const config = { headers: { "content-type": "multipart/form-data" } };

      axiosInstance
        .post(apiUpdateRoute, updatedCLient, config)
        .then((res) => {
          console.log("After Done Axios ==> update Client");
          this.isLoading = false;
          this.successUpdate = "The update succeded";
          this.countDownTimer();
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
          this.countDownTimer();
          console.log(error.response.data);
        });
    },
  },
};
</script>
