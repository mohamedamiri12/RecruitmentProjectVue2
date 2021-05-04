<template>
  <div class="skill mr-2 py-1 pl-3 pr-5 mr-2 mb-2 d-inline-block">
    <slot></slot>
    <span class="ml-2 delete-skill-button" @click="deleteSkill(skillId)">
      x
    </span>
  </div>
</template>

<script>
export default {
  props:['skillId','category_id'],
  data() {
    return{

    };
  },
  methods:{
    deleteSkill(id){
        const skill = this.$store.getters.getSkillById(id);
        this.$store.dispatch('deleteSkillFromCategory',{category_id: this.category_id, skill_id: skill.id})
        .then(res => {
            console.log('emit the event')
            this.$emit('delete');
        })
        .catch( error => {
            console.log(error.message);
        })
    },
  }
};
</script>

<style scoped>
.skill {
  border: 1px solid #e2e2e2;
  background-color: #f4f4f4;
  font-weight: 500;
  font-size: 1.1rem;
  color: #000;
  border-radius: 25px;
  position: relative;
}
.delete-skill-button {
  padding: 0px 9px;
  border-radius: 100%;
  background-color: #f4f4f4;
  color: #8a8888;
  font-weight: bold;
  position: absolute;
  right: 1%;
  top: 6%;
}
.delete-skill-button:hover {
  cursor: pointer;
}
</style>
