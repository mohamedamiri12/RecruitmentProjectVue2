const mutations = {
    toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
    state[variable] = value
    },

/**
 *      Users Mutations Section : 
 */    

    /**
     *      Set Comming Users From Api To State
     */

    SAVE_USERS(state, payload){
        state.users=payload;
    },

    /**
     *      set users number
     */

    SAVE_USERS_NUMBER(state, payload){
        state.usersNumber = payload
    },

    /**
     *      Change The User Spinner Status
     */

    UPDATE_USER_SPINNER(state, payload){
        state.userSpinner = payload;
    },

    setUsers(state,payload){
        console.log(payload);
        state.users.push(payload.users);
        console.log(state.users);
    },
    getUserById(state,payload){
        let useer = (state.users).find((user) =>{
            user.id == payload
        });
        return useer;
    },
    SET_TOKEN_ACCESS(state,payload){
        state.access_token = payload
    },
    SET_USER_LOGGED_STATUS(state,payload){
        state.isUserLogged = payload;
    },

/**
 *      Clients Mutations Section : 
 */    

    /**
     *      Set Comming Clients From Api To State
     */

     SAVE_CLIENTS(state, payload){
        state.clients = payload;
    },

    /**
 *      candidates Mutations Section : 
 */    

    /**
     *      Set Comming Clients From Api To State
     */

     SAVE_CANDIDATES(state, payload){
        state.candidates = payload;
    },

/**
 *      Categories Mutations Section : 
 */    

    /**
     *      Set Comming Categories From Api To State
     */

     SAVE_CATEGORIES(state, payload){
        state.categories = payload;
    },

/**
 *      Categories Mutations Section : 
 */    

    /**
     *      Set Comming Categories From Api To State
     */

     SAVE_SKILLS(state, payload){
        state.skills = payload;
    },

/**
 *      Missions Mutations Section : 
 */    

    /**
     *      Set Comming Missions From Api To State
     */

     SAVE_MISSIONS(state, payload){
        state.missions = payload;
    },
    /**
 *      Contracts Mutations Section : 
 */    

    /**
     *      Set Comming Contracts From Api To State
     */

     SAVE_CONTRACTS(state, payload){
        state.contracts = payload;
    },
/**
 *      Registration Mutations Section : 
 */    

    /**
     *      Set Actif Administrator to State
     */
    SET_ACTIF_ADMINISTRATOR(state,payload){
        state.administrator = payload;
    }
}


export default mutations;

