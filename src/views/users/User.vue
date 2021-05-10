<template>
  <CRow>
    <CCol col="12" lg="6">
      <div class="card">
        <div class="card-header">
          <b>User id : {{ user.id }}</b>
        </div>
        <div class="card-body">
          <!-- User Image -->
          <img
            :src="
              'http://localhost:8000/storage/administratorImages/' +
                user.id +
                '/' +
                user.administrator_image
            "
            alt=""
            class="d-block img-fluid img-profile mb-4"
          />
          <table class="table table-striped table-fixed text-center">
            <tbody>
              <tr>
                <th scope="col">first_name</th>
                <td>{{ user.first_name }}</td>
              </tr>
              <tr>
                <th scope="col">last_name</th>
                <td>{{ user.last_name }}</td>
              </tr>
              <tr>
                <th scope="col">email</th>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <th scope="col">Phone Number</th>
                <td>{{ user.phone_number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer text-muted">
          <button class="btn btn-primary float-left" @click="goBack">
            <i class="fas fa-undo-alt mr-2"></i>Back
          </button>
          <button class="btn btn-warning float-right" @click="showUpdateForm">
            <i class="fas fa-edit mr-2"></i>Edit
          </button>
        </div>
      </div>
    </CCol>
    <CCol col="12" lg="6">
      <router-view :editedUser="user"></router-view>
    </CCol>
  </CRow>
</template>

<script>
import BaseCard from "./BaseCard.vue";
export default {
  name: "User",
  components: {
    BaseCard,
  },
  data() {
    return {
      usersOpened: null,
    };
  },
  computed: {
    user() {
      const id = parseInt(this.$route.params.id);
      console.log("id === " + id);
      return this.$store.getters.getUserById2(id);
    },
  },
  methods: {
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/dash/users" });
    },
    showUpdateForm() {
      const id = this.$route.params.id;
      this.$router.push({ path: "/dash/users/" + id + "/edit" });
    },
  },
};
</script>


<style scoped>
.img-profile{
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: 0 auto;
  box-shadow: 0 0 30px 6px rgba(37,50,70,.1);
}
</style>