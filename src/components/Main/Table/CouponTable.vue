<template>
  <div class="table">
    <div class="button-block">
      <div>
        <br />
        <button
          class="action"
          :key="button.name"
          v-for="button of table.status_buttons"
        >
          {{ button.name }}
        </button>
      </div>
    </div>
    <br />
    <span class="coupon-notice"
      >* 쿠폰 타입이 [직접 발급]인 경우, 쿠폰 다운로드 기간은 노출되지
      않습니다.</span
    >
    <div class="inquiry">
      전체 조회건 수:
      <span>{{ inquiry }}</span>
      건
    </div>
    <div class="table-container">
      <table>
        <TableLoading v-if="!loadingStatus" />
        <thead>
          <tr>
            <th>
              <div class="check-header">
                <input type="checkbox" class="allCheck" />
                <label
                  :class="['check-label', all && 'checked']"
                  @click="setAllCheck"
                ></label>
              </div>
            </th>

            <th :key="tableMap[header]" v-for="header of table.table_headers">
              {{ tableMap[header] }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <div class="table-search">
                <input
                  type="text"
                  style="width:50px"
                  v-model="filterCondtion[tableId]"
                />
              </div>
            </td>
            <td>
              <div class="table-search">
                <input
                  type="text"
                  style="width:150px"
                  v-model="filterCondtion[tableId]"
                />
              </div>
            </td>
            <td></td>
            <td>
              <div class="table-search">
                <input
                  type="date"
                  v-model="filterCondtion.coupon_validation_start_from"
                />
                <input
                  type="date"
                  v-model="filterCondtion.coupon_validation_start_to"
                />
              </div>
            </td>
            <td>
              <div class="table-search">
                <input
                  type="date"
                  v-model="filterCondtion.coupon_validation_end_from"
                />
                <input
                  type="date"
                  v-model="filterCondtion.coupon_validation_end_to"
                />
              </div>
            </td>
            <td>
              <div class="table-search">
                <input
                  type="date"
                  v-model="filterCondtion.coupon_download_start_from"
                />
                <input
                  type="date"
                  v-model="filterCondtion.coupon_download_start_to"
                />
              </div>
            </td>
            <td>
              <div class="table-search">
                <input
                  type="date"
                  v-model="filterCondtion.coupon_download_end_from"
                />
                <input
                  type="date"
                  v-model="filterCondtion.coupon_download_end_to"
                />
              </div>
            </td>
            <td>
              <div class="table-search">
                <select v-model="filterCondtion.coupon_issue_type">
                  <option value="1">일반</option>
                  <option value="2">쿠폰코드</option>
                  <option value="3">직접발급</option>
                </select>
              </div>
            </td>
            <td>
              <div class="table-search">
                <select v-model="filterCondtion.coupon_is_limited">
                  <option value="0">무제한</option>
                  <option value="1">제한</option>
                </select>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div class="submit-box">
                <input
                  type="submit"
                  value="Search"
                  style="background-color:#EC982B"
                  @click="getCouponList"
                />
                <input
                  type="submit"
                  value="Reset"
                  style="background-color:red"
                  @click="setReset"
                />
              </div>
            </td>
          </tr>
          <tr :key="coupon[tableId]" v-for="coupon of couponData">
            <td>
              <div class="check-header">
                <input type="checkbox" class="allCheck" />
                <label
                  :class="['check-label', all && 'checked']"
                  @click="setAllCheck"
                ></label>
              </div>
            </td>

            <td :key="idx" v-for="(header, idx) of table.table_headers">
              {{ coupon[header] }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td :colspan="length + 1">
              <CouponPagination
                :page="curPage"
                :lastPage="lastPage"
                v-on:change-page="handleCurPage"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import TableLoading from '@/components/Loading/TableLoading';
import CouponPagination from '@/components/Main/Pagination/CouponPagination';
import { couponApi } from '@/api';
export default {
  components: { CouponPagination, TableLoading },
  props: { table: Object, tableMap: Object, tableId: String },
  data() {
    return {
      filterCondtion: {
        coupon_id: '',
        coupon_name: '',
        coupon_validation_start_from: '',
        coupon_validation_start_to: '',
        coupon_validation_end_from: '',
        coupon_validation_end_to: '',
        coupon_download_start_from: '',
        coupon_download_start_to: '',
        coupon_download_end_from: '',
        coupon_download_end_to: '',
        coupon_issue_type: -1,
        coupon_is_limited: -1
      },
      loadingStatus: false,
      selected: [],
      couponData: [],
      inquiry: undefined,
      length: this.table.table_headers.length,
      curPage: 1,
      lastPage: 100
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
    handleCurPage(page) {
      this.curPage = page;
      this.loadingStatus = false;
      couponApi.getCoupons(this.filterCondtion, this.curPage).then(res => {
        this.couponData = res.data.coupons;
        this.inquiry = res.data.total_coupon_num;
        this.lastPage = Math.ceil(res.data.total_coupon_num / 10);
        setTimeout(() => {
          this.loadingStatus = true;
        }, 350);
      });
      this.loadingStatus = false;
    },
    setAllCheck() {
      this.all = !this.all;
      this.loadingStatus = true;
    },
    getCouponList() {
      this.loadingStatus = false;
      couponApi.getCoupons(this.filterCondtion, this.curPage).then(res => {
        this.couponData = res.data.coupons;
        this.inquiry = res.data.total_coupon_num;
        this.lastPage = Math.ceil(res.data.total_coupon_num / 10);
        setTimeout(() => {
          this.loadingStatus = true;
        }, 350);
      });
      this.curPage = 1;
    },
    setReset() {
      this.loadingStatus = false;
      this.filterCondtion.coupon_id = '';
      this.filterCondtion.coupon_name = '';
      this.filterCondtion.coupon_validation_start_from = '';
      this.filterCondtion.coupon_validation_end_from = '';
      this.filterCondtion.coupon_validation_start_to = '';
      this.filterCondtion.coupon_validation_end_to = '';
      this.filterCondtion.coupon_download_start_from = '';
      this.filterCondtion.coupon_download_start_to = '';
      this.filterCondtion.coupon_download_end_from = '';
      this.filterCondtion.coupon_download_end_to = '';
      this.filterCondtion.coupon_issue_type = -1;
      this.filterCondtion.coupon_is_limited = -1;
      couponApi.getCoupons(this.filterCondtion, this.curPage).then(res => {
        this.couponData = res.data.coupons;
        this.inquiry = res.data.total_coupon_num;
        this.lastPage = Math.ceil(res.data.total_coupon_num / 10);
        setTimeout(() => {
          this.loadingStatus = true;
        }, 350);
      });
    }
  },
  created: function() {
    this.loadingStatus = false;
    couponApi.getCoupons(this.filterCondtion, this.curPage).then(res => {
      this.couponData = res.data.coupons;
      this.inquiry = res.data.total_coupon_num;
      this.lastPage = Math.ceil(res.data.total_coupon_num / 10);
      setTimeout(() => {
        this.loadingStatus = true;
      }, 350);
    });
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
      height: 35px;
      width: 80px;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 13px;
      line-height: 22px;
      white-space: nowrap;
      user-select: none;
      cursor: pointer;

      &.action {
        margin-right: 20px;
        color: #fff;
        font-weight: bold;
        background-color: #5cb85c;

        &:hover {
          background-color: #499d44;
        }
      }
    }
  }

  .coupon-notice {
    font-weight: bold;
    font-size: 13px;
  }

  .inquiry {
    margin-top: 15px;
    font-size: 13px;
    span {
      font-size: 17px;
      font-weight: bolder;
    }
  }

  .table-container {
    overflow-x: auto;
    overflow-y: hidden;
    margin: 10px 0;

    table {
      position: relative;
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

        .table-search {
          display: flex;
          flex-direction: column;
          input {
            height: 30px;
            border-radius: 3px;
            border: 1px solid #eee;
            margin: 5px 0;
          }
          select {
            height: 30px;
          }
        }

        .submit-box {
          display: flex;
          flex-direction: column;
          input {
            height: 30px;
            font-size: 15px;
            color: white;
            border-radius: 5px;
            border: 1px solid white;
            margin: 5px 0;
            cursor: pointer;
            &:focus {
              outline: none;
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
        tr {
          font-size: 14px;
          &:nth-child(even) {
            background-color: #eee;
          }
        }
      }
    }
  }
}
</style>
