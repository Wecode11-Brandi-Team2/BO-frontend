<template>
  <div class="container">
    <!--SUCCESS-->
    <div class="success-box" v-show="isSuccess">
      <div class="uploaded-box">
        <h2>파일을 업로드 했습니다.</h2>
        <div class="reset-btn" @click="reset()">재업로드</div>
      </div>
      <img
        v-show="uploadedFiles.imagePreviewUrl"
        class="uploadedImg"
        :src="uploadedFiles.imagePreviewUrl"
        alt="image"
      />
    </div>
    <div class="saving-box" v-show="isSaving">
      <div class="uploaded-box">
        <h2 class="uploading-text">파일 업로드 중 ...</h2>
      </div>
    </div>
    <!--FAILED-->
    <div v-show="isFailed">
      <div class="uploaded-box">
        <h2>업로드에 실패했습니다.</h2>
        <div class="reset-btn" @click="reset()">재시도</div>
      </div>
    </div>
    <form
      enctype="multipart/form-data"
      method="post"
      v-show="isInitial || isSaving"
    >
      <div class="dropbox">
        <div class="main-btn" v-if="fileIdx === 'image_1'">
          대표 이미지 등록
        </div>
        <input
          v-show="isInitial"
          @change="emitFile($event)"
          :id="fileIdx"
          :disabled="isSaving"
          type="file"
          accept=".jpg, .jpeg"
          class="input-file"
        />
        <p v-show="isInitial">
          파일을 이곳에<br />
          클릭해서 업로드해주세요.
        </p>
      </div>
    </form>
  </div>
</template>

<!-- Javascript -->
<script>
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: 'FileUploader',
  props: ['fileIdx'],
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: STATUS_INITIAL,
      uploadFieldName: 'images',
      fileCount: 0
      // images: {
      //   image_1: '',
      //   image_2: '',
      //   image_3: '',
      //   image_4: '',
      //   image_5: ''
      // }
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = {};
      this.uploadError = null;
    },

    emitFile(e) {
      e.preventDefault();
      const reader = new FileReader();
      const fileList = e.target.files;
      const file = fileList[0];

      reader.onloadend = () => {
        this.uploadedFiles = { file: file, imagePreviewUrl: reader.result };
      };
      console.log(this.uploadedFiles);
      reader.readAsDataURL(file);
      this.$emit('change', [fileList, e.target.id]);
      this.changeStatus(fileList);
    },
    changeStatus(fileList) {
      this.currentStatus = STATUS_SAVING;
      if (fileList[0]) {
        this.currentStatus = STATUS_SUCCESS;
      } else {
        this.currentStatus = STATUS_FAILED;
      }
    }
  }
};
</script>

<!-- SASS styling -->
<style lang="scss" scoped>
@import '../../styles/commonD.scss';

.container {
  margin: 10px;
  z-index: 100;
}

.saving-box {
  position: relative;
  top: 0;
  width: 200px;
  height: 200px;
  padding: 10px;
}

.success-box {
  position: relative;

  .uploaded-box {
    position: absolute;
    padding: 10px;
    top: 70px;
    left: 25px;
    text-align: center;
    background-color: $softgrey;
    opacity: 0.8;
    z-index: 50;
  }
  .reset-btn {
    margin-top: 10px;
    color: $midblue;
    font-weight: 700;
    cursor: pointer;
  }
}
.uploading-text {
  width: 200px;
  height: 200px;
}

.uploadedImg {
  margin: 0;
  width: 200px;
  height: 200px;
  border: 1px solid $midgrey;
  object-fit: cover;

  &:hover {
    opacity: 0.9;
  }
}

.main-btn {
  @include blue-btn;
  position: absolute;
  top: 120px;
  left: 40px;
  border-radius: 5px;
  padding: 10px;
  z-index: 55;
  pointer-events: none;
}

.dropbox {
  width: 200px;
  height: 200px;
  border: 1px solid $midgrey;
  outline: 1px solid $midgrey;
  outline-offset: -10px;
  background-color: $lightgrey;
  color: dimgray;
  padding: 20px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.text {
  width: 80%;
  height: 30px;
}

.dropbox p {
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  padding: 50px 0;
}
</style>
