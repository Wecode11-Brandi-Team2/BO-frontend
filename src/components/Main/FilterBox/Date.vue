<template>
  <div class="date">
    <div class="title-box">{{ title }} :</div>
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
  props: { title: String },
  components: {
    Datepicker
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
    }
  },
  data() {
    return {
      namespace: this.$route.params.subMenu
    };
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
      }
    })
  }
};
</script>

<style lang="scss">
.date {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 15px;
  margin: 10px 300px 5px 0;

  .title-box {
    width: 125px;
    height: 30px;
    padding: 7px 0 0 10px;
    font-size: 14px;
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
