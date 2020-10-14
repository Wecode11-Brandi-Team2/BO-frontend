<template>
  <div class="table">
    <TextPagination
      :page="page"
      :lastPage="lastPage"
      :totalNumber="totalNumber"
      :limit="limit"
      @searchByPage="searchByPage"
    />
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <div class="check-header">
                <input type="checkbox" class="allCheck" />
                <label
                  :class="['check-label', all && 'checked']"
                  @click="setAll"
                ></label>
              </div>
            </th>
            <th :key="header" v-for="header of tableHeaders">
              {{ tableMap[header] }}
            </th>
          </tr>
        </thead>
        <tbody v-if="result && result.length > 0">
          <tr :key="item[tableId]" v-for="item of result">
            <td>
              <div class="check-header">
                <input type="checkbox" class="allCheck" />
                <label
                  :class="[
                    'check-label',
                    selected.includes(item[tableId]) && 'checked'
                  ]"
                  @click="setSelected(item[tableId])"
                ></label>
              </div>
            </td>
            <td :key="header" v-for="header of tableHeaders">
              {{ item[header] }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="length + 1">
              검색 결과가 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TextPagination
      :page="page"
      :lastPage="lastPage"
      :totalNumber="totalNumber"
      :limit="limit"
      :filterLimit="filterLimit"
      @searchByLimit="searchByLimit"
      @searchByPage="searchByPage"
    />
    <TableLoading v-if="isLoading" />
  </div>
</template>

<script>
import TextPagination from '@/components/Main/Pagination/TextPagination';
import TableLoading from '@/components/Loading/TableLoading';

export default {
  components: { TextPagination, TableLoading },
  props: {
    table: Object,
    tableMap: Object,
    tableId: String,
    api: Function,
    resKey: String,
    limit: Object
  },
  data() {
    return {
      isLoading: false,
      selected: [],
      tableHeaders: this.table.table_headers,
      length: this.table.table_headers.length,
      namespace: this.$route.params.subMenu,
      filterLimit: 10,
      page: 1,
      lastPage: 1,
      totalNumber: 0,
      result: []
    };
  },
  computed: {
    all() {
      return (
        this.selected.length !== 0 &&
        this.selected.length === this.result.length
      );
    }
  },
  methods: {
    checkAll() {
      const newSelected = [];
      for (const item of this.result) {
        newSelected.push(item.order_detail_id);
      }
      this.selected = newSelected;
    },
    resetAll() {
      this.selected = [];
    },
    setAll() {
      if (this.all) {
        this.resetAll();
      } else {
        this.checkAll();
      }
    },
    setSelected(key) {
      const newSelected = [...this.selected];
      let index;
      if ((index = newSelected.indexOf(key)) !== -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(key);
      }
      this.selected = newSelected.sort((a, b) => a - b);
    },
    reset() {
      this.filterLimit = 10;
      this.page = 1;
      this.lastPage = 1;
      this.totalNumber = 0;
      this.result = [];
    },
    search() {
      this.isLoading = true;
      this.api({ filterLimit: this.filterLimit, page: this.page })
        .then(res => {
          this.result = res.data[this.resKey];
          this.lastPage = res.data.page_number;
          this.totalNumber = res.data[`total_${this.resKey}_number`];
          setTimeout(() => {
            this.isLoading = false;
          }, 300);
        })
        .catch(err => {
          console.error(err);
          this.isLoading = false;
        });
    },
    searchByLimit(limit) {
      console.log(limit);
      console.log('here');
      this.filterLimit = limit;
      this.search();
    },
    searchByPage(page) {
      this.page = page;
      this.search();
    }
  },
  mounted() {
    this.reset();
    this.search();
  }
};
</script>

<style lang="scss" scoped>
.table {
  position: relative;
  padding: 0 15px;

  .table-container {
    overflow-x: auto;
    overflow-y: hidden;
    margin: 10px 0;

    table {
      width: 100%;
      border: 1px solid #ddd;
      border-collapse: collapse;

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        line-height: 1.5;
        white-space: nowrap;

        .check-header {
          position: relative;
          width: 19px;
          height: 19px;
          line-height: 19px;

          &:hover {
            .check-label:before {
              background: #fff;
              border-color: rgba(34, 36, 38, 0.35);
            }
          }

          input {
            position: absolute;
            width: 0;
            height: 0;
            top: 0;
            left: 0;
            opacity: 0 !important;
            outline: none;
            z-index: -1;

            &:checked ~ .check-label:before {
              background: #fff;
              border-color: rgba(34, 36, 38, 0.35);
            }
          }

          .check-label {
            position: relative;
            cursor: pointer;
            outline: none;
            transition: color 0.1s ease;

            &:before {
              content: '';
              position: absolute;
              top: 4px;
              left: 0;
              width: 17px;
              height: 17px;
              border: 1px solid #d4d4d5;
              margin-left: -10px;
              background: #fff;
              transition: border 0.1s ease, opacity 0.1s ease,
                transform 0.1s ease;
            }

            &.checked {
              &:after {
                content: '\f00c';
                position: absolute;
                left: -1px;
                top: 4px;
                display: inline-block;
                width: 17px;
                height: 17px;
                padding-left: 3px;
                padding-top: 1px;
                margin-left: -10px;
                color: rgba(0, 0, 0, 0.95);
                font-family: FontAwesome;
                font-weight: bold;
                font-size: 13px;
                text-align: center;
                transition: border 0.1s ease, opacity 0.1s ease,
                  transform 0.1s ease, box-shadow 0.1s ease;
              }
            }
          }
        }
      }

      thead {
        th {
          font-size: 14px;
          font-weight: 600;
          background-color: #eee;

          &:first-child {
            width: 38px;
          }
        }
      }

      tbody {
        font-size: 13px;

        tr {
          &:nth-child(odd) {
            background: #f9f9f9;
          }

          &:hover {
            background: #f5f5f5;
          }
        }
      }
    }
  }
}
</style>
