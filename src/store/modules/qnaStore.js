import { inquiryApi } from '@/api';
import { fromNow, makeUp, makeQs } from '../_utils';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    selectType: '',
    selectValue: '',
    dateValue: 30,
    filterDateFrom: '',
    filterDateTo: '',
    inquiryType: '',
    filterLimit: 20,
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
      const defaultTerm = 30;

      state.isLoading = false;
      state.selectType = '';
      state.selectValue = '';
      state.dateValue = 30;
      state.filterDateFrom = fromNow(defaultTerm);
      state.filterDateTo = new Date();
      state.inquiryType = -1;
      state.filterLimit = 20;
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

      inquiryApi
        .getQna(status, filters)
        .then(res => {
          commit('setValue', { key: 'filteredResult', value: res.data.qna });
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
    searchByPage({ commit, dispatch }, { status, page }) {
      commit('setValue', { key: 'page', value: page });
      dispatch('search', status);
    },
    reset({ commit }) {
      commit('reset');
    }
  }
};
