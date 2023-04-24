import store from "../state/store"
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
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? {
          name: 'home'
        } : {
          ...routeFrom
        })
      },
    },
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