<template>
  <table class="discount-table">
    <tr>
      <th>할인율</th>
      <th>할인가</th>
      <th>할인판매가</th>
    </tr>
    <tr>
      <td>
        <div class="flex-box">
          <input type="number" min="0" max="99" v-model="discountRate" />
          <div class="point-box">%</div>
          <button class="btn-container blue-btn" @click="checkValue">
            적용
          </button>
        </div>
      </td>
      <td>
        <div class="flex-box">
          <div class="price-box">
            {{ discountPrice }}
          </div>
          <div class="point-box">원</div>
        </div>
      </td>
      <td>
        <div class="flex-box">
          <div class="price-box highlight-text">
            {{ totalPrice }}
          </div>
          <div class="point-box">원</div>
        </div>
      </td>
    </tr>
    <tr class="schedule">
      <th>할인기간</th>
      <td colspan="2">
        <div class="flex-box">
          <label for="discount-date">
            <input
              @click="closeDateInput"
              type="radio"
              name="discount-date"
              label="1"
              checked="true"
            />
            무기한
          </label>
          <label for="discount-date">
            <input
              @click="openDateInput"
              type="radio"
              name="discount-date"
              label="2"
            />
            기간설정
          </label>
          <Datepicker @selected="emitDate" v-show="dateOpen" />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import Datepicker from '../ProductRegist/Datepicker';

export default {
  name: 'TableDiscount',
  components: {
    Datepicker
  },
  props: ['salesPrice'],
  data() {
    return {
      selectedRadio: 0,
      btnList1: ['무기한', '기간설정'],
      discountRate: 0,
      discountPrice: 0,
      totalPrice: 0,
      dateOpen: false,
      startDate: '',
      endDate: ''
    };
  },
  methods: {
    emitDate(date) {
      this.$emit('selected', date);
    },
    radioUpdate(idx) {
      this.selectedRadio = idx;
    },
    openDateInput() {
      this.dateOpen = true;
    },
    closeDateInput() {
      this.dateOpen = false;
    },
    checkValue() {
      if (this.discountRate > 99) {
        alert('할인률은 99% 이하여야합니다.');
        this.discountRate = 0;
      } else {
        this.setDiscountPrice();
      }
    },
    setDiscountPrice() {
      const price = this.salesPrice;
      const rate = this.discountRate;
      const x = 10;
      this.discountPrice = (price * rate) / 100;
      let tempTotal = this.salesPrice - this.discountPrice;
      this.totalPrice = Math.round(tempTotal / x) * x;
      this.handleValue();
    },
    handleValue() {
      this.$emit('click', [this.discountRate, this.discountPrice]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/commonD.scss';

.flex-box {
  display: flex;
  align-items: center;
}

.btn-container {
  @include btnContainer;
  width: 70px;
  height: 30px;
  margin-left: 10px;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 14px;
  letter-spacing: 0.04rem;
}

.blue-btn {
  @include blue-btn;
}

input[type='number'] {
  width: 150px;
  height: 30px;
  margin: 10px 0 10px 10px;
  padding: 5px;
  border: 1px solid $midgrey;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: $lightgrey;
  text-indent: 5px;

  &:focus {
    outline: none;
  }
}

input[type='radio'] {
  width: 13px;
  height: 13px;
  appearance: none;
  border-radius: 100%;
  margin-left: 0;
  margin-right: 0.25rem;
  background-color: white;
  border: 1px solid $midgrey;
}

input[type='radio']:checked {
  appearance: none;
  border-radius: 100%;
  margin-left: 0;
  margin-right: 0.25rem;
  background-color: $darkgrey;
  border: 3px solid $midgrey;
}

input[type='radio']:focus {
  outline: none;
}

.highlight-text {
  color: $darkgrey;
  font-weight: 500;
}

.discount-table {
  font-size: 12px;
  text-indent: 10px;
  color: $darkgrey;

  th {
    display: table-cell;
    vertical-align: middle;
    height: 25px;
    text-align: left;
    border-right: 1px solid $softgrey;
    color: $darkgrey;
    background-color: $coolgrey;

    &:first-child {
      width: 40%;
    }

    &:last-child {
      border-right: 1px solid $midgrey;
    }
  }

  td {
    height: 35px;
    display: table-cell;
    vertical-align: middle;
    border: 1px solid $midgrey;
    background-color: $lightgrey;
  }

  .schedule {
    th {
      border: 1px solid $midgrey;
      color: $darkgrey;
      background-color: $softgrey;
    }
  }

  .price-box {
    display: flex;
    align-items: center;
    width: 150px;
    height: 30px;
    margin: 10px 0 10px 10px;
    padding: 5px;
    border: 1px solid $midgrey;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .point-box {
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    border-top: 1px solid $midgrey;
    border-bottom: 1px solid $midgrey;
    border-right: 1px solid $midgrey;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 14px;
    font-weight: 400;
    text-indent: 5px;
    color: $darkgrey;
    background-color: $softgrey;
  }
}
</style>
