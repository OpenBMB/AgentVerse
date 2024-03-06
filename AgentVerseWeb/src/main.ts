import { createApp } from 'vue'
import './assets/css/base.css'
import App from './App.vue'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { router, setupRouter } from './router/index'
import { setupRouteGuard } from './router/guard'
import { setupHighlightDirective } from './directives/highlight'
// import { setupClickOutsideDirective } from './directives/click-outside'
import JsonViewer from 'vue-json-viewer'
import VueViewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

// Import JsonViewer as a Vue.js plugin

const start = async () => {
  const app = createApp(App)

  app.config.globalProperties.$ws_instance = null

  setupStore(app)
  setupRouter(app)
  setupRouteGuard(router)
  setupHighlightDirective(app)

  app.use(JsonViewer)
  app.use(VueViewer);
  
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // setupClickOutsideDirective(app)

  // 当路由准备好时再执行挂载( https://next.router.vuejs.org/api/#isready)
  await router.isReady()

  app.mount('#app', true)
}

start()
