<template
  ><table class="category-table">
    <tr>
      <th><div class="flex-box">1차 카테고리</div></th>
      <th><div class="flex-box">2차 카테고리</div></th>
    </tr>
    <tr>
      <td>
        <ul class="category-list first-category">
          <li v-show="!firstCat[0]">셀러를 먼저 선택해주세요.</li>
          <li
            v-for="(value, idx) in firstCat"
            v-show="value"
            :id="'category1-' + idx"
            :key="'category1-' + idx"
            :class="{ 'list-selected': firstSelected[idx] }"
            @click="handleFirst(idx, value.f_id, $event)"
          >
            {{ value.f_name }}
          </li>
        </ul>
      </td>
      <td>
        <ul class="category-list second-category">
          <li v-show="Object.keys(firstSelected).length === 0">
            1차 카테고리를 선택해주세요.
          </li>
          <li
            v-for="(value, idx) in secondCat"
            v-show="Object.keys(firstSelected).length > 0"
            :id="'category2-' + idx"
            :key="'category2-' + idx"
            :class="{ 'list-selected': secondSelected[idx] }"
            @click="handleSecond(idx, value.s_id, $event)"
          >
            {{ value.s_name }}
          </li>
        </ul>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TableCategory',
  props: ['firstCat', 'secondCat'],
  data() {
    return {
      listSelected: false,
      firstSelected: {},
      secondSelected: {}
    };
  },
  methods: {
    handleFirst(idx, fId, e) {
      let id = e.target.id.split('-')[1];
      if (idx.toString() === id) {
        this.firstSelected = {
          [idx]: idx
        };
        this.$emit('updateFirCategory', fId);
      }
      return this.firstSelected;
    },
    handleSecond(idx, sId, e) {
      let id = e.target.id.split('-')[1];
      if (idx.toString() === id) {
        this.secondSelected = {
          [idx]: idx
        };
        this.$emit('updateSecCategory', sId);
      }
      return this.secondSelected;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/commonD.scss';

.flex-box {
  display: flex;
  align-items: center;
  // height: 100%;
}

.category-table {
  width: 100%;
  text-indent: 10px;
  font-size: 12px;
  color: $darkgrey;

  th {
    width: 50%;
    height: 25px;
    padding: 3px;
    border: 1px solid $midgrey;
    background-color: $coolgrey;
    color: $darkgrey;
    text-align: center;
    line-height: 25px;

    &:first-child {
      border-right: 1px solid $softgrey;
    }
  }

  td {
    border: 1px solid $midgrey;
    background-color: $lightgrey;
  }

  .category-list {
    position: relative;
    top: 0;
    cursor: pointer;
    height: 300px;
    overflow: scroll;
    z-index: 100;
    background-color: $lightgrey;
    ul {
      height: 120px;
    }

    li {
      display: flex;
      align-items: center;
      height: 30px;

      &:hover {
        background-color: $softgrey;
      }
    }
  }

  .list-selected {
    background-color: $skyblue;
  }

  .blue-btn {
    @include blue-btn;
    margin-left: 10px;
    padding: 5px 10px;
    border-radius: 5px;
  }
}
</style>
