import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
      access_token: state.access_token,
      isUserLogged: state.isUserLogged,
      administrator: state.administrator,
    }),
});

