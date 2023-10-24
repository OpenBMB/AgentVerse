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
  <a href="https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.zh-CN.md" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=56b7ff" />
  </a>
  <a href="https://github.com/chengpeiquan/vite-plugin-banner" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/vite-plugin-banner?style=social" />
  </a>
</p>
<br>
<br>

[English](https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.md) | 简体中文

- [功能](#功能)
- [安装](#安装)
- [选项](#选项)
- [用法](#用法)
  - [基础用法](#基础用法)
  - [高级用法](#高级用法)
  - [趣味用法](#趣味用法)
  - [添加不同的 Banner](#添加不同的-banner)
  - [可选参数格式](#可选参数格式)
- [License](#license)

## 功能

为每个 chunk 文件头部添加 banner 注释。

## 安装

从 npm (或者 yarn 或者 pnpm) 安装：

```bash
npm install --save-dev vite-plugin-banner
```

## 选项

| 插件选项类型        | 作用描述             | 使用例子                                |
| :------------------ | :------------------- | :-------------------------------------- |
| string              | 横幅注释的内容       | [基础用法](#基础用法)                   |
| ContentCallback     | 请参阅下方的类型声明 | [添加不同的 Banner](#添加不同的-banner) |
| BannerPluginOptions | 请参阅下方的类型声明 | [可选参数格式](#可选参数格式)           |

· Type Declarations:

````ts
/**
 * 来自 `vite.config.[ts|js]` 的一些选项
 * @since 0.2.0
 */
export interface BannerPluginOptions {
  /**
   * Banner 的注释内容
   * @since 从 ^0.6.0 开始支持 `ContentCallback` 类型
   */
  content: string | ContentCallback

  /**
   * Vite.js 配置的输出目录
   * @default 'dist'
   */
  outDir?: string

  /**
   * 是否将错误信息打印到控制台
   * @since 0.4.0
   * @default false
   */
  debug?: boolean

  /**
   * 默认会验证内容的合法性，设置为 `false` 则不验证
   * @see https://github.com/chengpeiquan/vite-plugin-banner/issues/13
   * @since 0.5.0
   * @default true
   */
  verify?: boolean
}

/**
 * 回调函数获取要注入的内容（或不注入）
 * @since 0.6.0
 *
 * @param fileName - 当前正在处理的文件名称
 * @returns
 *  1. 返回有效字符串时，返回值将成为 Banner 的内容
 *  2. 返回 Falsy 值将跳过处理（例如 `''`、`null`、`undefined` ）
 *
 * @example
 * ```ts
 *  content: (fileName: string) => {
 *    // 或者使用 `switch` 语句
 *    return fileName.endsWith('.js')
 *      ? 'This message will inject into `js` files.'
 *      : 'This message will inject into other files.'
 *  }
 * ```
 */
export type ContentCallback = (fileName: string) => string | null | undefined
````

## 用法

在大多数情况下，只需使用 `string` 格式作为插件选项。

### 基础用法

在 `vite.config.ts` 添加：

```ts
// vite.config.ts
import banner from 'vite-plugin-banner'
// 其他依赖...

export default defineConfig({
  plugins: [banner('This is the banner content.')],
})
```

当你在你的项目上运行 `npm run build` 打包的时候，在 `dist` 文件夹（或者你在 `vite.config.ts` 配置的其他 [build.outDir](https://vitejs.dev/config/#build-outdir) ），除了 `vendor` 文件外，所有的 `js` 和 `css` 文件都会添加一个 banner 注释在文件顶部。

例如，在生成的 `app.b3a7772e.js` 里:

```js
/* This is the banner content. */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### 高级用法

当然，最理想的 banner 注释是和你的项目信息相关联。

首先，你需要更新你的 `package.json` 文件，像这样，包含类似的字段内容：

```json
{
  "name": "chengpeiquan.com",
  "version": "0.1.0",
  "description": "My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.",
  "author": "chengpeiquan",
  "homepage": "https://chengpeiquan.com/"
}
```

然后，在你的 `vite.config.ts` 导入 `package.json`，像这样更新 banner 插件的内容：

```ts
// vite.config.ts
import pkg from './package.json'
// 其他依赖...

export default defineConfig({
  plugins: [
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
    ),
  ],
})
```

运行 `npm run build` 打包, 你可以看到生成出来的 banner 注释更详细：

例如，在生成的 `app.6936be52.js` 里:

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

### 趣味用法

如果你想制作一些个性化的 banner 注释，像什么表白啊、佛系啊、招聘信息啊什么的，可以通过一些在线生成器去制作有趣的内容。

比如在这些网站上可以直接生成:

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

执行 `npm run build` 打包, 还是在 `app.d9a287b8.js` ，现在变成了：

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

### 添加不同的 Banner

从 `0.6.0` 开始支持传入函数回调设置 Banner 的内容，当使用 `ContentCallback` 类型时，本插件会根据该函数的内部逻辑判断应该添加什么内容。

1. 返回有效字符串时，返回值将成为 Banner 的内容
2. 返回 [Falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy) 值将跳过处理（例如 `''`、`null`、`undefined` ）

以判断文件扩展名添加两个不同的 Banner 内容为例：

e.g.

```ts
// vite.config.ts
import banner from 'vite-plugin-banner'
// 其他依赖...

export default defineConfig({
  plugins: [
    banner((fileName: string) => {
      // 或者使用 `switch` 语句
      return fileName.endsWith('.js')
        ? 'This message will inject into `js` files.'
        : 'This message will inject into other files.'
    }),
  ],
})
```

### 可选参数格式

有时候插件无法成功获取到 `outDir` （例如在 VitePress 里，插件通过 `viteConfig.build.outDir` 拿到的永远是一个 `.temp` 的临时目录，不是最终的输出目录），所以需要手动指定输出目录来告知插件。

以 VitePress 举例：

```ts
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import banner from 'vite-plugin-banner'
import pkg from '../../package.json'

const outDir = '../dist'

export default defineConfig({
  // 指定打包的输出目录
  outDir,

  // 使用 Vite 插件
  vite: {
    plugins: [
      // 请记住在这里使用 Object 格式的选项
      banner({
        outDir,
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
      }),
    ],
  },
  // ...
})
```

除了 `outDir` ，还可以使用 `debug` 、 `verify` 等选项，详见上方的 [选项](#选项) 说明。

## License

MIT License © 2021 [chengpeiquan](https://github.com/chengpeiquan)
