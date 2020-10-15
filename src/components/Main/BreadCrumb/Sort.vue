<template>
  <div class="select">
    <div v-if="options" class="select-box">
      <select @change="search">
        <option
          :key="key"
          v-for="[key, title] of Object.entries(options)"
          :value="key"
          :selected="sort === +key"
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
      getFilterOrder(state, getters) {
        return getters[NAMESPACE[this.namespace] + `/getValue`]('filterOrder');
      }
    }),
    sort() {
      return this.getFilterOrder;
    }
  },
  methods: {
    ...mapActions({
      searchByOrder(dispatch, payload) {
        return dispatch(NAMESPACE[this.namespace] + `/searchByOrder`, payload);
      }
    }),
    search(e) {
      this.searchByOrder({ status: this.orderStatus, order: e.target.value });
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
