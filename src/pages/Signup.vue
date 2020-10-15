/* eslint-disable vue/no-unused-components */
<template>
  <div class="join-info">
    <Spinner v-show="isLoading" />
    <validation-observer v-slot="{ invalid }">
      <form class="join-info-container" @submit.prevent="onSubmit">
        <h1>셀러회원 가입</h1>
        <div class="line"></div>
        <img
          src="https://sadmin.brandi.co.kr/include/img/seller_join_top_2.png"
        />
        <fieldset class="join-info-text-box">
          <h2>가입 정보</h2>
          <div class="input-container">
            <i class="fa fa-user"></i>
            <validation-provider
              name="아이디"
              ref="seller_id"
              :rules="`required|alpha_dash|min:5|max:20|same:${serverID}`"
              v-slot="{ errors, classes }"
            >
              <input
                type="text"
                v-model="infoInput.seller_loginID"
                :class="classes"
                placeholder="아이디"
              />
              <p class="validation-text">{{ errors[0] }}</p>
            </validation-provider>
          </div>
          <div class="input-container">
            <i class="fa fa-lock"></i>
            <validation-provider
              name="비밀번호"
              rules="required|min:8|alpha_dash"
              v-slot="{ errors, classes }"
            >
              <input
                type="password"
                v-model="infoInput.password"
                :class="classes"
                placeholder="비밀번호"
              />
              <p class="validation-text">{{ errors[0] }}</p>
            </validation-provider>
          </div>
          <div class="input-container">
            <i class="fa fa-check"></i>
            <validation-provider
              name="비밀번호확인"
              rules="required|checkMatch:@비밀번호"
              v-slot="{ errors, classes }"
            >
              <input
                type="password"
                v-model="infoInput.password2"
                :class="classes"
                placeholder="비밀번호 확인"
              />
              <p class="validation-text">{{ errors[0] }}</p>
            </validation-provider>
          </div>
        </fieldset>
        <fieldset class="join-info-text-box">
          <div class="title-box">
            <h2 class="h2-inline">담당자 정보</h2>
            <span class="blue-text">(*실제 샵을 운영하시는 분)</span>
          </div>
          <div class="input-container">
            <i class="fa fa-phone"></i>
            <validation-provider
              name="담당자 전화번호"
              rules="required|numeric|max:12"
              v-slot="{ errors, classes }"
            >
              <input
                type="text"
                v-model="infoInput.phone_number"
                :class="classes"
                placeholder="핸드폰번호"
              />
              <p class="validation-text">{{ errors[0] }}</p>
            </validation-provider>
          </div>
          <div class="input-container">
            <i class="fa fa-info-circle"></i>
            <p class="blue-text">
              입점 신청 후 브랜디 담당자가 연락을 드릴 수 있으니 정확한 정보를
              기입해주세요.
            </p>
          </div>
        </fieldset>
        <fieldset class="join-info-text-box">
          <h2>셀러 정보</h2>
          <div class="radio-btn-container">
            <radio-btn
              v-for="(buttonName, idx) in radioList"
              name="radio"
              :label="idx + 1"
              :buttonName="buttonName"
              :key="idx"
              @change="radioUpdate"
            />
          </div>
          <div class="input-container">
            <i class="fas fa-store"></i>
            <validation-provider
              name="셀러명"
              rules="required|korAlphaNum"
              v-slot="{ errors, classes }"
            >
              <input
                type="text"
                v-model="infoInput.korean_name"
                :class="classes"
                placeholder="셀러명 (상호)"
              />
              <p class="validation-text">{{ errors[0] }}</p>
            </validation-provider>
          </div>
          <div class="input-container">
            <i class="fa fa-font"></i>
            <validation-provider
              name="셀러명"
              rules="required|alpha_spaces"
              v-slot="{ errors, classes }"
            >
              <input
                type="text"
                v-model="infoInput.eng_name"
                :class="classes"
                placeholder="셀러명 (영문 상호)"
              />
              <p class="validation-text">{{ errors[0] }}</p>
            </validation-provider>
          </div>
          <div class="input-container">
            <i class="fa fa-phone"></i>
            <validation-provider
              name="고객센터 전화번호"
              rules="required|numeric|max:11"
              v-slot="{ errors, classes }"
            >
              <input
                type="text"
                v-model="infoInput.center_number"
                :class="classes"
                placeholder="고객센터 전화번호"
              />
              <p class="validation-text">{{ errors[0] }}</p>
            </validation-provider>
          </div>
          <div class="input-container">
            <i class="fas fa-desktop"></i>
            <validation-provider
              name="스토어사이트"
              rules="required|siteCheck"
              v-slot="{ errors, classes }"
            >
              <input
                type="text"
                v-model="infoInput.site_url"
                :class="classes"
                placeholder="사이트 URL"
              />
              <p class="validation-text">{{ errors[0] }}</p>
            </validation-provider>
          </div>
        </fieldset>
        <div class="button-container">
          <bluebutton
            type="submit"
            v-on:submit="onSubmit"
            :disabled="invalid"
            word="신청"
          />
          <div>
            <redbutton type="button" word="취소" />
          </div>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import ButtonBlue from '../components/ButtonBlue';
