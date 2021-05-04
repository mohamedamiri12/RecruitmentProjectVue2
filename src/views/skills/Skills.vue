<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header"><b>Skills</b></div>
      <div class="card-body">
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
        <!-- Users Table -->
        <b-table
          head-variant="dark"
          hover
          striped
          id="skills-table"
          :items="skills"
          :fields="fields"
          :per-page="perPage"
          :total-rows="rows"
          :current-page="currentPage"
          class="text-center"
        >
          <!-- Actions Button -->
          <template #cell(actions)="row">
            <b-button
              size="sm"
              variant="primary mr-2"
              @click="showSkill(row.item.id)"
              class="mr-2"
              >Show</b-button
            >

            <b-button
              size="sm"
              variant="danger mr-2"
              @click="deleteSkill(row.item.id)"
              >Delete</b-button
            >
          </template>
        </b-table>
      </div>
      <!-- Loading Data Spinner -->
      <div
        class="d-flex justify-content-center px-4 py-3 my-3"
        v-if="isLoadingData"
      >
        <b-spinner variant="primary" label="Spinning" class="mr-3"></b-spinner>
        Loading ...
      </div>
      <div class="card-footer text-muted w-100">
        <b-pagination
          class="d-flex justify-content-center mt-2 mb-1"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="skills-table"
          first-text="⏮"
          prev-text="⏪"
          next-text="⏩"
          last-text="⏭"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Skills",
  data() {
    return {
      showModalStatus: false,
      fields: [
        { key: "name", label: "Name" },
        { key: "actions", label: "Actions" },
      ],
      isLoading: false,
      currentPage: 1,
      activePage: 1,
      error: "",
      success: "",
      perPage: 5,
      numberOfItems: 0,
      headVariant: "dark",
      isLoadingData: false,
    };
  },
  computed: {
    skills() {
      return this.$store.getters.getSkills;
    },
    rows() {
      return this.skills.length;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      },
    },
  },
  methods: {
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    showSkill(id) {
      this.$router.push({ path: `skills/${id}` });
    },
    loadSkills() {
      this.isLoadingData = true;
      this.$store
        .dispatch("loadSkills")
        .then((result) => {
          this.isLoadingData = false;
        })
        .catch((error) => {
          this.isLoadingData = false;
        });
    },
    loadSkillsAfterUpdate() {
      this.$store
        .dispatch("loadSkills")
        .then((result) => {})
        .catch((error) => {});
    },
    deleteSkill(id) {
      this.$store
        .dispatch("deleteSkill", id)
        .then((res) => {
          this.success = "Skill's deleted successfully !!!";
          console.log("Skill's deleted successfully !!!");
          this.loadSkills();
        })
        .catch((error) => {
          console.log(error.message);
          this.error = "The delete process failed";
        });
    },
    showModal(status) {
      console.log(status);
      this.showModalStatus = status;
    },
  },
  created() {
    this.loadSkills();
  },
};
</script>

<style scoped>
.table-thead div table thead {
  background-color: #212529;
  color: #fff;
}
</style>
