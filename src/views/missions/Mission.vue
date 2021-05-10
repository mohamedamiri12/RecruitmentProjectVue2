<template>
    <CRow>
    <CCol col="12" lg="6">
      <div class="card">
        <div class="card-header"><b>Mission id : {{ mission.id }}</b></div>
        <div class="card-body">

            <table class="table table-striped table-fixed text-center">
            <tbody>
              <tr>
                <th scope="col">client</th>
                <td>
                    <a href="" @click.prevent="showClient">
                        {{ mission.client.first_name + ' ' + mission.client.last_name }}
                    </a>
                </td>
              </tr>
              <tr>
                <th scope="col">Candidate</th>
                <td>
                    <a href="" @click.prevent="showCandidate">
                        {{ mission.candidate.first_name + ' ' + mission.candidate.last_name }}
                    </a>
                </td>
              </tr>
              <tr>
                <th scope="col">Description</th>
                <td>{{ mission.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer text-muted">
          <button class="btn btn-primary float-left" @click="goBack">
            <i class="fas fa-undo-alt mr-2"></i>Back
          </button>
        </div>
      </div>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'Mission',
  data () {
    return {
      missionsOpened: null,
    };
  },
  computed:{
    mission(){
      const id = parseInt(this.$route.params.id);
      return this.$store.getters.getMissionById(id);
    }
  },
  methods: {
    goBack() {
      this.missionsOpened ? this.$router.go(-1) : this.$router.push({path: '/dash/missions'})
    },
    showClient(){
        this.$router.push({path: '/dash/clients/'+ this.mission.client.id})
    },
    showCandidate(){
        this.$router.push({path: '/dash/candidates/'+ this.mission.candidate.id})
    }
  }
}
</script>

<style scoped>
.list{
    list-style-type: none !important;
    width: 50%;
}
.list-title{
    font-weight: 600;
}
</style>