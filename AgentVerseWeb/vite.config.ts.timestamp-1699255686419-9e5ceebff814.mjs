// vite.config.ts
import vue from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/unplugin-icons/dist/vite.mjs";
import { ElementPlusResolver } from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/unplugin-vue-components/dist/vite.mjs";
import banner from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/vite-plugin-banner/dist/index.mjs";
import { resolve } from "path";
import { createHtmlPlugin } from "file:///mnt/d/ocw/AgentVerse/XAgentWeb/node_modules/vite-plugin-html/dist/index.mjs";

// src/api/backend.ts
var BACKEND_URL_LOCALDEPLOY = "http://localhost:8090";
var backend_default = BACKEND_URL_LOCALDEPLOY;

// vite.config.ts
var __vite_injected_original_dirname = "/mnt/d/ocw/AgentVerse/XAgentWeb";
function pathResolve(dir) {
  const path = resolve(__vite_injected_original_dirname, dir);
  return path;
}
var isProduction = process.env.type === "prod";
var VITE_PUBLIC_PATH = isProduction ? "/" : "/openapi/";
process.env.VITE_MODE = isProduction ? "production" : "development";
var config = {
  base: "./",
  resolve: {
    alias: [
      { find: /\/@\//, replacement: pathResolve("src") + "/" },
      { find: /\/#\//, replacement: pathResolve("types") + "/" },
      { find: /@\//, replacement: pathResolve("src") + "/" }
    ]
  },
  plugins: [
    vue(),
    banner(`build package in ${(/* @__PURE__ */ new Date()).toLocaleDateString()} ${(/* @__PURE__ */ new Date()).toLocaleTimeString()} !`),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "@vueuse/core", "vue-router", "pinia"],
      dirs: ["./src/components/**/*", "./src/composables/**", "./src/store/**", "./types/**"],
      vueTemplate: true
    }),
    Components({
      dts: true,
      resolvers: [ElementPlusResolver({ importStyle: true }), IconsResolver({ prefix: "icon" })]
    }),
    Icons(),
    createHtmlPlugin({
      inject: { data: { title: "AgentVerse" } }
    })
  ],
  // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
  define: {
    BASE_URL: JSON.stringify(VITE_PUBLIC_PATH)
  },
  server: {
    // proxy: {
    //   '/api': BACKEND_URL_LOCALDEPLOY,
    // },
    proxy: {
      "/api": {
        target: backend_default,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  build: {
    cssTarget: "chrome80",
    minify: "terser",
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: process.env.type === "prod",
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 2e3
  },
  esbuild: {
    drop: process.env.type === "prod" ? ["console", "debugger"] : []
  }
};
var vite_config_default = defineConfig(config);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2FwaS9iYWNrZW5kLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL21udC9kL29jdy9YQWdlbnQvWEFnZW50V2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2Qvb2N3L1hBZ2VudC9YQWdlbnRXZWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9kL29jdy9YQWdlbnQvWEFnZW50V2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIFVzZXJDb25maWdFeHBvcnQgfSBmcm9tICd2aXRlJ1xuXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IGJhbm5lciBmcm9tICd2aXRlLXBsdWdpbi1iYW5uZXInXG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXG5pbXBvcnQgQkFDS0VORF9VUkxfTE9DQUxERVBMT1kgZnJvbSAnLi9zcmMvYXBpL2JhY2tlbmQnXG5cbmZ1bmN0aW9uIHBhdGhSZXNvbHZlKGRpcjogc3RyaW5nKSB7XG4gIC8vIGNvbnN0IHBhdGggPSByZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuJywgZGlyKVxuICBjb25zdCBwYXRoID0gcmVzb2x2ZShfX2Rpcm5hbWUsIGRpcilcbiAgcmV0dXJuIHBhdGhcbn1cblxuY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYudHlwZSA9PT0gJ3Byb2QnXG5cbmNvbnN0IFZJVEVfUFVCTElDX1BBVEggPSBpc1Byb2R1Y3Rpb24gPyAnLycgOiAnL29wZW5hcGkvJ1xuXG5wcm9jZXNzLmVudi5WSVRFX01PREUgPSBpc1Byb2R1Y3Rpb24gPyAncHJvZHVjdGlvbicgOiAnZGV2ZWxvcG1lbnQnXG5cbmNvbnN0IGNvbmZpZzogVXNlckNvbmZpZ0V4cG9ydCA9IHtcbiAgYmFzZTogJy4vJyxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICB7IGZpbmQ6IC9cXC9AXFwvLywgcmVwbGFjZW1lbnQ6IHBhdGhSZXNvbHZlKCdzcmMnKSArICcvJyB9LFxuICAgICAgeyBmaW5kOiAvXFwvI1xcLy8sIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgndHlwZXMnKSArICcvJyB9LFxuICAgICAgeyBmaW5kOiAvQFxcLy8sIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgnc3JjJykgKyAnLycgfSxcbiAgICBdLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgYmFubmVyKGBidWlsZCBwYWNrYWdlIGluICR7bmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKX0gJHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfSAhYCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgaW1wb3J0czogWyd2dWUnLCAnQHZ1ZXVzZS9jb3JlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcbiAgICAgIGRpcnM6IFsnLi9zcmMvY29tcG9uZW50cy8qKi8qJywgJy4vc3JjL2NvbXBvc2FibGVzLyoqJywgJy4vc3JjL3N0b3JlLyoqJywgJy4vdHlwZXMvKionXSxcbiAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgZHRzOiB0cnVlLFxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiB0cnVlIH0pLCBJY29uc1Jlc29sdmVyKHsgcHJlZml4OiAnaWNvbicgfSldLFxuICAgIH0pLFxuICAgIEljb25zKCksXG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgICBpbmplY3Q6IHsgZGF0YTogeyB0aXRsZTogJ1gtQWdlbnQnIH0gfSxcbiAgICB9KSxcbiAgXSxcbiAgLy8gXHU1QjlBXHU0RTQ5XHU1MTY4XHU1QzQwXHU1RTM4XHU5MUNGXHU2NkZGXHU2MzYyXHU2NUI5XHU1RjBGXHUzMDAyXHU1MTc2XHU0RTJEXHU2QkNGXHU5ODc5XHU1NzI4XHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTBCXHU0RjFBXHU4OEFCXHU1QjlBXHU0RTQ5XHU1NzI4XHU1MTY4XHU1QzQwXHVGRjBDXHU4MDBDXHU1NzI4XHU2Nzg0XHU1RUZBXHU2NUY2XHU4OEFCXHU5NzU5XHU2MDAxXHU2NkZGXHU2MzYyXHUzMDAyXG4gIGRlZmluZToge1xuICAgIEJBU0VfVVJMOiBKU09OLnN0cmluZ2lmeShWSVRFX1BVQkxJQ19QQVRIKSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgLy8gcHJveHk6IHtcbiAgICAvLyAgICcvYXBpJzogQkFDS0VORF9VUkxfTE9DQUxERVBMT1ksXG4gICAgLy8gfSxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogQkFDS0VORF9VUkxfTE9DQUxERVBMT1ksXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIGJ1aWxkOiB7XG4gICAgY3NzVGFyZ2V0OiAnY2hyb21lODAnLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAga2VlcF9pbmZpbml0eTogdHJ1ZSxcbiAgICAgICAgZHJvcF9jb25zb2xlOiBwcm9jZXNzLmVudi50eXBlID09PSAncHJvZCcsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxuICB9LFxuICBlc2J1aWxkOiB7XG4gICAgZHJvcDogcHJvY2Vzcy5lbnYudHlwZSA9PT0gJ3Byb2QnID8gWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10gOiBbXSxcbiAgfSxcbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhjb25maWcpXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9tbnQvZC9vY3cvWEFnZW50L1hBZ2VudFdlYi9zcmMvYXBpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2Qvb2N3L1hBZ2VudC9YQWdlbnRXZWIvc3JjL2FwaS9iYWNrZW5kLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvZC9vY3cvWEFnZW50L1hBZ2VudFdlYi9zcmMvYXBpL2JhY2tlbmQudHNcIjtjb25zdCBCQUNLRU5EX1VSTF9MT0NBTERFUExPWSA9ICdodHRwOi8vbG9jYWxob3N0OjgwOTAnO1xuXG5leHBvcnQgZGVmYXVsdCBCQUNLRU5EX1VSTF9MT0NBTERFUExPWSBhcyBzdHJpbmc7XG4iXSwKICAibWFw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
