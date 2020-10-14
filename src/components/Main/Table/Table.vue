<template>
  <div class="table">
    <div class="button-block">
      <div>
        <button
          class="action"
          :key="button.name"
          v-for="button of table.status_buttons"
        >
          {{ button.name }}
        </button>
      </div>
      <div>
        <button
          class="excel"
          :key="button.name"
          v-for="button of table.excel_buttons"
          @click="getExcelFile(button.api)"
        >
          <i class="file-excel" />
          {{ button.name }}
        </button>
      </div>
    </div>
    <div class="inquiry">
      전체 조회건 수:
      <b>{{ totalNumber }}</b>
      건
    </div>
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
              <img
                v-if="
                  /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(
                    item[header]
                  )
                "
                :src="item[header]"
                height="72px"
                width="72px"
              />
              <div v-else>{{ item[header] }}</div>
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
        <tfoot>
          <tr>
            <td :colspan="length + 1">
              <Pagination
                :page="page"
                :lastPage="lastPage"
                :orderStatus="orderStatus"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="button-block">
      <div>
        <button
          class="action"
          :key="button.name"
          v-for="button of table.status_buttons"
        >
          {{ button.name }}
        </button>
      </div>
      <div>
        <button
          class="excel"
          :key="button.name"
          v-for="button of table.excel_buttons"
        >
          <i class="file-excel" />
          {{ button.name }}
        </button>
      </div>
    </div>
    <TableLoading v-if="isLoading" />
  </div>
</template>

<script>
import Pagination from '@/components/Main/Pagination/Pagination';
import TableLoading from '@/components/Loading/TableLoading';
import { mapState } from 'vuex';
import NAMESPACE from '@/store/modules/types';

export default {
  components: { Pagination, TableLoading },
  props: {
    table: Object,
    tableMap: Object,
    tableId: String,
    orderStatus: Number
  },
  data() {
    return {
      selected: [],
      tableHeaders: this.table.table_headers,
      length: this.table.table_headers.length,
      namespace: this.$route.params.subMenu
    };
  },

  computed: {
    ...mapState({
      getResult(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue'](
          'filteredResult'
        );
      },
      getIsLoading(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue']('isLoading');
      },
      getPage(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue']('page');
      },
      getLastPage(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue']('page_number');
      },
      getTotalNumber(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue'](
          'total_order_number'
        );
      }
    }),
    result() {
      return this.getResult;
    },
    isLoading() {
      console.log(this.getIsLoading);
      return this.getIsLoading;
    },
    page() {
      return this.getPage;
    },
    lastPage() {
      return this.getLastPage;
    },
    totalNumber() {
      return this.getTotalNumber;
    },
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
        newSelected.push(item[this.tableId]);
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
    getExcelFile(api) {
      console.log(api);
      const selected = this.selected.map(v => this.result[v][this.tableId]);
      // .join(',');
      console.log(selected);
      api(selected)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  position: relative;

  .button-block {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;

    button {
      height: 22px;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 12px;
      line-height: 22px;
      white-space: nowrap;
      user-select: none;
      cursor: pointer;

      &.action {
        margin-right: 5px;
        color: #fff;
        border: 1px solid #357ebd;
        background-color: #428bca;
      }

      &.excel {
        margin-left: 5px;
        color: #fff;
        background-color: #5cb85c;
        border-color: #4cae4c;
      }

      i.file-excel {
        margin-top: 1px;
        margin-right: 2px;
        font-size: 14px;
        line-height: 20px;
        font-family: FontAwesome;

        &:before {
          content: '\f1c3';
        }
      }
    }
  }

  .inquiry {
    margin-top: 15px;
    font-size: 13px;
  }

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
