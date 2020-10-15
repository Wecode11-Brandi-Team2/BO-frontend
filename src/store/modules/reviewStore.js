import { inquiryApi } from '@/api';
import { fromNow, makeUp, makeQs } from '../_utils';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    selectType: '',
    selectValue: '',
    dateValue: 7,
    filterDateFrom: '',
    filterDateTo: '',
    inquiryType: 'regist',
    filterLimit: 10,
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
      const defaultTerm = 7;

      state.isLoading = false;
      state.selectType = '';
      state.selectValue = '';
      state.dateValue = 7;
      state.filterDateFrom = fromNow(defaultTerm);
      state.filterDateTo = new Date();
      state.inquiryType = 'regist';
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
    search({ dispatch, state }, status) {
      dispatch('setValue', { key: 'isLoading', value: true });
      const filters = makeUp(state);

      inquiryApi
        .getReviews(status, filters)
        .then(res => {
          dispatch('setValue', {
            key: 'filteredResult',
            value: res.data.review
          });
          dispatch('setValue', {
            key: 'page_number',
            value: res.data.page_number
          });
          dispatch('setValue', {
            key: 'total_order_number',
            value: res.data.total_order_number
          });
          setTimeout(() => {
            dispatch('setValue', { key: 'isLoading', value: false });
          }, 300);
        })
        .catch(err => {
          console.error(err);
          setTimeout(() => {
            dispatch('setValue', { key: 'isLoading', value: false });
          }, 300);
        });
    },
    searchByLimit({ dispatch }, { status, limit }) {
      dispatch('setValue', { key: 'filterLimit', value: limit });
      dispatch('search', status);
    },
    searchByPage({ dispatch }, { status, page }) {
      dispatch('setValue', { key: 'page', value: page });
      dispatch('search', status);
    },
    reset({ commit }) {
      commit('reset');
    }
  }
};
