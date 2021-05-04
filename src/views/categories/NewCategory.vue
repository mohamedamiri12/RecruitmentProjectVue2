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
          <CInput
            description="Enter the category name"
            label="Category Name"
            horizontal
            v-model="category_name"
          />

          <div class="form-group">
            <label for="description">Category description</label>
            <textarea
              class="form-control"
              id="description"
              rows="3"
              v-model="category_description"
            ></textarea>
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
import axios from 'axios'
export default {
  data() {
    return {
      successAdd: "",
      error: "",
      category_name: "",
      category_description: "",
      countDown: 5,
      isLoading: false,
    };
  },
  methods: {
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

      const newCategory = {
          name: this.category_name,
          description: this.category_description
      }

      const apiAddRoute = "http://localhost:8000/api/administrator/categories";
      axios
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
