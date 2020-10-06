/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <table id="option-table">
      <tr>
        <th>옵션항목</th>
        <th>상품옵션명</th>
        <th>옵션값 추가·삭제</th>
      </tr>
      <tr v-for="(cell, idx) of colorcells" :key="'colorkey' + idx">
        <td
          v-show="cell.header"
          :rowspan="cell.id === `colorRef0` && addedColor > 1 ? addedColor : 1"
        >
          {{ cell.header }}
        </td>
        <td>
          <div class="option-container">
            <div class="option-whole" @click="colorOpen(idx, $event)">
              <div class="flex-box-space" :class="'colorRef' + idx">
                <p :class="'colorRef' + idx">
                  {{ cell.color ? cell.color : '색상을 선택해 주세요' }}
                </p>
                <button
                  :class="{
                    'arrow-btn': cell.isColorOpen,
                    'arrow-btn-rotated': !cell.isColorOpen
                  }"
                >
                  <i class="fas fa-chevron-down"></i>
                </button>
              </div>
              <DropList
                v-show="cell.isColorOpen"
                ref="droplist"
                type="color"
                :option="optionData.color_option"
                :class="'colorRef' + idx"
                @updatecolor="updatecolor"
              />
            </div>
          </div>
        </td>
        <td>
          <div class="plus-btn-container">
            <button class="plus-btn black-btn" @click="addColor(idx)">
              <i class="fa fa-plus"></i>
            </button>
            <button
              class="plus-btn black-btn"
              :class="cell.id"
              @click="deleteColor(idx, $event)"
            >
              <i class="fas fa-minus" :class="cell.id"></i>
            </button>
          </div>
        </td>
      </tr>
      <tr v-for="(cell, idx) in sizecells" :key="'sizekey' + idx">
        <td
          v-show="cell.header"
          :rowspan="cell.id === `sizeRef0` && addedSize > 1 ? addedSize : 1"
        >
          {{ cell.header }}
        </td>
        <td>
          <div class="option-container">
            <div class="option-whole" @click="sizeOpen(idx)">
              <div class="flex-box-space">
                <p>
                  {{ cell.size ? cell.size : '사이즈를 선택해 주세요' }}
                </p>
                <button
                  :class="{
                    'arrow-btn': cell.isSizeOpen,
                    'arrow-btn-rotated': !cell.isSizeOpen
                  }"
                >
                  <i class="fas fa-chevron-down"></i>
                </button>
              </div>
              <DropList
                v-show="cell.isSizeOpen"
                :option="optionData.size_option"
                type="size"
                :class="'sizeRef' + idx"
                @updatesize="updatesize"
              />
            </div>
          </div>
        </td>
        <td>
          <div class="plus-btn-container">
            <button class="plus-btn black-btn" @click="addSize(idx)">
              <i class="fa fa-plus"></i>
            </button>
            <button
              class="plus-btn black-btn"
              :id="'sizeBtn' + idx"
              @click="deleteSize(idx, $event)"
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td>재고관리여부</td>
        <td colspan="3">
          <div class="flex-box">
            <RadioBtn
              v-for="(buttonName, idx) in btnList1"
              name="sold"
              :label="idx + 1"
              :buttonName="buttonName"
              :key="idx"
              @change="radioUpdate"
            />
          </div>
        </td>
      </tr>
    </table>

    <button class="option-submit-btn blue-btn" @click="optionSubmit">
      <i class="fas fa-check"></i>
      옵션 적용
    </button>
  </div>
</template>

<script>
import DropList from './DropList';
import RadioBtn from '../RadioBtn';
import { option } from '@/assets/mock/productRegist.js';

