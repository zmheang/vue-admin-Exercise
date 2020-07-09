/**
 * @copyright zmheang
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */

import { asyncRoutes, constantRoutes } from "@/router";
import { getRouterList } from "@/api/router";
import { filterAllRoutes, filterAsyncRoutes } from "@/utils/handleRoutes";