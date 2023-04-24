export default [
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/pages/account/login.vue"),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/pages/account/register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'Forgot-password',
    component: () => import('../views/pages/account/forgot-password.vue'),
   
  },
  {
    path: '/logout',
    name: 'logout',
  },
  {
    path: '/',
    name: 'home',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/pages/dashboard/index.vue')
  }

]