<p align='center'>
  <img src="https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210224005014.png" alt="vite-plugin-banner" />
</p>

<p align='center'>
  <a href='https://www.npmjs.com/package/vite-plugin-banner'>
    <img src="https://img.shields.io/npm/v/vite-plugin-banner?color=56b7ff&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/vite-plugin-banner" target="__blank">
    <img src="https://img.shields.io/npm/dm/vite-plugin-banner?color=56b7ff&label=" />
  </a>
  <a href="https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.md" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=56b7ff" />
  </a>
  <a href="https://github.com/chengpeiquan/vite-plugin-banner" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/vite-plugin-banner?style=social" />
  </a>
</p>
<br>
<br>

English | [简体中文](https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.zh-CN.md)

- [Features](#features)
- [Installation](#installation)
- [Options](#options)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Advanced usage](#advanced-usage)
  - [Fun usage](#fun-usage)
  - [Add different banners](#add-different-banners)
  - [Optional parameter format](#optional-parameter-format)
- [License](#license)

## Features

Adds a banner to the top of each generated chunk.

## Installation

Install the package from npm (or yarn, or pnpm).

```bash
npm install -D vite-plugin-banner
```

## Options

| Plugin Options Type | Description                     | Example                                                 |
| :------------------ | :------------------------------ | :------------------------------------------------------ |
| string              | The banner content              | [Basic usage](#basic-usage)                             |
| ContentCallback     | See the type declarations below | [Add different banners](#add-different-banners)           |
| BannerPluginOptions | See the type declarations below | [Optional parameter format](#optional-parameter-format) |

· Type Declarations:

````ts
/**
 * Some options from `vite.config.[ts|js]`
 * @since 0.2.0
 */
export interface BannerPluginOptions {
  /**
   * The comment content of the banner
   * @since ^0.6.0 support for `ContentCallback` types
   */
  content: string | ContentCallback

  /**
   * The output directory from the configuration of Vite.js
   * @default 'dist'
   */
  outDir?: string

  /**
   * Whether to print error messages to the console
   * @since 0.4.0
   * @default false
   */
  debug?: boolean

  /**
   * By default, the validity of the content will be verified.
   *
   * If set to `false`, no verification will be performed.
   * @see https://github.com/chengpeiquan/vite-plugin-banner/issues/13
   * @since 0.5.0
   * @default true
   */
  verify?: boolean
}

/**
 * Callback function to get the contents to be injected.(or not inject)
 * @since 0.6.0
 *
 * @param fileName - The name of the file currently being processed
 * @returns
 *  1. When a valid string is returned, it will become the banner content
 *  2. Returning a Falsy value will skip processing(e.g. `''`, `null`, `undefined`)
 *
 * @example
 * ```ts
 *  content: (fileName: string) => {
 *    // Or use switch statement
 *    return fileName.endsWith('.js')
 *      ? 'This message will inject into `js` files.'
 *      : 'This message will inject into other files.'
 *  }
 * ```
 */
export type ContentCallback = (fileName: string) => string | null | undefined
````

## Usage

In most cases, just use the `string` format as a plugin option.

### Basic usage

Add it to `vite.config.ts`

```ts
// vite.config.ts
import banner from 'vite-plugin-banner'
// Other dependencies...

export default defineConfig({
  plugins: [banner('This is the banner content.')],
})
```

When you run `npm run build` on your project, In the `dist` folder(Or the [build.outDir](https://vitejs.dev/config/#build-outdir) in `vite.config.ts` you configured), Except for `vendor` files, all `js` and `css` files will add a banner to the top.

e.g. in `app.b3a7772e.js`:

```js
/* This is the banner content. */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### Advanced usage

Of course, the most ideal banner is related to your package information.

First, You need to update your `package.json` like this, For example, it contains such field content:

```json
{
  "name": "chengpeiquan.com",
  "version": "0.1.0",
  "description": "My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.",
  "author": "chengpeiquan",
  "homepage": "https://chengpeiquan.com/"
}
```

Then, import the `package.json` into `vite.config.ts`, update the banner like this:

```ts
// vite.config.ts
import pkg from './package.json'
// Other dependencies...

export default defineConfig({
  plugins: [
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
    ),
  ],
})
```

Run `npm run build`, you can see the banner become more detailed.

e.g. in `app.6936be52.js`:

```js
/**
 * name: chengpeiquan.com
 * version: v0.1.0
 * description: My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.
 * author: chengpeiquan
 * homepage: https://chengpeiquan.com/
 */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### Fun usage

If you want to make some banners that show your personality, you can make some interesting content from some online generators.

Such as:

- [http://www.network-science.de/ascii/](http://www.network-science.de/ascii/)

- [https://www.bootschool.net/ascii](https://www.bootschool.net/ascii)

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    banner(`
    ██   ██         ███████   ██      ██ ████████   ██    ██   ███████   ██     ██
    ░██  ░██        ██░░░░░██ ░██     ░██░██░░░░░   ░░██  ██   ██░░░░░██ ░██    ░██
    ░██  ░██       ██     ░░██░██     ░██░██         ░░████   ██     ░░██░██    ░██
    ░██  ░██      ░██      ░██░░██    ██ ░███████     ░░██   ░██      ░██░██    ░██
    ░██  ░██      ░██      ░██ ░░██  ██  ░██░░░░       ░██   ░██      ░██░██    ░██
    ░██  ░██      ░░██     ██   ░░████   ░██           ░██   ░░██     ██ ░██    ░██
    ░██  ░████████ ░░███████     ░░██    ░████████     ░██    ░░███████  ░░███████ 
    ░░   ░░░░░░░░   ░░░░░░░       ░░     ░░░░░░░░      ░░      ░░░░░░░    ░░░░░░░  
    `),
  ],
})
```

Run `npm run build`, e.g. in `app.d9a287b8.js`:

```js
/*
    ██   ██         ███████   ██      ██ ████████   ██    ██   ███████   ██     ██
    ░██  ░██        ██░░░░░██ ░██     ░██░██░░░░░   ░░██  ██   ██░░░░░██ ░██    ░██
    ░██  ░██       ██     ░░██░██     ░██░██         ░░████   ██     ░░██░██    ░██
    ░██  ░██      ░██      ░██░░██    ██ ░███████     ░░██   ░██      ░██░██    ░██
    ░██  ░██      ░██      ░██ ░░██  ██  ░██░░░░       ░██   ░██      ░██░██    ░██
    ░██  ░██      ░░██     ██   ░░████   ░██           ░██   ░░██     ██ ░██    ░██
    ░██  ░████████ ░░███████     ░░██    ░████████     ░██    ░░███████  ░░███████
    ░░   ░░░░░░░░   ░░░░░░░       ░░     ░░░░░░░░      ░░      ░░░░░░░    ░░░░░░░
     */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### Add different banners

Since `0.6.0`, it supports incoming function callback to set the content of Banner. When using `ContentCallback` type, this plugin will judge what content should be added according to the internal logic of the function.

1. When a valid string is returned, it will become the banner content
2. Returning a [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value will skip processing(e.g. `''`, `null`, `undefined`)

e.g.

```ts
// vite.config.ts
import banner from 'vite-plugin-banner'
// Other dependencies...

export default defineConfig({
  plugins: [
    banner((fileName: string) => {
      // Or use switch statement
      return fileName.endsWith('.js')
        ? 'This message will inject into `js` files.'
        : 'This message will inject into other files.'
    }),
  ],
})
```

### Optional parameter format

Sometimes plugins can't get `outDir` successfully (for example, in VitePress, the plugin get through `viteConfig.build.outDir` is always a `.temp` temporary directory, not the final output directory), so you need to manually specify the output directory to inform the plugin.

Take VitePress as an example:

```ts
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import banner from 'vite-plugin-banner'
import pkg from '../../package.json'

const outDir = '../dist'

export default defineConfig({
  // Specify the output directory for packaging
  outDir,

  // Use Vite plugins
  vite: {
    plugins: [
      // Please remember to use the options in Object format here
      banner({
        outDir,
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
      }),
    ],
  },
  // ...
})
```

In addition to `outDir`, you can also use `debug`, `verify` and other options, see the above [Options](#options) description for details.

## License

MIT License © 2021 [chengpeiquan](https://github.com/chengpeiquan)
