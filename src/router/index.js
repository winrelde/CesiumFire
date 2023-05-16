import { createRouter,createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'Login',
        component: ()=>import('@/view/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: ()=>import('@/view/Home.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/')
    next()
  })

export default router
