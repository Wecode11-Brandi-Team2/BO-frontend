<template>
  <div class="select">
    <div v-if="options" class="select-box">
      <select @change="search">
        <option
          :key="key"
          v-for="[key, title] of Object.entries(options)"
          :value="key"
          :selected="limit === +key"
          >{{ title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NAMESPACE from '@/store/modules/types';

export default {
  props: {
    options: Object,
    orderStatus: Number
  },
  data() {
    return {
      namespace: this.$route.params.subMenu
    };
  },
  computed: {
    ...mapState({
      getLimit(state, getters) {
        return getters[NAMESPACE[this.namespace] + `/getValue`]('filterLimit');
      }
    }),
    limit() {
      return this.getLimit;
    }
  },
  methods: {
    ...mapActions({
      searchByLimit(dispatch, payload) {
        return dispatch(NAMESPACE[this.namespace] + `/searchByLimit`, payload);
      }
    }),
    search(e) {
      this.searchByLimit({ status: this.orderStatus, limit: e.target.value });
    }
  }
};
</script>

<style lang="scss">
.select {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;

  .select-box {
    padding-right: 5px;

    select {
      height: 30px;
      width: 100%;
      max-width: 140px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 2px 10px;
      font-size: 13px;
      line-height: 28px;
      color: #333333;
      background-color: white;
      outline: none;
      transition: border-color ease-in-out 0.15s;

      optgroup {
        font-weight: 700;
      }

      &:focus {
        border-color: #999;
      }
    }
  }
}
</style>
