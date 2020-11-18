<template>
  <div class="select">
    <div v-if="title" class="title-box">{{ title }} :</div>
    <div v-if="options" class="select-box">
      <select @change="setSearch">
        <option
          :key="key"
          v-for="[key, title] of Object.entries(options)"
          :value="key"
          :selected="value === +key"
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
    title: { type: [String, null], required: false },
    filterKey: String
  },
  data() {
    return {
      namespace: this.$route.params.subMenu
    };
  },
  computed: {
    ...mapState({
      getValue(state, getters) {
        return getters[NAMESPACE[this.namespace] + `/getValue`](this.filterKey);
      }
    }),
    value() {
      return this.getValue;
    }
  },
  methods: {
    ...mapActions({
      setValue(dispatch, value) {
        return dispatch(NAMESPACE[this.namespace] + `/setValue`, {
          key: this.filterKey,
          value
        });
      }
    }),
    setSearch(e) {
      this.setValue(e.target.value);
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
  margin-right: 100px;

  .title-box {
    width: 125px;
    height: 30px;
    padding: 7px 0 0 10px;
    font-size: 14px;
  }

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
