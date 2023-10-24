# vue-codemirror

[![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)](https://vuejs.org)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-codemirror.svg?style=for-the-badge)](https://github.com/surmon-china/vue-codemirror/stargazers)
&nbsp;
[![npm](https://img.shields.io/npm/v/vue-codemirror?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/vue-codemirror)
&nbsp;
[![Test Codecov](https://img.shields.io/codecov/c/github/surmon-china/vue-codemirror?style=for-the-badge)](https://codecov.io/gh/surmon-china/vue-codemirror)
&nbsp;
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](/LICENSE)

[**CodeMirror(6)**](https://codemirror.net) component for **Vue(3)**.

`vue-codemirror` v5/v6 has been released. This is a new version based on [CodeMirror@6](https://codemirror.net) and is available to Vue3 only. Since CodeMirror@6 is developed with native ES Modules, the new version will no longer support direct browser references to UMD modules. In short, the new version is ⚠️ **completely NOT compatible** with previous versions. If you wish to continue using Vue2 or a lower version of CodeMirror, please refer to the legacy versions below.

This [**example site**](https://github.surmon.me/vue-codemirror) contains most of what you want.

#### Legacy version

- [examples](https://v1.github.surmon.me/vue-codemirror) (Vue2)
- [vue-codemirror@4.x](https://github.com/surmon-china/vue-codemirror/tree/v4.0.6) (Vue2 / CodeMirror5)

---

#### Documentation

- [CodeMirror6 Guide](https://codemirror.net/docs/guide/)
- [CodeMirror6 APIs](https://codemirror.net/docs/ref/)
- [CodeMirror6 Examples](https://codemirror.net/examples/)
- [CodeMirror6 Example: Writing a Language Package](https://codemirror.net/examples/lang-package/)
- [CodeMirror6 Example: Styling](https://codemirror.net/examples/styling/)
- [CodeMirror Forum](https://discuss.codemirror.net/)

#### CodeMirror packages

- [CodeMirror6 Languages](https://github.com/orgs/codemirror/repositories?q=lang-&type=all)
- [CodeMirror6 Themes](https://github.com/orgs/codemirror/repositories?q=theme&type=all)

---

### Usage

#### Install

```bash
yarn add codemirror vue-codemirror
```

```bash
npm install codemirror vue-codemirror --save
```

#### Depending on your actual needs, you may need to install more CodeMirror packages

```bash
# CodeMirror languages...
yarn add @codemirror/lang-html
yarn add @codemirror/lang-json
yarn add @codemirror/lang-javascript

# CodeMirror themes...
yarn add @codemirror/theme-one-dark

# more CodeMirror packages...
```

#### If you need import API/interface from codemirror, you need to make codemirror explicitly dependent in your `package.json`

e.g.

```json
"dependencies": {
  "@codemirror/state": "6.x"
}
```

```ts
import { EditorState } from '@codemirror/state'
```

#### Local component

```vue
<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script>
  import { defineComponent } from 'vue'
  import { Codemirror } from 'vue-codemirror'
  import { javascript } from '@codemirror/lang-javascript'
  import { oneDark } from '@codemirror/theme-one-dark'

  export default defineComponent({
    components: {
      Codemirror
    },
    setup() {
      const code = ref(`console.log('Hello, world!')`)
      const extensions = [javascript(), oneDark]

      // Codemirror EditorView instance ref
      const view = shallowRef()
      const handleReady = (payload) => {
        view.value = payload.view
      }

      // Status is available at all times via Codemirror EditorView
      const getCodemirrorStates = () => {
        const state = view.value.state
        const ranges = state.selection.ranges
        const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
        const cursor = ranges[0].anchor
        const length = state.doc.length
        const lines = state.doc.lines
        // more state info ...
        // return ...
      }

      return {
        code,
        extensions,
        handleReady,
        log: console.log
      }
    }
  })
</script>
```

#### Global component

```javascript
import { createApp } from 'vue'
import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'

const app = createApp()

app.use(VueCodemirror, {
  // optional default global options
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  placeholder: 'Code goes here...',
  extensions: [basicSetup]
  // ...
})
```

### Component Props

| prop          | description                                                                            | type                     | default |
| :------------ | :------------------------------------------------------------------------------------- | :----------------------- | :------ |
| modelValue    | The input values accepted by the component also support two-way binding.               | `String`                 | `''`    |
| autofocus     | Focus editor immediately after mounted.                                                | `Boolean`                | `false` |
| disabled      | Disable input behavior and disable change state.                                       | `Boolean`                | `false` |
| indentWithTab | Bind keyboard Tab key event.                                                           | `Boolean`                | `true`  |
| tabSize       | Specify the indent when the Tab key is pressed.                                        | `Number`                 | `2`     |
| placeholder   | Display when empty.                                                                    | `String`                 | `''`    |
| style         | The CSS style object that acts on the CodeMirror itself.                               | `Object`                 | `{}`    |
| phrases       | Codemirror [internationalization phrases](https://codemirror.net/examples/translate/). | `Object`                 | `{}`    |
| autoDestroy   | Auto destroy the CodeMirror instance before the component unmount.                     | `Boolean`                | `true`  |
| extensions    | Passed to CodeMirror `EditorState.create({ extensions })`                              | `Extension`              | `[]`    |
| selection     | Passed to CodeMirror `EditorState.create({ selection })`                               | `EditorSelection`        | -       |
| root          | Passed to CodeMirror `new EditorView({ root })`                                        | `ShadowRoot \| Document` | -       |

### Component Events

| event               | description                                             | params                                                                           |
| :------------------ | :------------------------------------------------------ | :------------------------------------------------------------------------------- |
| `update:modelValue` | **Only** when the CodeMirror content (doc) has changed. | `(value: string, viewUpdate: ViewUpdate)`                                        |
| change              | ditto                                                   | ditto                                                                            |
| update              | When any state of CodeMirror changes.                   | `(viewUpdate: ViewUpdate)`                                                       |
| focus               | When CodeMirror focused.                                | `(viewUpdate: ViewUpdate)`                                                       |
| blur                | When CodeMirror blurred.                                | `(viewUpdate: ViewUpdate)`                                                       |
| ready               | When edirot component mounted.                          | `(payload: { view: EditorView; state: EditorState; container: HTMLDivElement })` |

### Basic Setup

The [basic-setup](https://codemirror.net/docs/ref/#basic-setup) extension is integrated by default in the vue-codemirror configuration and is intended as a handy helper to quickly set up CodeMirror without having to install and import a lot of standalone packages. If you want to override the default behavior of the config, just pass the empty array when installing the component globally.

```js
app.use(VueCodemirror, {
  // keep the global default extensions empty
  extensions: []
})
```

### Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

### License

Licensed under the [MIT](/LICENSE) License.
