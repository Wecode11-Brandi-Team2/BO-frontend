<template>
  <div class="filter-box">
    <ul class="filter-block">
      <li class="filter-list" :key="filter.title" v-for="filter of filters">
        <SelectInput v-if="filter.type === 1" :options="filter.values" />
        <ButtonDate
          v-if="filter.type === 2"
          :title="filter.title"
          :buttons="filter.values"
          :default="filter.default"
        />
        <SingleButtons
          v-if="filter.type === 3"
          :title="filter.title"
          :buttons="filter.values"
          :filterKey="filter.key"
          :default="filter.default"
        />
        <MultiButtons
          v-if="filter.type === 4"
          :title="filter.title"
          :buttons="filter.values"
          :default="filter.default"
        />
        <Date v-if="filter.type === 5" :title="filter.title" />
        <Input
          v-if="filter.type === 6"
          :title="filter.title"
          :filterKey="filter.key"
          :placeholder="filter.values"
        />
        <SelectDate
          v-if="filter.type === 7"
          :options="filter.select"
          :buttons="filter.values"
          :default="filter.default"
        />
        <Select
          v-if="filter.type === 8"
          :title="filter.title"
          :filterKey="filter.key"
          :options="filter.values"
        />
      </li>
    </ul>
    <div class="filter-action">
      <div class="button search" @click="searchResult">검색</div>
      <div class="button reset" @click="reset">초기화</div>
    </div>
  </div>
</template>

<script>
import SelectInput from '@/components/Main/FilterBox/SelectInput';
import ButtonDate from '@/components/Main/FilterBox/ButtonDate';
import SingleButtons from '@/components/Main/FilterBox/SingleButtons';
import MultiButtons from '@/components/Main/FilterBox/MultiButtons';
import Date from '@/components/Main/FilterBox/Date';
import Input from '@/components/Main/FilterBox/Input';
import SelectDate from '@/components/Main/FilterBox/SelectDate';
import Select from '@/components/Main/FilterBox/Select';
import { mapState, mapActions } from 'vuex';
import NAMESPACE from '@/store/modules/types';

export default {
  components: {
    SelectInput,
    ButtonDate,
    SingleButtons,
    MultiButtons,
    Date,
    Input,
    SelectDate,
    Select
  },
  props: {
    filters: Array,
    orderStatus: Number
  },
  data() {
    return {
      values: this.filters.values,
      namespace: this.$route.params.subMenu
    };
  },
  computed: {
    ...mapState({
      getFilters(state, getters) {
        return getters[NAMESPACE[this.namespace] + `/getFilters`];
      }
    }),
    queries() {
      return this.getFilters;
    }
  },
  methods: {
    ...mapActions({
      search(dispatch, payload) {
        return dispatch(NAMESPACE[this.namespace] + '/search', payload);
      },
      reset(dispatch) {
        return dispatch(NAMESPACE[this.namespace] + '/reset');
      }
    }),
    searchResult() {
      this.search(this.orderStatus);
      if (this.queries.dateValue)
        this.queries.dateValue = this.queries.dateValue.toString();
      if (JSON.stringify(this.$route.query) !== JSON.stringify(this.queries)) {
        this.$router.push({ query: this.queries });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-box {
  border: 3px solid #eee;
  padding-left: 10px;
  margin-bottom: 20px;

  .filter-block {
    display: flex;
    flex-wrap: wrap;

    .filter-list {
      display: flex;
      align-items: center;
    }
    .filter {
      min-height: 1px;
      margin: 10px 0;
      padding: 0 15px;
    }
  }

  .filter-action {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 10px;

    .button {
      display: flex;
      align-items: center;
      padding: 6px 50px;
      border: 1px solid #e6e6e6;
      margin: 0 2px;
      font-size: 14px;
      line-height: 1.5;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;

      &.reset {
        color: #333;
        background-color: white;
        border: 1px solid #e6e6e6;

        &:hover {
          border-color: #adadad;
          background-color: #e6e6e6;
        }
      }

      &.search {
        color: #fff;
        background-color: #428bca;
        border-color: #357ebd;

        &:hover {
          background-color: #3071a9;
          border-color: #285e8e;
        }
      }
    }
  }
}
</style>
