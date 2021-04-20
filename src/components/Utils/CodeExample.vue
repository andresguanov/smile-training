<template>
  <div class="code-example">
    <div style="margin-bottom: 4px">
      <small style="opacity: 0.6">
        <kbd>Ctrl</kbd>+<kbd>S</kbd> (o <kbd>Cmd</kbd>+<kbd>S</kbd> en Mac) para evaluar los cambios
      </small>
    </div>
    <div class="code-example-menu">
      <div>
        <sm-button
          label="Template"
          size="small"
          :ghost="currentSession !== 'html'"
          :primary="currentSession === 'html'"
          @click="changeSessionTo('html')"
        />
        <sm-button
          v-if="config"
          label="JS"
          size="small"
          :ghost="currentSession !== 'js'"
          :primary="currentSession === 'js'"
          @click="changeSessionTo('js')"
        />
        <sm-button label="Reiniciar" size="small" ghost @click="reset" />
      </div>
      <div>
        <label>
          Resultado
          <span v-if="syntaxError" style="color: #e85e42">Syntax error: check console</span>
        </label>
      </div>
    </div>
    <div class="code-example-container">
      <div class="editor-wrapper">
        <div :id="`editor-${uuid}`" class="editor" />
      </div>

      <code-ex-c
        class="code-example-content"
        :docTemplate="result"
        :config="localConfigEvaluated"
      />
    </div>
  </div>
</template>

<script>
import codeExC from "./CodeExampleContent"
import { debounce } from "lodash-es"
import prism from "prismjs"

export default {
  name: "sm-code-example",
  components: {
    codeExC
  },
  props: ["c", "config"],
  data() {
    return {
      result: "",
      code: "",
      editing: false,
      js: false,
      localConfigEvaluated: null,
      localConfigInError: null,
      syntaxError: false,
      editor: null,
      sessions: {
        html: "",
        js: ""
      },
      currentSession: "html"
    }
  },
  methods: {
    changeSessionTo(session) {
      if (session !== this.currentSession) {
        this.sessions[this.currentSession] = this.editor.getSession()
        this.currentSession = session
        this.editor.setSession(this.sessions[this.currentSession])
      }
    },
    setUpEditor() {
      // It assumes https://cdnjs.com/libraries/ace is injected to vuepress
      if (!this.editor) {
        this.editor = ace.edit(`editor-${this.uuid}`)
        this.editor.setTheme("ace/theme/textmate")
        this.editor.commands.addCommand({
          name: "save",
          bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
          exec: () => {
            this.sessions[this.currentSession] = this.editor.getSession()
            this.renderExample({
              config: this.sessions["js"],
              code: this.sessions["html"]
            })
          }
        })
      }
      this.sessions.html = ace.createEditSession(this.c, "ace/mode/html")
      this.sessions.html.setOptions({ tabSize: 2, useSoftTabs: false })
      if (this.config) {
        this.sessions.js = ace.createEditSession(this.config, "ace/mode/javascript")
        this.sessions.js.setOptions({ tabSize: 2, useSoftTabs: false })
      }

      this.editor.setSession(this.sessions[this.currentSession])
      window.ce = this
    },
    reset() {
      this.code = this.c
      this.setUpEditor()
      this.renderExample()
    },
    renderExample({ config = this.config, code = this.code } = {}) {
      try {
        if (config) eval("this.localConfigEvaluated = " + config)
        this.result = `<div>${code}</div>`

        this.syntaxError = false
      } catch (error) {
        console.error(error)
        this.syntaxError = true
      }
    }
  },
  mounted() {
    this.reset()
    this.setUpEditor()
  }
}
</script>

<style lang="scss">
.code-example {
  height: 470px;
  display: block;
  overflow: hidden;
  margin-top: 20px;
  position: relative;

  .code-example-menu {
    display: flex;
    width: 100%;
    background-color: #eff1f5;
    padding: 8px 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 10;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    > div {
      display: flex;
      flex: 1;
      justify-content: flex-start;
      > button {
        margin: 0 10px 0 0;
      }
    }
    label {
      color: $brand1;
      font-size: 12px;
      line-height: 24px;
      font-weight: 500;
    }
  }

  .code-example-container {
    padding-bottom: 4px;
    margin-top: 44px;
    height: calc(100% - 58px);
    width: 100%;
    display: flex;

    .editor-wrapper {
      width: 50%;
      border: 1px solid #ccc;
      border-radius: 5px;
      position: relative;

      .editor {
        position: absolute;
        top: 0;
        right: 3px;
        bottom: 0;
        left: 0;
      }
    }

    > div.code-example-content {
      display: inline-block;
      width: 50%;
      overflow: auto;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }

  kbd {
    display: inline-block;
    margin: 0 0.1em;
    padding: 0.1em 0.6em;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 11px;
    line-height: 1.5;
    color: #242729;
    text-shadow: 0 1px 0 #fff;
    background-color: #e4e6e8;
    border: 1px solid #9fa6ad;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgb(12 13 14 / 15%), inset 0 1px 0 0 #fff;
    overflow-wrap: break-word;
  }
}
</style>
