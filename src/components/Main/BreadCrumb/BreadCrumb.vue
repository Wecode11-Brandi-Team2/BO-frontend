<template>
  <div class="breadcrumb">
    <ul class="breadcrumb-block">
      <i class="list" />
      <li>
        {{ main }}
        <i class="angle-right" />
      </li>
      <li>
        {{ sub }}
      </li>
    </ul>
    <div v-if="sort && limit" class="sort-box">
      <Sort :options="sort" :orderStatus="orderStatus" />
      <Limit :options="limit" :orderStatus="orderStatus" />
    </div>
  </div>
</template>

<script>
import path from '@/assets/textMap';
import Sort from '@/components/Main/BreadCrumb/Sort';
import Limit from '@/components/Main/BreadCrumb/Limit';

export default {
  components: {
    Sort,
    Limit
  },
  props: {
    orderStatus: Number
  },
  data() {
    const { main, sub, sort, limit } = path[this.$route.params.subMenu];
    return {
      main,
      sub,
      sort,
      limit
    };
  }
};
</script>

<style lang="scss">
.breadcrumb {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 10px;
  padding-right: 20px;
  background-color: #eee;

  .breadcrumb-block {
    display: flex;
    align-items: center;
    padding: 8px;

    i.list {
      margin-top: 1px;
      margin-right: 4px;
      font-family: FontAwesome;
      font-size: 14px;
      line-height: 14px;

      &:before {
        content: '\f03a';
      }
    }

    li {
      display: flex;
      align-items: center;
      height: 20px;
      margin: 0 3px;
      font-size: 13px;

      i.angle-right {
        width: 1.25em;
        margin-left: 3px;
        color: #999;
        font-family: FontAwesome;
        font-size: 14px;
        text-align: center;

        &:before {
          content: '\f105';
        }
      }
    }
  }

  .sort-box {
    display: flex;

    .select {
      padding: 0;
      margin: 0 2px;
    }
  }
}
</style>
