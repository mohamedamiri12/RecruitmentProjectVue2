<template>
    <CRow>
    <CCol col="12" lg="6">
      <div class="card">
        <div class="card-header"><b>Contract id : {{ contract.id }}</b></div>
        <div class="card-body">

            <table class="table table-striped table-fixed text-center">
            <tbody>
              <tr>
                <th scope="col">client</th>
                <td>
                    <a href="" @click.prevent="showClient">
                        {{ contract.client.first_name + ' ' + contract.client.last_name }}
                    </a>
                </td>
              </tr>
              <tr>
                <th scope="col">Candidate</th>
                <td>
                    <a href="" @click.prevent="showCandidate">
                        {{ contract.candidate.first_name + ' ' + contract.candidate.last_name }}
                    </a>
                </td>
              </tr>
              <tr>
                <th scope="col">Description</th>
                <td>{{ contract.description }}</td>
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
  name: 'Contract',
  data () {
    return {
      contractsOpened: null,
    };
  },
  computed:{
    contract(){
      const id = parseInt(this.$route.params.id);
      return this.$store.getters.getContractById(id);
    }
  },
  methods: {
    goBack() {
      this.contractsOpened ? this.$router.go(-1) : this.$router.push({path: '/dash/contracts'})
    },
    showClient(){
        this.$router.push({path: '/dash/clients/'+ this.contract.client.id})
    },
    showCandidate(){
        this.$router.push({path: '/dash/candidates/'+ this.contract.candidate.id})
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