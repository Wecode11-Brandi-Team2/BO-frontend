import { orderApi } from '@/api';
import { fromNow, makeUp, makeQs } from '../_utils';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    selectFilter: '',
    filterKeyword: '',
    dateValue: 3,
    filterDateFrom: fromNow(3),
    filterDateTo: new Date(),
    filterRefndReason: '',
    mdSeNo: [],
    filterOrder: 'NEW',
    filterLimit: 50,
    page: 1,
    filteredResult: [],
    page_number: 0,
    total_order_number: 0
  },

  getters: {
    getFilters(state) {
      return makeQs(state, state.dateValue);
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
      const defaultTerm = 3;

      state.isLoading = false;
      state.selectFilter = '';
      state.filterKeyword = '';
      state.dateValue = defaultTerm;
      state.filterDateFrom = fromNow(defaultTerm);
      state.filterDateTo = new Date();
      state.filterRefndReason = '';
      state.mdSeNo = [];
      state.filterOrder = 'NEW';
      state.filterLimit = 50;
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
    search({ commit, state }, status) {
      commit('setValue', { key: 'isLoading', value: true });
      const filters = makeUp(state);

      orderApi
        .getOrder(status, filters)
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
    searchByOrder({ commit, dispatch }, { status, order }) {
      commit('setValue', { key: 'filterOrder', value: order });
      dispatch('search', status);
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
