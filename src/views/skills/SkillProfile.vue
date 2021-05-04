<template>
  <CCol md="12">
    <CCard>
      <CCardHeader>
        <strong>Edit Skill Profil</strong>
      </CCardHeader>
      <CCardBody>
        <div
          class="alert-success text-center my-3 px-4 py-3"
          v-if="successUpdate && countDown > 0"
        >
          {{ successUpdate }}
        </div>
        <div class="alert-danger text-center my-3 px-4 py-3" v-if="error && countDown > 0">
          {{ error }}
        </div>

        <div
          class="d-flex justify-content-center px-4 py-3 my-3"
          v-if="isLoading"
        >
          <b-spinner variant="success" label="Spinning"></b-spinner>
        </div>
        <form action="" enctype="multipart/form-data">
          <CInput
            description="Enter your skill name"
            label="Name"
            horizontal
            v-model="skill.name"
          />
        </form>
      </CCardBody>
      <CCardFooter>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="mr-3"
          @click="updateSkill"
        >
          <CIcon name="cil-check-circle" /> Submit</CButton
        >
        <CButton type="reset" size="sm" color="danger"
          ><CIcon name="cil-ban" /> Reset</CButton
        >
      </CCardFooter>
    </CCard>
  </CCol>
</template>

<script>
import axios from "axios";
export default {
  props: ["editedSkill"],
  data() {
    return {
      password: "",
      isLoading: false,
      successUpdate: "",
      error: "",
      countDown: 5,
    };
  },
  computed: {
    skill() {
      return this.editedSkill;
    },
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    updateSkill() {
      this.isLoading = true;

      const updatedSkill = new FormData();

      updatedSkill.append("name", this.skill.name);
      updatedSkill.append("_method", "PUT");

      const id = this.skill.id;

      const apiUpdateRoute =
        "http://localhost:8000/api/administrator/skills/" + id;
      const config = { headers: { "content-type": "multipart/form-data" } };

      axios
        .post(apiUpdateRoute, updatedSkill, config)
        .then((res) => {
          console.log("After Done Axios ==> update Skill");
          this.isLoading = false;
          this.successUpdate = "The update succeded";
          this.countDownTimer();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
          this.countDownTimer();
        });
    },
  },
};
</script>
