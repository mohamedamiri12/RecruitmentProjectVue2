<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <b>categories</b>
        <button class="btn btn-success" @click="addNewCategory">Add new Category</button>
      </div>
      <div class="card-body">
        <!-- Categories List -->
        <div class="row">
          <div
            class="col-4 mb-3"
            v-for="category in categories"
            :key="category.id"
            :ref="'category' + category.id"
          >
            <div class="card h-100">
              <div
                class="card-header d-flex justify-content-between pl-3 pr-2 bg-dark"
              >
                <h3 class="category-title float-left">{{ category.name }}</h3>
                <span
                  class="float-left d-block delete-category-button"
                  @click="deleteCategory(category.id)"
                  >x</span
                >
              </div>
              <div class="card-body">
                <base-skill v-if="category.skills.length == 0"
                  >No skills to show
                </base-skill>
                <base-skill v-for="skill in category.skills" :key="skill.id">{{
                  skill.name
                }}</base-skill>
              </div>
              <div class="card-footer pl-3">
                <ul class="list-inline m-0">
                  <b-button
                    class="btn btn-primary py-1 px-2 mr-2"
                    @click="showCategory(category.id)"
                    >Show</b-button
                  >
                  <li class="list-inline-item">
                    <button class="btn btn-warning py-1 px-2">Edit</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Data Spinner -->
        <div
          class="d-flex justify-content-center px-4 py-3 my-3"
          v-if="isLoadingData"
        >
          <b-spinner
            variant="primary"
            label="Spinning"
            class="mr-3"
          ></b-spinner>
          Loading ...
        </div>
      </div>
      <div class="card-footer text-muted w-100"></div>
    </div>
  </div>
</template>

<script>
import BaseSkill from "./BaseSkill.vue";
export default {
  components: {
    BaseSkill,
  },
  data() {
    return {
      error: '',
      success: '',
      isLoadingData: false,
    };
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    addNewCategory(id) {
      this.$router.push({ path: `categories/add` });
    },
    loadCategories() {
      this.isLoadingData = true;
      this.$store
        .dispatch("loadCategories")
        .then((result) => {
          this.isLoadingData = false;
          console.log(result);
        })
        .catch((error) => {
          this.isLoadingData = false;
        });
    },
    deleteCategory(id) {
      this.$store
        .dispatch("deleteCategory", id)
        .then((res) => {
          this.success = "Category's deleted successfully !!!";
          console.log("Category's deleted successfully !!!");
          this.loadCategories();
        })
        .catch((error) => {
          console.log(error.message);
          this.error = "The delete process failed";
        });
    },
    showCategory(id) {
      this.$router.push({ path: `categories/${id}` });
    }
  },
  created() {
    this.loadCategories();
  },
};
</script>

<style scoped>
.category-title {
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
}
.delete-category-button {
  font-weight: bold;
  padding: 0px 9px;
  border-radius: 100%;
  background-color: #827d7d;
  color: #fff;
}
.delete-category-button:hover {
  background-color: #767171;
  cursor: pointer;
}
</style>
