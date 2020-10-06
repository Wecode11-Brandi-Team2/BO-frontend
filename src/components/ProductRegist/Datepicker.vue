<template>
  <div class="date-box">
    <Datepicker
      v-model="start"
      class="date-picker"
      placeholder="시작일을 선택해주세요"
      format="yyyy-MM-dd"
    />
    <Datepicker
      v-model="end"
      class="date-picker"
      placeholder="종료일을 선택해주세요"
      format="yyyy-MM-dd"
    />
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      discount: {
        start: '',
        end: ''
      }
    };
  },
  computed: {
    start: {
      get() {
        return this.discount.start;
      },
      set(value) {
        this.discount.start = value;
        this.$emit('selected', [this.discount.start, this.discount.end]);
      }
    },
    end: {
      get() {
        return this.discount.end;
      },
      set(value) {
        this.discount.end = value;
        this.$emit('selected', [this.discount.start, this.discount.end]);
      }
    }
  }
};
</script>
<style lang="scss">
.date-box {
  margin: 10px;
}

.vdp-datepicker {
  input[type='text'] {
    height: 34px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    text-align: center;
    font-size: 14px;
    color: #333;
    transition: border-color ease-in-out 0.15s;
    outline: none;
    cursor: pointer;

    &:focus {
      border-color: #999;
    }

    &::placeholder {
      text-align: center;
    }
  }
}
</style>