import ButtonRed from '../components/ButtonRed';
import RadioBtn from '../components/RadioBtn';
import Spinner from '../components/Spinner';
import '../../vee-validate.js';
import { ValidationObserver } from 'vee-validate';
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { loginApi } from '@/api';

export default {
  name: 'Signup',
  components: {
    bluebutton: ButtonBlue,
    redbutton: ButtonRed,
    'radio-btn': RadioBtn,
    'validation-provider': ValidationProvider,
    'validation-observer': ValidationObserver,
    Spinner
  },
  data() {
    return {
      infoInput: {
        seller_loginID: '',
        password: '',
        password2: '',
        phone_number: '',
        korean_name: '',
        eng_name: '',
        center_number: '',
        site_url: ''
      },
      submitValue: {},
      radioList: [
        '쇼핑몰',
        '마켓',
        '로드샵',
        '디자이너브랜드',
        '제너럴브랜드',
        '내셔널브랜드',
        '뷰티'
      ],
      selectedRadio: 1,
      serverID: '',
      isLoading: false
    };
  },

  methods: {
    radioUpdate: function(idx) {
      this.selectedRadio = idx;
    },
    alertWarn(e) {
      let result = confirm('브랜디 가입을 취소하시겠습니까?');
      if (result) {
        e.preventDefault();
        this.$router.push('/admin/login');
      }
    },
    onSubmit() {
      this.isLoading = true;
      const infoInputKeys = Object.keys(this.infoInput);
      for (let i in infoInputKeys) {
        this.submitValue = {
          ...this.submitValue,
          [infoInputKeys[i]]: this.infoInput[infoInputKeys[i]]
        };
      }
      this.submitValue = {
        ...this.submitValue,
        ['attribute_id']: this.selectedRadio
      };
      return this.sendSubmit(this.submitValue);
    },
    sendSubmit(val) {
      loginApi
        .signup(val)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            alert('회원가입을 축하합니다!');
            this.isLoading = false;
            this.$router.push('/admin/login');
          }
        })
        .catch(err => {
          if (err.response.data['MESSAGE'] === 'DUPLICATED ID') {
            this.isLoading = false;
            this.serverID = this.infoInput.seller_loginID;
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/_reset.scss';
@import '../styles/commonD.scss';

h1 {
  margin-bottom: 20px;
  color: $darkgrey;
  font-weight: 400;
  font-size: 22px;
}

h2 {
  align-self: flex-start;
  margin-bottom: 10px;
  color: $darkgrey;
  font-weight: 400;
}

p {
  color: $darkgrey;
  font-size: 14px;
}

input[type='text'],
input[type='password'] {
  width: 360px;
  height: 35px;
  margin-bottom: 7px;
  border: 1px solid $midgrey;
  border-radius: 5px;
  background-color: white;
  text-indent: 30px;

  &:focus {
    outline: none;
    border: 1px solid $darkgrey;
  }

  &.invalid {
    border: 1px solid $validred;
  }
}

.validation-text {
  margin-bottom: 10px;
  color: $validred;
  font-size: 12px;
}

.join-info {
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  font-family: Avenir, Helvetica, sans-serif;
  font-weight: 400;

  .line {
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background-color: $midgrey;
  }

  .input-container {
    position: relative;

    .fa,
    .fas {
      position: absolute;
      font-size: 14px;
      top: 10px;
      left: 10px;
      color: #e5e5e5;
    }

    .fa-phone {
      transform: rotate(100deg);
    }

    .fa-info-circle {
      font-size: 13px;
      color: $midblue;
      top: 0;
      left: 0;
    }
  }

  .join-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 440px;
    height: auto;
    padding: 30px;
    background-color: white;

    img {
      width: 360px;
      height: auto;
    }

    .join-info-text-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 360px;
      margin: 30px 0 10px 0;
      font-size: 18px;

      .blue-text {
        color: $midblue;
        font-size: 12px;
        text-indent: 15px;
        line-height: 1.3;
      }

      .title-box {
        align-self: start;
        margin-bottom: 10px;

        .h2-inline {
          display: inline;
        }
      }

      .radio-btn-container {
        display: flex;
        flex-wrap: wrap;
        width: 360px;
        margin-bottom: 20px;
        font-size: 12px;
        font-weight: 300;

        label {
          width: 100px;
        }
      }
    }
  }
  .button-container {
    display: flex;
  }
}
</style>
