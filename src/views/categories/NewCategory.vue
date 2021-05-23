<template>
  <CCol md="12">
    <CCard>
      <CCardHeader>
        <strong>New Category</strong>
      </CCardHeader>
      <CCardBody>
        <div class="alert-success text-center my-3 px-4 py-3" v-if="successAdd && countDown > 0">
          {{ successAdd }}
        </div>
        <div class="alert-danger text-center my-3 px-4 py-3" v-if="error && countDown > 0">
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

        <form action="">
          <!-- name -->
              <div class="mb-2">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your category name"
                  :class="validationForName"
                  id="category_name"
                  v-model="category_name"
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
          <!-- Descritpion -->
              <div class="mb-2">
                <label for="description">Category description</label>
                <textarea
                class="form-control"
                :class="validationForDescription"
                id="description"
                rows="3"
                v-model="category_description"
                ></textarea>
                <!-- If the errors is empty -->
                <div v-if="!validationDescritption" class="valid-feedback">
                  Looks good!
                </div>
                <!-- If the errors is full -->
                <div v-if="validationDescritption" class="invalid-feedback">
                  <span
                    class="d-block"
                    v-for="(error, index) in DescritptionErrors"
                    :key="index"
                  >
                    {{ error }}
                  </span>
                </div>
              </div>
          <div class="form-group">
            
          </div>
        </form>
      </CCardBody>
      <CCardFooter>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="mr-3"
          @click.prevent="addNewCategory"
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
import axiosInstance from '../../axiosInstance'

export default {
  data() {
    return {
      successAdd: "",
      error: "",
      category_name: "",
      category_description: "",
      countDown: 5,
      isLoading: false,
      /* data for validation */
      NameErrors: [],
      DescriptionErrors: [],
      validationForDescription: null,
      validationForName: null,
    };
  },
  computed:{
    /* computed methods for validation */
    validationName() {
      return this.NameErrors.length ? true : false;
    },
    validationDescription() {
      return this.DescriptionErrors.length ? true : false;
    },

  },
  methods: {
    /**
     *  Method to validate Name
     */
    validName: function(e) {
      console.log("valid Name ? ");
      this.NameErrors = [];

      if (!this.category_name) {
        this.NameErrors.push("Name should not be empty");
      }
      if (this.category_name.length < 4) {
        this.NameErrors.push("Name must be more than 4 characters");
      }

      this.validationForName = this.NameErrors.length
        ? "is-invalid"
        : "is-valid";
    },
    /**
     *  Method to validate Description
     */
    validDescription: function(e) {
      console.log("valid Description ? ");
      this.DescriptionErrors = [];

      if (!this.category_description) {
        this.DescriptionErrors.push("Description should not be empty");
      }
      if (this.category_description.length < 4) {
        this.DescriptionErrors.push("First Name must be more than 10 characters");
      }

      this.validationForDescription = this.DescriptionErrors.length
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
    addNewCategory() {
      this.isLoading = true;
      this.error = null;

      /**
       *  Call the validation methods Before send data to backend
       */
      this.validName();
      this.validDescription();

      /**
       *    Return if the errors is here
       */
      if (
        this.NameErrors.length ||
        this.DescriptionErrors.length 
      ) {
        this.isLoading = false;
        return;
      }
      

      const newCategory = {
          name: this.category_name,
          description: this.category_description
      }

      const apiAddRoute = "http://localhost:8000/api/administrator/categories";
      axiosInstance
        .post(apiAddRoute, newCategory)
        .then((res) => {
          console.log("After Done Axios ==> Create Category");
          this.isLoading = false;
          this.successAdd = "The insertion succeded";
          this.countDownTimer();
          this.$store.dispatch("loadCategories");
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
