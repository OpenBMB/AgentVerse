import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/login.vue'
import Layout from '/@/layouts/default.vue'

const moduleRoute: any[] = []
const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

Object.keys(modules).forEach((key) => {
  const mod = (modules as Recordable)[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  moduleRoute.push(...modList)
})

const PAGE_NOT_FOUND = 'page_not_found'
const PAGE_NOT_FOUND_ROUTE = {
  name: PAGE_NOT_FOUND,
  path: '/:path(.*)*',
  meta: { requireAuth: false },
  // component: Layout,
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND,
      component: () => import('../views/exception/404/index.vue'),
      meta: {},
    },
  ],
}

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/playground',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requireAuth: false },
  },
  {
    name: 'Playground',
    path: '/playground',
    component: Layout,
    meta: { title: 'Demo Playground ｜ AgentVerse' },
    children: [
      {
        path: '/playground',
        name: 'Playground',
        component: () => import('/@/views/playground/layout.vue'),
        children: [
          {
            path: '/playground',
            name: 'Playground',
            component: () => import('../views/playground/index.vue')
          },
          { 
            path: '/playground/chat',
            name: 'Talk',
            component: () => import('../views/playground/chat.vue')
          },

          { 
            name: 'NewTalk',
            path: '/playground/chat/:mode/:id',
            component: () => import('../views/playground/chat.vue')
          },

          // { 
          //   name: 'SharedTalks',
          //   path: '/share',
          //   component: () => import('../views/playground/share.vue')
          // },
        ],
      },
    ],
  },
  {
    name: 'Mobile',
    path: '/mobile',
    component: () => import('/@/views/exception/mobile.vue'),
    meta: {
      title: 'AgentVerse',
      requireAuth: false,
    },
  },
  ...moduleRoute,
  PAGE_NOT_FOUND_ROUTE,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export { router }
