<template>
  <div class="text-pagination">
    <div class="pagination-panel">
      Page
      <div class="pagination">
        <button :disabled="page === 1" @click="setPage(-1)">
          <i class="angle-left" />
        </button>
        <input
          :value="page"
          type="text"
          class="page-input"
          @blur="searchByPage"
        />
        <button
          :disabled="lastPage === null || page === lastPage"
          @click="setPage(1)"
        >
          <i class="angle-right" />
        </button>
      </div>
      of
      <div class="total-page">{{ lastPage }}</div>
    </div>
    <div class="limit-panel">
      View
      <select class="limit" @change="searchByLimit">
        <option
          :key="key"
          v-for="[key, title] of Object.entries(limit)"
          :value="key"
          :selected="filterLimit === +key"
          >{{ title }}
        </option>
      </select>
      record
    </div>
    <div class="total-panel">
      Found total
      <div class="total-content">
        {{ totalNumber }}
      </div>
      record
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    lastPage: Number,
    totalNumber: Number,
    limit: Object,
    filterLimit: Number
  },
  data() {
    return {
      namespace: this.$route.params.subMenu
    };
  },
  methods: {
    setPage(value) {
      this.$emit('searchByPage', this.page + value);
    },
    searchByPage(e) {
      this.$emit('searchByPage', +e.target.value);
    },
    searchByLimit(e) {
      console.log(e);
      this.$emit('searchByLimit', +e.target.value);
    }
  }
};
</script>

<style lang="scss">
.text-pagination {
  display: flex;
  align-items: center;

  .pagination-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;

    .pagination {
      display: flex;
      align-items: center;

      button {
        padding: 5px 10px;
        margin: 4px;
        font-size: 13px;
        line-height: 1.5;
        text-decoration: none;
        color: #333;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
        cursor: pointer;

        &:hover:not(:disabled) {
          background-color: #eee;
          border-color: #ddd;
        }

        &:disabled {
          cursor: default;
        }

        i {
          margin-top: 1px;
          font-family: FontAwesome;
          font-size: 14px;
          line-height: 14px;

          &.angle-left {
            &:before {
              content: '\f104';
            }
          }

          &.angle-right {
            &:before {
              content: '\f105';
            }
          }
        }
      }

      .page-input {
        text-align: center;
        height: 26px;
        width: 40px;
        border: 1px solid #ddd;
        border-radius: 4px;
        outline: none;
      }
    }

    .total-page {
      margin: 4px;
    }
  }

  .limit-panel {
    display: flex;
    align-items: center;

    &:before {
      content: '|';
      margin: 4px;
    }

    .limit {
      margin: -2px 4px 0;
      outline: none;
    }
  }

  .total-panel {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &:before {
      content: '|';
      margin: 4px;
    }

    .total-content {
      margin: 4px;
    }
  }
}
</style>