export default {
  name: 'TableOption',
  components: {
    DropList,
    RadioBtn
  },
  data() {
    return {
      selectedRadio: 0,
      selectedColor: '',
      selectedSize: '',
      optionData: option,
      colorCount: 0,
      sizeCount: 0,
      btnList1: ['재고 수량 관리 안함', '재고 수량 관리'],
      addedColor: 1,
      addedSize: 1,
      currentIdx: 0,
      colorcells: {
        0: {
          id: 'colorRef0',
          header: '색상',
          color: '',
          isColorOpen: false,
          isSizeOpen: false
        }
      },
      sizecells: {
        0: {
          id: 'sizeRef0',
          header: '사이즈',
          size: '',
          isColorOpen: false,
          isSizeOpen: false
        }
      },
      optionInfo: {}
    };
  },

  created() {
    document.addEventListener('click', this.toggleIsOpen);
  },

  methods: {
    // 컬러 선택창 열고닫는 함수(인풋창을 클릭했을때는 제외), 사이즈선택창이 열려있으면 닫는다.
    colorOpen(idx, event) {
      event.stopPropagation();
      let sizeKeys = Object.keys(this.sizecells);
      for (let i = 0; i < sizeKeys.length; i++) {
        this.sizecells[sizeKeys[i]].isSizeOpen = false;
      }
      if (event.target.localName !== 'input') {
        this.colorcells[idx].isColorOpen = !this.colorcells[idx].isColorOpen;
      }
      return this.colorcells;
    },

    // 색깔을 선택했을때 해당 셀의 color 정보에 그 값을 담고, 컬러선택창을 닫는다.
    updatecolor(args) {
      let selectedColor = this.optionData.color_option[args[0]];
      let keys = Object.keys(this.colorcells);
      for (let i = 0; i < keys.length; i++) {
        if (this.colorcells[keys[i]].color === selectedColor) {
          alert('같은 색상은 한번만 선택해주세요.');
        }
        if (this.colorcells[keys[i]].id === args[1]) {
          this.colorcells[keys[i]].color = selectedColor;
          this.colorcells[keys[i]].isColorOpen = false;
        }
      }
    },

    // 새로운 객체를 추가해서 새로운 컬러 선택창을 만드는 함수
    addColor() {
      let orgColorObj = JSON.parse(JSON.stringify(this.colorcells));
      this.colorCount = this.colorCount + 1;
      this.addedColor = this.addedColor + 1;

      let newColorObj = {
        [this.colorCount]: {
          id: `colorRef${this.colorCount}`,
          th: '색상',
          color: '',
          isColorOpen: false,
          isSizeOpen: false
        }
      };
      this.colorcells = Object.assign(orgColorObj, newColorObj);
      return this.colorcells;
    },

    // 0번째를 제외하고 다른 선택창을 클릭했을때 객체에서 지워버리는 함수
    deleteColor(idx) {
      if (idx === '0') {
        alert('최소 1개의 옵션은 적용해야합니다.');
      }
      if (idx !== '0') {
        this.addedColor = this.addedColor - 1;
        delete this.colorcells[idx];
        return this.colorcells;
      }
    },

    sizeOpen(idx) {
      event.stopPropagation();
      let colorKeys = Object.keys(this.colorcells);
      for (let i = 0; i < colorKeys.length; i++) {
        this.colorcells[colorKeys[i]].isColorOpen = false;
      }
      if (event.target.localName !== 'input') {
        this.sizecells[idx].isSizeOpen = !this.sizecells[idx].isSizeOpen;
      }
      return this.sizecells;
    },

    updatesize(args) {
      let selectedSize = this.optionData.size_option[args[0]];
      let keys = Object.keys(this.sizecells);
      for (let i = 0; i < keys.length; i++) {
        if (this.sizecells[keys[i]].size === selectedSize) {
          alert('같은 색상은 한번만 선택해주세요.');
        }
        if (this.sizecells[keys[i]].id === args[1]) {
          this.sizecells[keys[i]].size = selectedSize;
          this.sizecells[keys[i]].isSizeOpen = false;
        }
      }
    },

    addSize() {
      let orgSizeObj = JSON.parse(JSON.stringify(this.sizecells));
      this.sizeCount = this.sizeCount + 1;
      this.addedSize = this.addedSize + 1;

      let newSizeObj = {
        [this.sizeCount]: {
          id: `sizeRef${this.sizeCount}`,
          th: '색상',
          size: '',
          isColorOpen: false,
          isSizeOpen: false
        }
      };
      this.sizecells = Object.assign(orgSizeObj, newSizeObj);
      return this.sizecells;
    },

    deleteSize(idx) {
      if (idx === '0') {
        alert('최소 1개의 옵션은 적용해야합니다.');
      }
      if (idx !== '0') {
        this.addedSize = this.addedSize - 1;
        delete this.sizecells[idx];
        return this.sizecells;
      }
    },

    radioUpdate: function(idx) {
      this.selectedRadio = idx;
    },

    // 밖에 클릭했을때 열려있는 컬러, 사이즈선택창을 닫는 함수
    toggleIsOpen() {
      event.stopPropagation();
      const keys = Object.keys(this.colorcells);
      for (let i = 0; i < keys.length; i++) {
        this.colorcells[keys[i]].isColorOpen = false;
      }
      const sizeKeys = Object.keys(this.sizecells);
      for (let i = 0; i < sizeKeys.length; i++) {
        this.sizecells[sizeKeys[i]].isSizeOpen = false;
      }
    },

    optionSubmit() {
      let colorkeys = Object.keys(this.colorcells);
      for (let i = 0; i < colorkeys.length; i++) {
        let colorname = this.colorcells[colorkeys[i]].color;
        this.optionInfo = {
          ...this.optionInfo,
          [colorname]: []
        };
        let sizekeys = Object.keys(this.sizecells);
        for (let j = 0; j < sizekeys.length; j++) {
          let sizename = this.sizecells[sizekeys[j]].size;
          this.optionInfo[colorname].push(sizename);
        }
      }
      this.$emit('optionRegist', this.optionInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/commonD.scss';

.flex-box {
  display: flex;
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

#option-table {
  color: $darkgrey;
  font-size: 12px;
  text-indent: 10px;
  width: 100%;

  th {
    display: table-cell;
    vertical-align: middle;
    height: 25px;
    text-align: left;
    border-right: 1px solid $softgrey;
    color: $darkgrey;
    background-color: $coolgrey;

    &:first-child {
      width: 15%;
    }

    &:nth-child(2) {
      width: 50%;
    }

    &:last-child {
      border-right: 1px solid $midgrey;
      min-width: 100px;
      max-width: 200px;
    }
  }

  td {
    &:first-child {
      background-color: $softgrey;
    }

    height: 35px;
    display: table-cell;
    vertical-align: middle;
    border: 1px solid $midgrey;
    background-color: $lightgrey;
  }

  .select-row {
    th {
      border: 1px solid $midgrey;
      color: $darkgrey;
      background-color: $softgrey;
    }
  }
}

.option-submit-btn {
  @include btnContainer;
  height: 30px;
  padding: 0 15px;
  border-radius: 5px;
  letter-spacing: 0.04rem;
}

.option-whole {
  height: 30px;

  .flex-box-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 100%;

    .arrow-btn {
      transition: transform 0.5s ease-in-out;
      background-color: $lightgrey;
    }

    .arrow-btn-rotated {
      transition: transform 0.5s ease-in-out;
      transform: rotate(180deg);
      background-color: $lightgrey;
    }

    .fa-chevron-down {
      color: $midgrey;
      width: 10px;
      height: 10px;
    }
  }
}
</style>
