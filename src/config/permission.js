/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from "../router";
import store from "../store";
import VabProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/pageTitle";
import {
  authentication,
  // 是否开启登录拦截
  loginInterception,
  // 导航白名单
  routesWhiteList,
  // 是否显示顶部进度条
  progressBar,
} from "@/config/settings";

VabProgress.configure({
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});
// 关于导航：分为全局和组件内---详情见https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.beforeResolve(async (to, from, next) => {
  // console.log('-----------------------------------------------------------------------------------')
  // console.log(store)
  // console.log(getPageTitle)
  // console.log(authentication)
  // console.log(loginInterception)
  // console.log(routesWhiteList)
  // console.log('-----------------------------------------------------------------------------------')
  // 进度条显示
  if (progressBar) VabProgress.start();
  // 从store中获取(cookie,localStorge,sessionStorge)中的accessToken
  let hasToken = store.getters["user/accessToken"];
  console.log(hasToken)
  if (!loginInterception) hasToken = true;
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      if (progressBar) VabProgress.done();
    } else {
      const hasPermissions =
        store.getters["user/permissions"] &&
        store.getters["user/permissions"].length > 0;
      if (hasPermissions) {
        next();
      } else {
        try {
          const permissions = await store.dispatch("user/getInfo");
          let accessRoutes = [];
          if (authentication === "intelligence") {
            accessRoutes = await store.dispatch(
              "routes/setRoutes",
              permissions
            );
          } else if (authentication === "all") {
            accessRoutes = await store.dispatch("routes/setAllRoutes");
          }
          router.addRoutes(accessRoutes);
          /*console.log(to);
          let obj1 = { ...to };
          let obj2 = { replace: true };
          console.log(Object.assign(obj1, obj2));
          console.log({ ...to, replace: true });*/
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("user/resetAccessToken");
          next(`/login?redirect=${to.path}`);
          if (progressBar) VabProgress.done();
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      if (progressBar) VabProgress.done();
    }
  }
  document.title = getPageTitle(to.meta.title);
});
router.afterEach(() => {
  if (progressBar) VabProgress.done();
});
