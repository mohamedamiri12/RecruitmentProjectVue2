import state from "./state";
import axios from "axios";

//import getHeader from "../config.js";

//axiosInstance.defaults.headers.common['Accept'] = getHeader().Accept;
//axiosInstance.defaults.headers.common['Authorization'] = getHeader().Authorization;

import axiosInstance from "../axiosInstance";

const actions = {
  /**
   *      Users Section
   */
  setUsers(context, payload) {
    context.commit("setUsers", payload);
  },
  getUserById(context, payload) {
    context.commit("getUserById", payload);
  },
  /**
   *  count users From Api
   */
  countUsers() {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("http://localhost:8000/api/administrators/count")
        .then((result) => {
          context.commit("SAVE_USERS_NUMBER", result.data);
          resolve(res);
        })
        .catch((error) => {
          console.log("errror");
          reject(error)
        });
    });
  },

  /**
   *  Load Users From Api
   */
  loadUsers(context) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("http://localhost:8000/api/administrators")
        .then((result) => {
          context.commit("SAVE_USERS", result.data);
          resolve(result);
        })
        .catch((error) => {
          console.log(error.message.data);
          reject(error);
        });
    });
  },
  /**
   *      Clients Section
   */

  /**
   *  Load actions From Api
   */
  loadClients(context) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("http://localhost:8000/api/administrator/clients")
        .then((result) => {
          resolve(result);
          context.commit("SAVE_CLIENTS", result.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error.message);
        });
    });
  },
  /**
   *  DElete Client and Update Local State
   */
  deleteClient(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      console.log(payload);
      console.log("http://localhost:8000/api/administrator/clients/" + payload);
      axiosInstance
        .delete("http://localhost:8000/api/administrator/clients/" + payload)
        .then((res) => {
          console.log("After delete Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  /**
   *      Candidates Section
   */

  /**
   *  Load actions From Api
   */
  loadCandidates(context) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("http://localhost:8000/api/administrator/candidates")
        .then((result) => {
          resolve(result);
          context.commit("SAVE_CANDIDATES", result.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error.message);
        });
    });
  },
  /**
   *  DElete Client and Update Local State
   */
  deleteCandidate(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      console.log(payload);
      console.log(
        "http://localhost:8000/api/administrator/candidates/" + payload
      );
      axiosInstance
        .delete("http://localhost:8000/api/administrator/candidates/" + payload)
        .then((res) => {
          console.log("After delete Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  /**
   *      Categories Section
   */

  /**
   *  Load categories From Api
   */
  loadCategories(context) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("http://localhost:8000/api/administrator/categories")
        .then((result) => {
          context.commit("SAVE_CATEGORIES", result.data);
          resolve(result.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error.message);
        });
    });
  },
  /**
   *  Delete category with Api
   */
  deleteCategory(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      axiosInstance
        .delete("http://localhost:8000/api/administrator/categories/" + payload)
        .then((res) => {
          console.log("After delete Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  /**
   *        Skills Section
   */
  /**
   *  Load actions From Api
   */
  loadSkills(context) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("http://localhost:8000/api/administrator/skills")
        .then((result) => {
          resolve(result.data);
          context.commit("SAVE_SKILLS", result.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error.message);
        });
    });
  },
  /**
   *  DElete Candidate and Update Local State
   */
  deleteSkill(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      console.log(payload);
      console.log("http://localhost:8000/api/administrator/skills/" + payload);
      axiosInstance
        .delete("http://localhost:8000/api/administrator/skills/" + payload)
        .then((res) => {
          console.log("After delete Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  /**
   *  Add Skill To Category Action
   */
  addSkillToCategory(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      const newSkillRequest = {
        new_skill_id: payload.skill_id,
      };
      axiosInstance
        .post(
          "http://localhost:8000/api/administrator/categories/" +
            payload.category_id +
            "/addSkill",
          newSkillRequest
        )
        .then((res) => {
          console.log("After Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  /**
   *  DElete Skill From Category Action
   */
  deleteSkillFromCategory(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      const oldSkillRequest = {
        old_skill_id: payload.skill_id,
      };
      axiosInstance
        .post(
          "http://localhost:8000/api/administrator/categories/" +
            payload.category_id +
            "/deleteSkill",
          oldSkillRequest
        )
        .then((res) => {
          console.log("After Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  /**
   *      Missions Section
   */

  /**
   *  Load Missions From Api
   */
  loadMissions(context) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("http://localhost:8000/api/administrator/missions")
        .then((result) => {
          resolve(result);
          context.commit("SAVE_MISSIONS", result.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error.message);
        });
    });
  },
  /**
   *  DElete Mission and Update Local State
   */
  deleteMission(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      console.log(payload);
      console.log(
        "http://localhost:8000/api/administrator/missions/" + payload
      );
      axiosInstance
        .delete("http://localhost:8000/api/administrator/missions/" + payload)
        .then((res) => {
          console.log("After delete Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  /**
   *      Contracts Section
   */

  /**
   *  Load Contracts From Api
   */
  loadContracts(context) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("http://localhost:8000/api/administrator/contracts")
        .then((result) => {
          resolve(result);
          context.commit("SAVE_CONTRACTS", result.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error.message);
        });
    });
  },
  /**
   *  DElete Contract and Update Local State
   */
  deleteContract(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      console.log(payload);
      console.log(
        "http://localhost:8000/api/administrator/contracts/" + payload
      );
      axiosInstance
        .delete("http://localhost:8000/api/administrator/contracts/" + payload)
        .then((res) => {
          console.log("After delete Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  /**
   *      Registration Section
   */

  /**
   *  Sign In Action
   */
  loginPerform({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      axios
        .post("http://localhost:8000/api/auth/login", payload)
        .then((res) => {
          console.log("After Done axiosInstance");
          //context.commit("SET_ACTIF_ADMINISTRATOR", res.data.administrator);
          commit("SET_TOKEN_ACCESS", res.data.access_token);
          //commit("SET_USER_LOGGED_STATUS", true);
          localStorage.setItem("token", res.data.access_token);
          //localStorage.setItem("admin", JSON.stringify(res.data.administrator));
          //console.log(res.data);
          /**
           *  get the actif Admin
           */
           dispatch("getActifAdmin", res.data.access_token);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  /**
   *  Check Administrator status
  */
   getActifAdmin({ commit, getters }) {
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + getters.getToken;
    axios
      .post("http://localhost:8000/api/auth/me")
      .then((response) => {
        commit("SET_USER_LOGGED_STATUS", true);
        commit("SET_ACTIF_ADMINISTRATOR", response.data);
      })
      .catch((error) => {
        console.log("status : " + error.response);
        commit("SET_USER_LOGGED_STATUS", false);
      });
  },

  /**
   *  REgistration Action
   */
  registrationPerform(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      axiosInstance
        .post("http://localhost:8000/api/auth/register", payload)
        .then((res) => {
          console.log("After Done axiosInstance");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  /**
   *  LogOut Action
   */

  logoutPerform(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before axiosInstance");
      axiosInstance
        .post("http://localhost:8000/api/auth/logout", {
          token: state.access_token,
        })
        .then((res) => {
          console.log("After Done Logout axiosInstance");
          context.commit("SET_ACTIF_ADMINISTRATOR", null);
          context.commit("SET_TOKEN_ACCESS", null);
          context.commit("SET_USER_LOGGED_STATUS", false);
          localStorage.removeItem("token");
          localStorage.removeItem("admin");
          resolve(res);
        })
        .catch((error) => {
          console.log(error.response.data);
          reject(error);
        });
    });
  },
};

export default actions;
