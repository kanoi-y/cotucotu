import firebase from "~/plugins/firebase";

export const state = () => ({
  userUid: "",
  userName: "",
  status: "logout"
});

export const mutations = {
  setUser(state, user) {
    state.userUid = user.uid;
    state.userName = user.displayName;
    state.status = "login";
  },
  logout(state) {
    state.userUid = "";
    state.userName = "";
    state.status = "logout";
  }
};

export const actions = {
  login({ commit }) {
    console.log("login action");
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        const user = result.user;
        // user.status = "login";
        commit("setUser", user);
      })
      .catch(function(error) {
        var errorCode = error.code;
        console.log("error : " + errorCode);
      });
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("logout");
      });
  }
};

export const getters = {
  getUserUid(state) {
    return state.userUid;
  },
  getUserName(state) {
    return state.userName;
  },
  getStatus(state) {
    return state.status;
  }
};
