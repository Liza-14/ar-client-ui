import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./components/HomePage";
import ArScene from "./components/ArScene"

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/ar/:id',
        name: 'ar',
        props: true,
        component: ArScene,
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})