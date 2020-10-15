<template>
  <div class="login">
    <img class="login-logo" src="../../public/img/logo_seller_admin_1.png" />
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form class="input-whole" @submit.prevent="onSubmit">
        <h1>셀러 로그인</h1>
        <validation-provider rules="required" v-slot="{ errors, classes }">
          <div class="input-container">
            <i class="fas fa-user"></i>
            <input
              v-model="idValue"
              :class="classes"
              type="text"
              placeholder="id"
            />
            <p class="validation-text">{{ errors[0] }}</p>
          </div>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors, classes }">
          <div class="input-container">
            <i class="fa fa-lock"></i>
            <input
              v-model="pwValue"
              :class="classes"
              type="password"
              placeholder="password"
            />
            <p class="validation-text">{{ errors[0] }}</p>
          </div>
        </validation-provider>
        <div class="find-container">
          <label class="checkbox-container" for="checkbox">
            <input class="checkbox" type="checkbox" />아이디/비밀번호 기억하기
          </label>
          <span class="find-pw">
            <i class="fas fa-search"></i>
            비밀번호 찾기
          </span>
        </div>
        <div class="login-buttons">
          <router-link to="/admin/signup">
            <button class="join-btn">
              셀러가입
            </button>
          </router-link>
          <button
            class="login-btn"
            @submit="[checkValid(), onSubmit()]"
            :disabled="invalid"
          >
            로그인
          </button>
        </div>
      </form>
      <div class="banner-container">
        <img
          class="login-banner"
          src="../../public/img/admin_mainbn_helpi.png"
        />
        <div class="banner-info">
          <h2>입점안내 <span>보러가기</span></h2>
          <h2>고객센터</h2>
          <p>
            | 대표번호 : 1566-1910
          </p>
          <p>| 카카오톡 플러스친구 : <span>@브랜디셀러</span></p>
        </div>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationObserver, configure } from 'vee-validate';
import {
  ValidationProvider,
  extend
} from 'vee-validate/dist/vee-validate.full.esm';
import { required } from 'vee-validate/dist/rules';
import { mapActions } from 'vuex';
import { loginApi } from '@/api';

configure({
  classes: {
    invalid: 'is-invalid'
  }
});

extend('required', {
  ...required,
  message: '필수 입력항목입니다.'
});

export default {
  name: 'Login',
  components: {
    'validation-provider': ValidationProvider,
    'validation-observer': ValidationObserver
  },
  data() {
    return {
      idValue: '',
      pwValue: '',
      inputError: false
    };
  },
  methods: {
    ...mapActions({
      login(dispatch, token) {
        return dispatch('adminStore/login', token);
      }
    }),
    checkValid() {
      if ((this.idValue.length === 0) | (this.pwValue.length === 0)) {
        return this.inputError === true;
      }
    },
    onSubmit() {
      loginApi
        .login({ loginID: this.idValue, password: this.pwValue })
        .then(res => {
          console.log(res.data);
          if (res.data.access_token) {
            this.login(res.data.access_token);
          }
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => {
          console.log(err.response);
          console.log(err.response.message);
          alert('로그인에 실패하였습니다.');
        });
    }
  }
};
</script>
<style scoped lang="scss">
@import '../styles/_reset.scss';
@import '../styles/commonD.scss';

.login {
  @include flexColCen;
  width: 100%;
  height: 100vh;
  background-color: $lightgrey;
  font-family: Verdana, sans-serif;
  font-weight: 400;

  .login-logo {
    width: 130px;
    height: auto;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .input-whole {
    @include flexColCen;
    width: 360px;
    padding: 35px 30px 25px 30px;
    color: black;
    background-color: white;
    border: 1px solid $midgrey;
    outline: none;

    h1 {
      align-self: start;
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 300;
    }

    &:focus {
      outline: none;
    }

    .input-container {
      position: relative;

      .fa-user {
        position: absolute;
        top: 10px;
        left: 10px;
        color: $midgrey;
      }

      .fa-lock {
        position: absolute;
        top: 10px;
        left: 10px;
        color: $midgrey;
      }

      input[type='text'],
      input[type='password'] {
        width: 310px;
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
    }

    .find-container {
      .checkbox-container {
        font-size: 14px;
        font-weight: 400;

        .checkbox {
          width: 15px;
          height: 15px;
          margin-top: 20px;
        }
      }

      .find-pw {
        color: $midblue;
        font-size: 14px;
        font-weight: 400;
      }

      .fa-search {
        color: $midblue;
      }
    }

    .login-buttons {
      @include spaceBtwn;
      width: 150px;
      margin-top: 25px;
    }

    .join-btn {
      width: 70px;
      height: 30px;
      border: none;
      border-radius: 5px;
      background-color: black;
      color: white;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 1px;
    }

    .login-btn {
      width: 70px;
      height: 30px;
      border: none;
      border-radius: 5px;
      background-color: $midblue;
      color: white;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 1px;
    }
  }
}

.banner-container {
  width: 360px;

  .login-banner {
    width: 100%;
  }

  .banner-info {
    width: 100%;
    height: 150px;
    padding: 20px 30px 20px 30px;
    background-color: white;
    letter-spacing: 120%;

    h2 {
      margin-bottom: 10px;
      font-size: 18px;

      span {
        color: $midblue;
      }
    }

    p {
      font-size: 14px;
      line-height: 1.5;

      span {
        font-weight: 500;
        color: $midblue;
      }
    }
  }

  .address {
    width: 100%;
    background-color: red;
  }
}
</style>
