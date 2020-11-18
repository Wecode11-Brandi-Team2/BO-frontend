<template>
  <div class="button-date">
    <div class="title-box">{{ title }} :</div>
    <ul class="button-box">
      <li
        :class="['button', dateValue === -1 && 'checked']"
        @click="setChecked(-1)"
      >
        전체
      </li>
      <li
        :class="['button', dateValue === +key && 'checked']"
        :key="key"
        v-for="[key, value] of Object.entries(buttons)"
        @click="setChecked(+key)"
      >
        {{ value }}
      </li>
    </ul>
    <div class="date-box">
      <datepicker
        class="left"
        v-model="from"
        placeholder="클릭해주세요"
        format="yyyy-MM-dd"
      />
      <div class="term">~</div>
      <datepicker
        class="right"
        v-model="to"
        placeholder="클릭해주세요"
        format="yyyy-MM-dd"
      />
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
import { mapState, mapActions } from 'vuex';
import NAMESPACE from '@/store/modules/types';

export default {
  props: { title: String, buttons: Object, default: Number },
  components: {
    Datepicker
  },
  data() {
    return {
      namespace: this.$route.params.subMenu
    };
  },
  computed: {
    ...mapState({
      getDateFrom(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue'](
          'filterDateFrom'
        );
      },
      getDateTo(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue']('filterDateTo');
      },
      getDateValue(state, getters) {
        return getters[NAMESPACE[this.namespace] + '/getValue']('dateValue');
      }
    }),
    from: {
      get() {
        return this.getDateFrom;
      },
      set(value) {
        this.setDateFrom(value);
      }
    },
    to: {
      get() {
        return this.getDateTo;
      },
      set(value) {
        this.setDateTo(value);
      }
    },
    dateValue() {
      return this.getDateValue;
    }
  },
  methods: {
    ...mapActions({
      setDateFrom(dispatch, value) {
        return dispatch(NAMESPACE[this.namespace] + '/setValue', {
          key: 'filterDateFrom',
          value
        });
      },
      setDateTo(dispatch, value) {
        return dispatch(NAMESPACE[this.namespace] + '/setValue', {
          key: 'filterDateTo',
          value
        });
      },
      setDateValue(dispatch, value) {
        return dispatch(NAMESPACE[this.namespace] + '/setValue', {
          key: 'dateValue',
          value
        });
      }
    }),
    setChecked(value) {
      this.setDateValue(value);
      this.setDate(value);
    },
    setDate(value) {
      if (value === -1) {
        this.setDateFrom('');
        this.setDateTo('');
        return;
      }
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - +value);
      this.setDateFrom(fromDate);
      this.setDateTo(new Date());
    }
  }
};
</script>

<style lang="scss">
.button-date {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 15px;
  margin: 5px 0;
  margin-right: 100px;

  .title-box {
    width: 125px;
    height: 30px;
    padding: 7px 0 0 10px;
    font-size: 14px;
  }

  .button-box {
    display: flex;
    flex-wrap: wrap;
    margin-right: 25px;

    .button {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      margin-right: 2px;
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      background-color: white;
      user-select: none;
      cursor: pointer;

      &:hover {
        border-color: #adadad;
        background-color: #e6e6e6;
      }

      &.checked {
        background-color: #428bca;
        color: white;
      }
    }
  }

  .date-box {
    display: flex;

    .left {
      input[type='text'] {
        border-radius: 3px 0 0 3px;
      }
    }

    .right {
      input[type='text'] {
        border-radius: 0 3px 3px 0;
      }
    }
    .vdp-datepicker {
      input[type='text'] {
        height: 34px;
        padding: 4px 12px;
        border: 1px solid #e6e6e6;
        text-align: center;
        font-size: 14px;
        color: #333;
        transition: border-color ease-in-out 0.15s;
        outline: none;

        &:focus {
          border-color: #999;
        }

        &::placeholder {
          text-align: center;
        }
      }
    }

    .term {
      display: flex;
      align-items: center;

      justify-content: center;
      min-width: 39px;
      padding: 6px 12px;
      border: 1px solid #e5e5e5;
      font-size: 14px;
      font-weight: 400;
      line-height: 1;
      color: #555;
      text-align: center;
      background: #e5e5e5;
    }
  }
}
</style>
