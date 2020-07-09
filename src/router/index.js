import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
// eslint-disable-next-line no-unused-vars
import EmptyLayout from "@/layouts/EmptyLayout";
import {routerMode} from "@/config/settings";

Vue.use(VueRouter);

export const constantRoutes = [
    {
        path: "/login",
        component: () => import("@/views/login/index"),
        hidden: true,
    }
];

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
    {
        path: "/",
        component: Layout,
        redirect: "index",
        children: [
            {
                path: "index",
                name: "Index",
                component: () => import("@/views/index/index"),
                meta: {
                    title: "首页",
                    icon: "home",
                    affix: true,
                    badge: "New",
                },
            },
        ],
    },
];

/* https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
* 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
* vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动
* scrollBehavior 方法接收 to 和 from 路由对象。
* 第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
*/
const router = new VueRouter({
    mode: routerMode,
    // eslint-disable-next-line no-unused-vars
    scrollBehavior: (to, from, savedPosition) => ({
        y: 0,
    }),
    routes: constantRoutes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

export function resetRouter() {
    router.matcher = new VueRouter({
        mode: routerMode,
        scrollBehavior: () => ({
            y: 0,
        }),
        routes: constantRoutes,
    }).matcher;
}

export default router;
