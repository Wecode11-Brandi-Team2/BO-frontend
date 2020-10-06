<template>
  <div class="editor-whole">
    <div class="btn-group">
      <div v-for="(item, index) in commands" :key="index">
        <button
          type="button"
          class="btn"
          data-toggle="tooltip"
          data-placement="bottom"
          :title="item.title"
          @click="exec(item.command, currentValue)"
        >
          <i :class="'fa ' + item.icon"></i>
        </button>
      </div>
    </div>
    <div
      class="editor"
      id="editor"
      contenteditable="true"
      @mouseup="getCurrentTagName"
    ></div>
    <div>
      <button class="btn clear-btn" @click="clear">
        Clear
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  mounted() {
    // this.currentValue = document.getElementById('editor').innerText;
  },
  watch: {
    currentValue(newValue) {
      this.currentValue = document.getElementById('editor').innerText;
      if (this.currentValue !== newValue) this.currentValue = newValue;
    },
    currentTagName() {
      this.getCurrentTagName();
    }
  },
  data() {
    return {
      commands: [
        { name: 'Bold', title: 'Bold', command: 'bold', icon: 'fa-bold' },
        { name: 'Fonts', title: 'Fonts', command: 'fontName', icon: 'fa-font' },
        { name: 'Undo', title: 'Undo', command: 'undo', icon: 'fa-undo' },
        { name: 'Redo', title: 'Redo', command: 'redo', icon: 'fa-repeat' },
        { name: 'Copy', title: 'Copy', command: 'copy', icon: 'fa-copy' },
        { name: 'Paste', title: 'Paste', command: 'paste', icon: 'fa-paste' },
        { name: 'Cut', title: 'Cut', command: 'cut', icon: 'fa-cut' },
        {
          name: 'Image',
          title: 'Image',
          command: 'insertImage',
          icon: 'fa-image'
        }
      ],
      currentTagName: '',
      currentValue: ''
    };
  },

  methods: {
    exec(command, value) {
      // value = document.getElementById('editor').innerText;
      console.log(value);
      document.execCommand(command, false, value);
    },
    getCurrentTagName() {
      // console.log(window.getSelection().baseNode.innerText);
      if (window.getSelection().baseNode) {
        this.currentTagName = window.getSelection().baseNode.parentNode.tagName;
      }
    },
    clear() {
      if (confirm('작성중이던 내용을 삭제하시겠습니까?')) {
        document.getElementById('editor').innerHTML = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/commonD.scss';

.editor-whole {
  width: 100%;
  min-height: 20em;
}

.editor {
  background-color: white;
  border: 1px solid $midgrey;
  width: 100%;
  min-height: 20em;
  padding: 1em;
}

.btn-group {
  display: flex;
  width: 100%;

  .btn {
    width: 40px;
    height: 40px;
  }
}

.clear-btn {
  width: 60px;
  padding: 10px;
}

.btn:hover {
  background: lighten(black, 90%);
  color: lighten(black, 10%);
}

[contenteditable]:focus {
  outline: none;
}

[contenteditable] {
  font-size: 120%;
}
</style>
