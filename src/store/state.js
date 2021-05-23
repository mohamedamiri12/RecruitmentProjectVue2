const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    /**
     *      Users State
     */
    users: [],
    usersSpinner: false,
    administrator: null,
    access_token: '',
    isUserLogged: false,
    usersNumber: null,
    /**
     *      Clients State
     */

    clients: [],

    /**
     *      Categories State
     */
    categories: [],

    /**
     *      Skills State
     */
    skills: [],

    
    /**
     *      Candidates State
     */
     candidates: [],

     /**
     *      Missions State
     */
      missions: [],

      /**
     *      Contracts State
     */
       contracts: [],
}

export default state;