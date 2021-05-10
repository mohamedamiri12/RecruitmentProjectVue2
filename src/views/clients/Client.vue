<template>
  <CRow>
    <CCol col="12" lg="6">
      <div class="card">
        <div class="card-header">
          <b>Client id : {{ client.id }}</b>
        </div>
        <div class="card-body">
           <!-- Client Image -->
          <img
            :src="
              'http://localhost:8000/storage/clientImages/' +
                client.id +
                '/' +
                client.client_image
            "
            alt=""
            class="d-block img-fluid img-profile mb-4"
          />
          <table class="table table-striped table-fixed text-center">
            <tbody>
              <tr>
                <th scope="col">first_name</th>
                <td>{{ client.first_name }}</td>
              </tr>
              <tr>
                <th scope="col">last_name</th>
                <td>{{ client.last_name }}</td>
              </tr>
              <tr>
                <th scope="col">email</th>
                <td>{{ client.email }}</td>
              </tr>
              <tr>
                <th scope="col">Phone Number</th>
                <td>{{ client.phone_number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer text-muted">
          <button class="btn btn-primary float-left" @click="goBack">
           <i class="fas fa-undo-alt mr-2"></i> Back
          </button>
          <button class="btn btn-warning float-right" @click="showUpdateForm">
            <i class="fas fa-edit mr-2"></i>Edit
          </button>
        </div>
      </div>
    </CCol>
    <CCol col="12" lg="6">
      <router-view :editedClient="client"></router-view>
    </CCol>
    <CCol col="12" lg="6" v-if="client.missions.length">
      <div class="card">
        <div class="card-header">
          <b>Client's missions : {{ client.missions.length }} missions</b>
        </div>
        <div class="card-body">
          <table class="table table-fixed text-center">
            <tbody>
              <tr v-for="(mission,index) in client.missions" :key="mission.id">
                <th scope="col">Mission : {{ index + 1 }}</th>
                <td>{{ mission.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CCol>
  </CRow>
</template>

<script>
import BaseCard from "../users/BaseCard.vue";
export default {
  name: "CLient",
  components: {
    BaseCard,
  },
  data() {
    return {
      usersOpened: null,
    };
  },
  computed: {
    client() {
      const id = parseInt(this.$route.params.id);
      console.log("id === " + id);
      return this.$store.getters.getClientById(id);
    },
  },
  methods: {
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/dash/clients" });
    },
    showUpdateForm() {
      const id = this.$route.params.id;
      this.$router.push({ path: "/dash/clients/" + id + "/edit" });
    },
  },
  created(){
    if(this.client == null ){
      console.log('logged here');
      this.$store.dispatch('loadClients'); 
    }
  }
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
