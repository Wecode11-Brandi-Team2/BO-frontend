/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <div class="drop-list">
      <input type="text" v-model="listSearch" @keyup="listFilter" />
      <ul>
        <li v-show="noResult">
          검색 결과가 없습니다.
        </li>
        <li
          v-for="(value, idx) in optionData"
          v-show="listSearchRes.length === 0 && !noResult"
          :key="'list1' + idx"
          @click="updateSelect(idx)"
        >
          {{ value }}
        </li>
        <li
          v-for="(searchRes, idx) in listSearchRes"
          v-show="listSearchRes.length > 0"
          :key="'list2' + idx"
        >
          {{ searchRes }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropList',
  props: ['option', 'type', 'id'],

  data() {
    return {
      optionData: '',
      typeData: '',
      updateValue: '',
      listSearch: '',
      listSearchRes: [],
      noResult: false
    };
  },

  created() {
    this.optionData = this.option;
    this.typeData = this.type;
  },
  methods: {
    updateSelect(idx) {
      event.stopPropagation();

      if (this.$el.className) {
        this.$emit(`update${this.typeData}`, [idx, this.$el.className]);
      }
    },
    listFilter() {
      this.listSearchRes = this.optionData.filter(
        el => el.toLowerCase().indexOf(this.listSearch.toLowerCase()) !== -1
      );
      if (this.listSearchRes.length === 0) {
        this.noResult = true;
      }
      if (this.listSearchRes.length > 0) {
        this.noResult = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/commonD.scss';

.drop-list {
  transition: all 0.5s ease-out;
  background-color: $softgrey;
  position: relative;
  top: 0;
  height: 230px;
  cursor: pointer;
  overflow: scroll;
  z-index: 100;

  input[type='text'] {
    width: 90%;
    height: 25px;
    margin: 10px 0;
    border: 1px solid $midgrey;
    border-radius: 5px;
    background-color: $lightgrey;
  }

  li {
    display: flex;
    align-items: center;
    height: 30px;

    &:hover {
      color: $darkgrey;
      background-color: $midgrey;
    }
  }
}
</style>
