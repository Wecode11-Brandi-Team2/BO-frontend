<template>
  <div class="select">
    <div class="select-box">
      <select @change="setSearch">
        <optgroup>
          <option>Select..</option>
          <option
            :key="key"
            v-for="[key, title] of Object.entries(options)"
            :value="key"
            :selected="key === selectFilter"
            >{{ title }}
          </option>
        </optgroup>
      </select>
    </div>
    <div class="input-box">
      <input
        type="text"
        :value="keyword"
        placeholder="검색어를 입력하세요"
        @change="setWord"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NAMESPACE from '@/store/modules/types';

export default {
  props: {
    options: Object
  },
  data() {
    return {
      namespace: this.$route.params.subMenu
    };
  },
  computed: {
    ...mapState({
      getSelectFilter(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue']('selectFilter');
      },
      getFilterKeyword(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue'](
          'filterKeyword'
        );
      }
    }),
    selectFilter() {
      return this.getSelectFilter;
    },
    keyword() {
      return this.getFilterKeyword;
    }
  },
  methods: {
    ...mapActions({
      setSelectFilter(dispatch, value) {
        return dispatch(NAMESPACE[this.namespace] + '/setValue', {
          key: 'selectFilter',
          value
        });
      },
      setFilterKeyword(dispatch, value) {
        return dispatch(NAMESPACE[this.namespace] + '/setValue', {
          key: 'filterKeyword',
          value
        });
      }
    }),
    setSearch(e) {
      this.setSelectFilter(e.target.value);
    },
    setWord(e) {
      this.setFilterKeyword(e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;
  margin-right: 300px;

  .select-box {
    padding-right: 5px;

    select {
      height: 30px;
      width: 100%;
      max-width: 120px;
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
