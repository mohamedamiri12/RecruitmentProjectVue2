<template>
  <CRow>
    <CCol col="12" lg="6">
      <div class="card">
        <div class="card-header">
          <h3 class=" category-title float-left">{{ category.name }}</h3>
        </div>
        <div class="card-body">
          <base-skill v-if="category.skills.length == 0"
            >No skills to show
          </base-skill>
          <base-skill
            v-for="skill in category.skills"
            :key="skill.id"
            :skillId="skill.id"
            :category_id="category.id"
            @delete="loadCategories"
            >{{ skill.name }}
          </base-skill>
          <!-- Categories List -->
        </div>
        <div class="card-footer text-muted">
          <!-- Add skill to Category Form -->
          <div class="d-flex justify-content-between mb-3">
            <b-form-select
              v-model="selected"
              :options="options"
              class="select-form"
            ></b-form-select>
            <button class="btn btn-warning float-right" @click="addSkill">
              Add Skill
            </button>
          </div>

          <button class="btn btn-primary float-left" @click="goBack">
            Back
          </button>
          <button class="btn btn-warning float-right" @click="showUpdateForm">
            Edit
          </button>
        </div>
      </div>
    </CCol>

    <CCol col="12" lg="6">
      <router-view></router-view>
    </CCol>
  </CRow>
</template>

<script>
import BaseSkill from "./BaseSkill";
export default {
  components: {
    BaseSkill,
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    skills() {
      return this.$store.getters.getSkills;
    },
    category() {
      const id = parseInt(this.$route.params.id);
      return this.$store.getters.getCategoryById(id);
    },
    options() {
      const skills = this.$store.getters.getSkills;
      /*const filtredSkills = skills.filter((skill) => {
        this.category.skills.forEach(function(categorySkill) {
         if( categorySkill.id != skill.id ) return skill;
        });
      });*/
      const options = [
        {
          value: null,
          text: "Please select an option",
        },
      ];
      skills.forEach(function(skill) {
        const option = {
          value: skill.id,
          text: skill.name,
        };
        options.push(option);
      });
      return options;
    },
  },
  methods: {
    loadSkills() {
      this.$store
        .dispatch("loadSkills")
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {});
    },
    loadCategories() {
      this.$store.dispatch("loadCategories");
    },
    addSkill() {
      if (this.selected == null) {
        return;
      }
      const skill = this.$store.getters.getSkillById(this.selected);
      this.$store
        .dispatch("addSkillToCategory", {
          category_id: this.category.id,
          skill_id: skill.id,
        })
        .then((res) => {
          this.loadCategories();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/dash/categories" });
    },
    showUpdateForm() {},
  },
  created() {
    this.loadSkills();
  },
};
</script>

<style scoped>
.select-form {
  width: 80%;
}
</style>
