<template>
  <div class="option-detail-table">
    <div v-show="Object.keys(optionResult).length === 0">
      <p>옵션을 선택 후 적용 버튼을 눌러주세요.</p>
    </div>
    <div v-show="Object.keys(optionResult).length > 0">
      <table class="option-table">
        <tr>
          <th colspan="2">상품 옵션정보</th>
          <th rowspan="2">일반재고</th>
          <th rowspan="2">삭제</th>
        </tr>
        <tr class="option-detail">
          <th>색상</th>
          <th>사이즈</th>
        </tr>
        <tr v-for="([color, size], idx) of optionMatch" :key="idx">
          <td>
            <div class="option-container">
              <div class="option-whole">
                <div class="flex-box">
                  <p>
                    {{ color ? color : '색상을 선택해 주세요' }}
                  </p>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="option-container">
              <div class="option-whole">
                <div class="flex-box">
                  <p>
                    {{ size ? size : '사이즈를 선택해 주세요' }}
                  </p>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="btn-container">
              <div class="flex-box">
                <label for="inven-amount">
                  <input
                    type="radio"
                    name="inven-amount"
                    label="1"
                    :checked="true"
                  />
                  재고수량 관리 안함
                </label>
                <label for="inven-amount">
                  <input type="radio" name="inven-amount" label="2" />
                  <input type="text" class="inven-input" />개
                </label>
              </div>
            </div>
          </td>
          <td>
            <button
              class="plus-btn red-btn"
              @click="deleteOption(color, size, idx)"
            >
              <i class="fas fa-minus"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { option } from '@/assets/mock/productRegist.js';

export default {
  name: 'TableOption',
  props: ['optionResult'],
  data() {
    return {
      selectedRadio: 0,
      selectedColor: '',
      selectedSize: '',
      optionData: option
    };
  },
  created() {
    document.addEventListener('click', this.checkFunction);
  },
  computed: {
    optionMatch: function() {
      const match = [];
      for (const [color, sizes] of Object.entries(this.optionResult)) {
        for (const size of sizes) {
          match.push([color, size]);
        }
      }
      return match;
    }
  },
  methods: {
    deleteOption(color, size, idx) {
      this.$emit('optionDelete', [color, size, idx]);
    },
    radioUpdate: function(idx) {
      this.selectedRadio = idx;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/commonD.scss';

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

.option-table-detail {
  width: 100%;
}

.flex-box {
  display: flex;
  align-items: center;
  height: 100%;
}

.flex-box-center {
  display: flex;
  justify-content: center;
}

.plus-btn-container {
  display: flex;
  justify-content: center;
}

.plus-btn {
  width: 25px;
  height: 25px;
  margin: 5px;
  border-radius: 5px;
}

.blue-btn {
  @include blue-btn;
}

.black-btn {
  @include black-btn;
}

.red-btn {
  @include red-btn;
}

.inven-input {
  width: 120px;
  height: 25px;
  margin: 0 10px;
  padding: 5px;
  border: 1px solid $midgrey;
  border-radius: 5px;
  background-color: $lightgrey;
  text-indent: 5px;

  &:focus {
    outline: none;
  }
}

label {
  margin-right: 20px;
}

.option-table {
  color: $darkgrey;
  font-size: 12px;
  text-indent: 10px;
  width: 100%;

  .hidden-class {
    display: none;
  }

  th {
    display: table-cell;
    vertical-align: middle;
    height: 25px;
    text-align: left;
    border-right: 1px solid $softgrey;
    border-bottom: 1px solid $softgrey;
    color: $darkgrey;
    background-color: $coolgrey;

    &:first-child {
      border-left: 1px solid $midgrey;
      width: 30%;
    }

    &:nth-child(2) {
      width: 62%;
    }

    &:last-child {
      border-right: 1px solid $midgrey;
      width: 8%;
    }
  }

  td {
    display: table-cell;
    vertical-align: middle;
  }

  .option-detail {
    th {
      &:first-child {
        width: 15%;
      }

      &:last-child {
        width: 15%;
      }
    }
  }

  td {
    height: 35px;
    display: table-cell;
    vertical-align: middle;
    border: 1px solid $midgrey;
    background-color: $lightgrey;
  }
}

.option-whole {
  height: 30px;

  .flex-box-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 100%;

    .fa-chevron-down {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
