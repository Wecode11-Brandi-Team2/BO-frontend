import { productApi } from '@/api';
import { fromNow, makeUp, makeQs } from '../_utils';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    selectFilter: '',
    filterKeyword: '',
    filterDateFrom: fromNow(3),
    filterDateTo: new Date(),
    mdName: '',
    mdSeNo: [],
    discountYn: -1,
    exhibitionYn: -1,
    sellYn: -1,
    filterLimit: 10,
    page: 1,
    filteredResult: [],
    page_number: 0,
    total_order_number: 0
  },

  getters: {
    getFilters(state) {
      return makeQs(state);
    },
    getValue: state => key => {
      return state[key];
    }
  },

  mutations: {
    setValue(state, { key, value }) {
      state[key] = value;
    },
    reset(state) {
      state.isLoading = false;
      state.selectFilter = '';
      state.filterKeyword = '';
      state.filterDateFrom = '';
      state.filterDateTo = '';
      state.mdName = '';
      state.mdSeNo = [];
      state.discountYn = -1;
      state.exhibitionYn = -1;
      state.sellYn = -1;
      state.filterLimit = 10;
      state.page = 1;
      state.filteredResult = [];
      state.page_number = 0;
      state.total_order_number = 0;
    }
  },

  actions: {
    setValue({ commit }, payload) {
      commit('setValue', payload);
    },
    search({ commit, state }) {
      commit('setValue', { key: 'isLoading', value: true });
      const filters = makeUp(state);

      productApi
        .getProducts(filters)
        .then(res => {
          commit('setValue', { key: 'filteredResult', value: res.data.orders });
          commit('setValue', {
            key: 'page_number',
            value: res.data.page_number
          });
          commit('setValue', {
            key: 'total_order_number',
            value: res.data.total_order_number
          });
          setTimeout(() => {
            commit('setValue', { key: 'isLoading', value: false });
          }, 300);
        })
        .catch(err => {
          console.error(err);
          setTimeout(() => {
            commit('setValue', { key: 'isLoading', value: false });
          }, 300);
        });
    },
    searchByLimit({ commit, dispatch }, { status, limit }) {
      commit('setValue', { key: 'filterLimit', value: limit });
      dispatch('search', status);
    },
    searchByPage({ commit, dispatch }, { status, page }) {
      commit('setValue', { key: 'page', value: page });
      dispatch('search', status);
    },
    reset({ commit }) {
      commit('reset');
    }
  }
};
