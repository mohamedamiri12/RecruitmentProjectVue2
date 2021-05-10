<template>
  <CCol md="12">
    <CCard>
      <CCardHeader>
        <strong>Edit Category Profil</strong>
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
        <!-- name-->
          <div class="mb-2">
                <label>Name</label>
                <input
                type="text"
                placeholder="Enter your first name"
                :class="validationForName"
                id="first_name"
                v-model="category.name"
                aria-describedby="emailHelp"
                class="form-control pl-3"
                />
                <!-- If the errors is empty -->
                <div v-if="!validationName" class="valid-feedback">
                  Looks good!
                </div>
                <!-- If the errors is full -->
                <div v-if="validationName" class="invalid-feedback">
                  <span
                    class="d-block"
                    v-for="(error, index) in NameErrors"
                    :key="index"
                  >
                    {{ error }}
                  </span>
                </div>
          </div>
        </form>
      </CCardBody>
      <CCardFooter>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="mr-3"
          @click="updateCategory"
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
  props: ["editedCategory"],
  data() {
    return {
      isLoading: false,
      successUpdate: "",
      error: "",
      countDown: 5,
      /* data for validation */
      NameErrors: [],
      validationForName: null,
         };
  },
  computed: {
    /* computed methods for validation */
    validationName() {
      return this.firstNameErrors.length ? true : false;
    },
    category() {
      return this.editedCategory;
    },
  },
  methods: {
    /**
     *  Method to validate First Name
     */
    validName: function(e) {
      console.log("valid  Name ? ");
      this.NameErrors = [];

      if (!this.category.name) {
        this.NameErrors.push("Name should not be empty");
      }
      if (this.category.name.length < 4) {
        this.NameErrors.push("Name must be more than 4 characters");
      }

      this.validationForName = this.NameErrors.length
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
    updateCategory() {
      this.error = null;
      this.isLoading = true;

       /**
       *  Call the validation methods Before send data to backend
       */
      this.validName();

      const updatedCategory = new FormData();

      updatedCategory.append("name", this.category.name);
      updatedCategory.append("_method", "PUT");

      const id = this.category.id;

      const apiUpdateRoute =
        "http://localhost:8000/api/administrator/categories/" + id;
      const config = { headers: { "content-type": "multipart/form-data" } };

      axios
        .post(apiUpdateRoute, updatedCategory, config)
        .then((res) => {
          console.log("After Done Axios ==> update Category");
          this.isLoading = false;
          this.successUpdate = "The update succeded";
          this.countDownTimer();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
          this.countDownTimer();
        });
    },
  },
};
</script>
