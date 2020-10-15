export default {
  namespaced: true,
  state: {
    isLogin: localStorage.getItem('access_token') ? true : false
  },

  getters: {
    isLogin(state) {
      return state.isLogin;
    }
  },

  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    }
  },

  actions: {
    login({ commit }, token) {
      localStorage.setItem('access_token', token);
      commit('login');
    },
    logout({ commit }) {
      localStorage.removeItem('access_token');
      commit('logout');
    }
  }
};
