<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <b class="d-block">Categories</b>
        <div class="box">
          <div class="input-group">
            <div class="form-outline">
              <input
                id="search-input"
                type="search"
                class="form-control"
                placeholder="Search"
                v-model="search"
              />
            </div>
            <button id="search-button" type="button" class="btn btn-primary">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
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
                    ><i class="fas fa-expand-alt mr-2"></i>Show</b-button
                  >
                  <li class="list-inline-item">
                    <button class="btn btn-warning py-1 px-2">
                      <i class="fas fa-edit mr-2"></i>Edit
                    </button>
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
      <div class="card-footer text-muted w-100 d-flex justify-content-between">
        <div class=""></div>
        <b-pagination
          class="d-flex justify-content-center mt-2 mb-1"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="users-table"
          first-text="⏮"
          prev-text="⏪"
          next-text="⏩"
          last-text="⏭"
        ></b-pagination>
        <div class="mr-2 float-right mt-2">
          <button class="btn btn-success" @click="addNewCategory">
            <i class="fas fa-plus"></i> Add new category
          </button>
        </div>
      </div>
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
      currentPage: 1,
      perPage: 6,
      error: "",
      success: "",
      isLoadingData: false,
      search: null,
    };
  },
  computed: {
    rows() {
      return this.categories.length;
    },
    categories() {
      let categories = this.$store.getters.getCategories;
      if (this.search == null) return categories;
      return categories.filter((category) => {
        return category.name.match(this.search);
      });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.currentPage = Number(route.query.page);
        }
      },
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
    },
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
