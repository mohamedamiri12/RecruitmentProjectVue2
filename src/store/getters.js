import state from "./state";

const getters = {
  /**
   *  Token Getters
   */
  getToken(state){
    return state.access_token;
  },
  /**
   *     Users Section
   */
  /**
   *      Get Users From Globale State
   */

  getUsers(state) {
    return state.users;
  },
  getUserById2: (state) => (id) => {
    console.log("the User ");
    const actifUser = state.users.find((user) => user.id == id);
    console.log(actifUser);
    return actifUser;
  },
  getActifAdministrator(state) {
    return state.administrator;
  },
  getUsersNumber(state){
    console.log('users number : '+ state.usersNumber)
    return state.usersNumber;
  },

  /**
   *     Clients Section
   */
  /**
   *      Get Clients From Globale State
   */
  getClients(state) {
    return state.clients;
  },
  getClientById: (state) => (id) => {
    console.log("the Client ");
    return state.clients.find((client) => client.id == id);
  },
  /**
   *     Candidates Section
   */
  /**
   *      Get Candidates From Globale State
   */
  getCandidates(state) {
    return state.candidates;
  },
  getCandidateById: (state) => (id) => {
    console.log("the Candidate ");
    return state.candidates.find((candidate) => candidate.id == id);
  },

  /**
   *     Categories Section
   */
  /**
   *      Get Categories From Globale State
   */
  getCategories(state) {
    return state.categories;
  },
  getCategoryById: (state) => (id) => {
    console.log("the Category ");
    return state.categories.find((category) => category.id == id);
  },
  /**
   *     Skills Section
   */
      /**
       *      Get Skills From Globale State
       */
      getSkills(state) {
        return state.skills;
      },
      getSkillById: (state) => (id) => {
        return state.skills.find((skill) => skill.id == id);
      },
      /**
   *      Get Missions From Globale State
   */
   getMissions(state) {
    return state.missions;
  },
  getMissionById: (state) => (id) => {
    console.log("the Mission ");
    return state.missions.find((mission) => mission.id == id);
  },

  /**
   *      Get Contracts From Globale State
   */
   getContracts(state) {
    return state.contracts;
  },
  getContractById: (state) => (id) => {
    console.log("the Contract ");
    return state.contracts.find((contract) => contract.id == id);
  },
};

export default getters;
