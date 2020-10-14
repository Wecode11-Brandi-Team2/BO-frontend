<template>
  <div>
    <PageLoading v-if="!done" />
    <h3 class="page-title">
      {{ main }}
      <small>{{ sub }}</small>
    </h3>
    <BreadCrumb />
    <div class="table-container">
      <div class="table-title">
        <i class="user" />
        {{ tableTitle }}
      </div>
      <MemberTable
        :table="table"
        :tableMap="tableMap"
        :tableId="tableId"
        :api="api"
        :resKey="resKey"
        :limit="limit"
      />
    </div>
  </div>
</template>

<script>
import path from '@/assets/textMap';
import BreadCrumb from '@/components/Main/BreadCrumb';
import MemberTable from '@/components/Main/MemberTable/MemberTable';
import PageLoading from '@/components/Loading/PageLoading';

export default {
  components: {
    BreadCrumb,
    MemberTable,
    PageLoading
  },

  data() {
    const {
      main,
      sub,
      table,
      tableMap,
      tableId,
      tableTitle,
      api,
      resKey,
      limit
    } = path[this.$route.params.subMenu];

    return {
      main,
      sub,
      table,
      tableMap,
      tableId,
      tableTitle,
      api,
      resKey,
      limit,
      namespace: this.$route.params.subMenu,
      done: true
    };
  },
  mounted() {
    this.done = false;

    setTimeout(() => {
      this.done = true;
    }, 800);
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
.table-container {
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;

  .table-title {
    background-color: #eee;
    border-radius: 4px 4px 0 0;
    padding: 10px 10px 2px 10px;
    height: 38px;
    color: #333;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;

    i {
      margin-top: 2px;
      margin-right: 5px;
      font-family: FontAwesome;
      font-size: 13px;
      color: #666;

      &.user {
        &:before {
          content: '\f0c0';
        }
      }
    }
  }
}
</style>
