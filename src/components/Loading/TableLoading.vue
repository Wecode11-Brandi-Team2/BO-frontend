<template>
  <div class="loading-container">
    <div class="spinner-block">
      <img alt="loading_spinner" src="@/assets/images/loading_spinner.gif" />
      <div class="loading-text">Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.document.body.style.overflowY = 'hidden';
  },
  beforeDestroy() {
    window.document.body.style.overflowY = 'auto';
  }
};
</script>

<style lang="scss" scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  cursor: wait;

  .spinner-block {
    position: absolute;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 120px;
    height: 45px;
    top: 120px;
    left: 45%;
    border-radius: 4px;
    text-align: center;
    color: rgb(0, 0, 0);
    background: #e6e6e6;
    z-index: 1011;
    cursor: wait;

    .loading-text {
      display: flex;
      align-items: center;
      margin-left: 12px;
    }
  }
}
</style>
