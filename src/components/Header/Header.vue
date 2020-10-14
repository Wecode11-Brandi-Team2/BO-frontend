<template>
  <header @mouseover="Active">
    <div class="page-logo">
      <a class="link-home">
        <img alt="" src="../../assets/images/brandi_logo.png" />
      </a>
    </div>
    <div class="transparent" @mouseover="toggleDrop" @mouseleave="deActive">
      <div class="logout">
        <span class="username">intern_master</span>
        <i class="fa fa-angle-down" />
        <div class="dropdown" v-show="dropOpen">
          <a href="#">
            <i class="fa fa-key" />
            <span>log out</span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mouseActive: true,
      dropOpen: false
    };
  },
  methods: {
    toggleDrop() {
      if (this.mouseActive) {
        this.dropOpen = true;
      } else {
        this.dropOpen = false;
      }
      // this.mouseActive = false;
    },
    // closeDrop() {
    //   this.dropOpen = false;
    // },
    Active() {
      this.mouseActive = true;
    },
    deActive() {
      this.mouseActive = false;
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  min-height: 45px;
  border: 0px;
  margin: 0;
  background: #873b53;
  box-shadow: none;
  z-index: 1200;
  font-family: sans-serif;

  .page-logo {
    display: flex;
    align-items: center;
    width: 225px;
    height: 45px;
    padding: 0 20px;
    line-height: 40px;
    cursor: pointer;

    img {
      width: 100px;
    }
  }

  .logout {
    position: relative;
    display: flex;
    align-items: center;
    width: 150px;
    height: 45px;
    padding: 0 10px;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      background: #414247;
    }

    .transparent {
      position: absolute;
      top: 0;
      width: 100%;
      height: 150px;
    }

    .username {
      color: #cecfd3;
      line-height: 20px;
      margin-right: 5px;
    }

    .fa-angle-down {
      font-family: 'FontAwesome';
      font-size: 13px;
      color: #999ba2;

      &:before {
        content: '\f107';
      }
    }

    .dropdown {
      position: absolute;
      top: 45px;
      right: 0;
      left: auto;
      min-width: 160px;
      height: 100px;
      padding: 5px 0;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      box-shadow: 5px 5px rgba(102, 102, 102, 0.1);
      margin-top: 2px;
      font-size: 14px;
      text-align: left;
      list-style: none;
      background-color: #fff;
      background-clip: padding-box;
      z-index: 1000;

      // .active {
      //   display: block;
      // }

      // &:hover {
      //   background-color: #eee;
      // }

      a {
        clear: both;
        padding: 6px 0 6px 13px;
        color: #333;
        text-decoration: none;
        font-weight: normal;
        line-height: 18px;
        white-space: nowrap;
        outline: none;

        .fa_key {
          font-size: 14px;

          &:before {
            content: '\f084';
          }
        }
      }
    }
  }
}
</style>
