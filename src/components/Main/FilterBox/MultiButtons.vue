<template>
  <div class="button-block">
    <div class="title-box">{{ title }} :</div>
    <ul class="button-box">
      <li :class="['button', isAll && 'checked']" @click="setAll">
        전체
      </li>
      <li
        :class="['button', sellerType.includes(+key) && 'checked']"
        :key="key"
        v-for="[key, value] of Object.entries(buttons)"
        @click="setChecked(+key)"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NAMESPACE from '@/store/modules/types';

export default {
  props: { title: String, buttons: Object, default: Number },
  data() {
    return {
      namespace: this.$route.params.subMenu
    };
  },
  computed: {
    ...mapState({
      getSellerType(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue']('mdSeNo');
      }
    }),
    sellerType() {
      return this.getSellerType;
    },
    isAll() {
      return (
        this.sellerType.length === Object.keys(this.buttons).length ||
        this.sellerType.length === 0
      );
    }
  },
  methods: {
    ...mapActions({
      setSellerType(dispatch, value) {
        return dispatch(NAMESPACE[this.namespace] + '/setValue', {
          key: 'mdSeNo',
          value
        });
      }
    }),
    setChecked(key) {
      const newChecked = [...this.sellerType];
      let index;
      if ((index = newChecked.indexOf(key)) !== -1) {
        newChecked.splice(index, 1);
      } else {
        newChecked.push(key);
      }
      this.setSellerType(newChecked.sort((a, b) => a - b));
      if (this.isAll) this.setAll();
    },
    setAll() {
      this.setSellerType([]);
    }
  }
};
</script>

<style lang="scss" scoped>
.button-block {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 15px;
  margin: 5px 0;
  margin-right: 100px;

  .title-box {
    width: 125px;
    height: 30px;
    padding: 7px 0 0 10px;
    font-size: 14px;
  }

  .button-box {
    display: flex;
    flex-wrap: wrap;
    margin-right: 25px;

    .button {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      margin-right: 2px;
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      background-color: white;
      user-select: none;
      cursor: pointer;

      &:hover {
        border-color: #adadad;
        background-color: #e6e6e6;
      }

      &.checked {
        background-color: #428bca;
        color: white;
      }
    }
  }
}
</style>
