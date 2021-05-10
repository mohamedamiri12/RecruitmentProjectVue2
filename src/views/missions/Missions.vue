<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <b class="d-block">Missions</b>
        <div class="box">
          <!-- Search Box -->
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
        <!-- Loading Spinner -->
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
        <!-- Missions Table for computer Screens -->
        <b-table
          v-if="missions.length"
          head-variant="dark"
          hover
          striped
          id="missions-table"
          :items="missions"
          :fields="fields"
          :per-page="perPage"
          :total-rows="rows"
          :current-page="currentPage"
          responsive
          @row-clicked="showMission"
          class="text-center"
        >
          <!-- Client Button -->
          <template #cell(client)="row">
            <div class="">
              <img
                :src="
                  'http://localhost:8000/storage/clientImages/' +
                    row.item.id +
                    '/' +
                    row.item.client.client_image
                "
                alt=""
                class="d-inline-block img-fluid img-client mx-3"
              />
              <p class="d-inline-block text-center client-name">
                {{
                  row.item.client.first_name + " " + row.item.client.last_name
                }}
              </p>
            </div>
          </template>
          <!-- Candidate Button -->
          <template #cell(candidate)="row">
            <div class="">
              <img
                :src="
                  'http://localhost:8000/storage/candidateImages/' +
                    row.item.id +
                    '/' +
                    row.item.candidate.candidate_image
                "
                alt=""
                class="d-inline-block img-fluid img-client mx-3"
              />
              <p class="d-inline-block text-center client-name">
                {{
                  row.item.candidate.first_name +
                    " " +
                    row.item.candidate.last_name
                }}
              </p>
            </div>
          </template>
          <!-- Actions Button -->
          <template #cell(actions)="row">
            <b-button
              size="sm"
              variant="success mr-2"
              @click="validateMission(row.item.id)"
              class="mr-2"
              ><i class="fas fa-check mr-2"></i> Validate</b-button
            >

            <b-button
              size="sm"
              variant="danger mr-2"
              @click="deleteMission(row.item.id)"
              ><i class="fas fa-trash-alt mr-2"></i> Delete</b-button
            >
          </template>
        </b-table>

        <!-- Missions Table for mobile Screens -->

        <div class="text-center no-items-box py-5" v-if="!missions.length">
          <i class="fas fa-ban" style="color:red"></i> No items to show
        </div>
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
          aria-controls="missions-table"
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
export default {
  name: "Missions",
  data() {
    return {
      fields: [
        { key: "client", label: "client" },
        { key: "candidate", label: "candidate" },
        { key: "start-date", label: "Start Date" },
        { key: "end-date", label: "End Date" },
        { key: "actions", label: "Actions" },
      ],
      errors: [],
      loadingStatus: false,
      error: "",
      currentPage: 1,
      perPage: 5,
      isLoading: false,
      isLoadingData: false,
      search: null,
    };
  },
  computed: {
    /**
     *  Return Users and Apply search filter
     */
    missions() {
      let missions = this.$store.getters.getMissions;
      if (this.search == null) return missions;
      return missions.filter((mission) => {
        return mission.description.match(this.search);
      });
    },
    rows() {
      return this.missions.length;
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
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    loadMissions() {
      this.isLoadingData = true;
      this.$store
        .dispatch("loadMissions")
        .then((result) => {
          this.isLoadingData = false;
        })
        .catch((error) => {
          this.isLoadingData = false;
          console.log(error.message);
          this.error = "There was an error while bringing data";
        });
    },
    deleteMission(id) {
      this.$store
        .dispatch("deleteMission", id)
        .then((res) => {
          this.success = "Missions's deleted successfully !!!";
          console.log("Mission's deleted successfully !!!");
          this.loadClients();
        })
        .catch((error) => {
          console.log(error.message);
          this.error = "The delete process failed";
        });
    },
    showMission(record) {
      let id = record.id;
      this.$router.push({ path: `missions/${id}` });
    },
  },
  created() {
    this.loadMissions();
  },
};
</script>

<style scoped>
.img-client {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.client-name {
  font-weight: 600;
}
</style>
