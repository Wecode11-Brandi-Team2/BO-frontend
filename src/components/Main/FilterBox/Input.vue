<template>
  <div class="input">
    <div class="title-box">{{ title }} :</div>
    <div class="input-box">
      <input
        type="text"
        :value="value"
        :placeholder="placeholder"
        @change="setWord"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NAMESPACE from '@/store/modules/types';

export default {
  props: { title: String, filterKey: String, placeholder: String },
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
    setWord(e) {
      this.setValue(e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 15px;
  margin: 5px 0;
  margin-right: 30px;

  .title-box {
    width: 125px;
    height: 30px;
    padding: 7px 0 0 10px;
    font-size: 14px;
  }

  .input-box {
    input {
      height: 30px;
      max-width: 500px;
      width: 100%;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 2px 10px;
      font-size: 13px;
      line-height: 28px;
      color: #222222;
      background-color: white;
      outline: none;
      transition: border-color ease-in-out 0.15s;

      &:focus {
        border-color: #999;
      }
    }
  }
}
</style>
