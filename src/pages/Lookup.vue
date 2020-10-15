<template>
  <div>
    <PageLoading v-if="!done" />
    <h3 class="page-title">
      {{ main }}
      <small>{{ sub }}</small>
    </h3>
    <FilterBox :filters="filters" :orderStatus="orderStatus" />
    <BreadCrumb :orderStatus="orderStatus" />
    <Table
      :table="table"
      :tableMap="tableMap"
      :tableId="tableId"
      :orderStatus="orderStatus"
    />
  </div>
</template>

<script>
import path from '@/assets/textMap';
import FilterBox from '@/components/Main/FilterBox';
import BreadCrumb from '@/components/Main/BreadCrumb';
import Table from '@/components/Main/Table/Table';
import PageLoading from '@/components/Loading/PageLoading';
import { mapActions } from 'vuex';
import NAMESPACE from '@/store/modules/types';

export default {
  components: {
    FilterBox,
    BreadCrumb,
    Table,
    PageLoading
  },

  data() {
    const {
      main,
      sub,
      filters,
      sort,
      table,
      tableMap,
      tableId,
      orderStatus
    } = path[this.$route.params.subMenu];

    return {
      main,
      sub,
      filters,
      sort,
      table,
      tableMap,
      tableId,
      orderStatus: orderStatus ? orderStatus : 0,
      namespace: this.$route.params.subMenu,
      done: true
    };
  },
  methods: {
    ...mapActions({
      setValue(dispatch, key, value) {
        return dispatch(NAMESPACE[this.namespace] + `/setValue`, {
          key,
          value
        });
      },
      reset(dispatch) {
        return dispatch(NAMESPACE[this.namespace] + '/reset');
      }
    })
  },
  mounted() {
    this.reset();
    if (Object.keys(this.$route.query).length < 1) {
      this.done = false;

      setTimeout(() => {
        this.done = true;
      }, 800);
    } else {
      for (let [key, value] of Object.entries(this.$route.query)) {
        switch (true) {
          case /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(
            value
          ):
            value = new Date(value);
            break;
          case key === 'mdSeNo' && value.length > 0:
            value = value.split(',').map(v => +v);
            break;
          case /-?\d+$/.test(value):
            value = +value;
            break;
        }
        this.setValue(key, value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-title {
  padding: 0px;
  margin-bottom: 15px;
  letter-spacing: -1px;
  color: #666;
  font-size: 26px;
  font-weight: 300;
  font-family: 'Open Sans', sans-serif;

  small {
    font-size: 14px;
    letter-spacing: 0px;
    font-weight: 300;
    color: #888;
  }
}
</style>
