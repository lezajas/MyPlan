import UserLayout from 'layouts/UserLayout.vue'
import AdminLayout from 'src/layouts/AdminLayout.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {path: '/login', component: () => import('pages/loginPage.vue')},
      {path: '/register', component: () => import('pages/registerPage.vue')},
      {path: '/onama', component: () => import('pages/onamaPage.vue')},
    ],
  },

{
    path: '/UserLayout',
    component: UserLayout,
    children: [
      {path: '/userPage', component: () => import('pages/userPage.vue')},
    ],
},

{
  path: '/AdminLayout',
  component: AdminLayout,
  children: [
    {path: '/adminPage', component: () => import('pages/adminPage.vue')},
    {path: '/allUsers', component: () => import('pages/allUsers.vue')},
  ],
},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]


export default routes
