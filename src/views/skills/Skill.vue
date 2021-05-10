<template>
  <CRow>
    <CCol col="12" lg="6">
      <div class="card">
        <div class="card-header"><b>Skill id : {{ skill.id }}</b></div>
        <div class="card-body">
          <table class="table table-striped table-fixed text-center">
            <tbody>
              <tr>
                <th scope="col">Name</th>
                <td>{{ skill.name }}</td>
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
      <router-view :editedSkill="skill"></router-view>
    </CCol>
  </CRow>
</template>

<script>
import BaseCard from "../users/BaseCard.vue";
export default {
  name: "skill",
  components: {
    BaseCard,
  },
  data() {
    return {
      usersOpened: null,
    };
  },
  computed: {
    skill() {
      const id = parseInt(this.$route.params.id);
      console.log("id === " + id);
      return this.$store.getters.getSkillById(id);
    },
  },
  methods: {
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/dash/skills" });
    },
    showUpdateForm() {
      const id = this.$route.params.id;
      this.$router.push({ path: "/dash/skills/" + id + "/edit" });
    },
  },
};
</script>
