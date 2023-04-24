// import Vue from 'vue'
// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// import VueMeta from 'vue-meta'
import store from "../state/store"

import routes from './routes'


// Vue.use()

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

router.beforeEach(async (to, from, next) => {

    const authRequired = to.matched.some((route) => route.meta.authRequired)
    const isLoggedIn = store.getters["loggedIn"]

    if (authRequired) {

        if (isLoggedIn)
            next()
        else
            next('/login')

    } else {
        if (isLoggedIn) {
            next('/')
        } else {
            next()
        }
    }
})


router.beforeResolve(async (routeTo, routeFrom, next) => {
    // Create a `beforeResolve` hook, which fires whenever
    // `beforeRouteEnter` and `beforeRouteUpdate` would. This
    // allows us to ensure data is fetched even when params change,
    // but the resolved route does not. We put it in `meta` to
    // indicate that it's a hook we created, rather than part of
    // Vue Router (yet?).
    try {
        // For each matched route...
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        // If the user chose to redirect...
                        if (args.length) {
                            // If redirecting to the same route we're coming from...
                            // Complete the redirect.
                            next(...args)
                            reject(new Error('Redirected'))
                        } else {
                            resolve()
                        }
                    })
                } else {
                    // Otherwise, continue resolving the route.
                    resolve()
                }
            })
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return
    }

    // If we reach this point, continue resolving the route.
    next()
})

// const router = new VueRouter({
//     routes,
//     // Use the HTML5 history API (i.e. normal-looking routes)
//     // instead of routes with hashes (e.g. example.com/#/about).
//     // This may require some server configuration in production:
//     // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
//     mode: 'history',
//     // scrollBehavior(to, from, savedPosition) {
//     //     if (savedPosition) {
//     //         return savedPosition
//     //     } else {
//     //         return {
//     //             x: 0,
//     //             y: 0
//     //         }
//     //     }
//     // },
// })

// 

export default router