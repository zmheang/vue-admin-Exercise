import axios from "axios";
import {
    contentType,
    invalidCode,
    messageDuration,
    noPermissionCode,
    requestTimeout,
    successCode,
    tokenName,
    debounce,
} from "@/config/settings";
import { Loading, Message } from "element-ui";
import store from "@/store";
import qs from "qs";
import router from "@/router";
import _ from "lodash";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: requestTimeout,
    headers: {
        "Content-Type": contentType,
    },
});

let loadingInstance;
// 发送请求前做的处理：
service.interceptors.request.use(
    (config) => {
        if (store.getters["user/accessToken"]) {
            config.headers[tokenName] = store.getters["user/accessToken"];
        }
        if (config.data) {
            config.data = _.pickBy(config.data, _.identity);
        }
        if (process.env.NODE_ENV !== "test") {
            if (contentType === "application/x-www-form-urlencoded;charset=UTF-8") {
                if (config.data && !config.data.param) {
                    config.data = qs.stringify(config.data);
                }
            }
        }
        const needLoading = () => {
            let status = false;
            debounce.forEach((item) => {
                if (_.includes(config.url, item)) {
                    status = true;
                }
            });
            return status;
        };
        if (needLoading()) {
            loadingInstance = Loading.service();
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const errorMsg = (message) => {
    return Message({
        message: message,
        type: "error",
        duration: messageDuration,
    });
};

// 对响应数据的处理
service.interceptors.response.use(
    (response) => {
        if (loadingInstance) {
            loadingInstance.close();
        }
        // eslint-disable-next-line no-unused-vars
        const { status, data, config } = response;
        const { code, msg } = data;
        if (code !== successCode && code !== 0) {
            switch (code) {
                case invalidCode:
                    errorMsg(msg || `后端接口${code}异常`);
                    store.dispatch("user/resetAccessToken");
                    break;
                case noPermissionCode:
                    router.push({
                        path: "/401",
                    });
                    break;
                default:
                    errorMsg(msg || `后端接口${code}异常`);
                    break;
            }
            return Promise.reject(
                "vue-admin-beautiful请求异常拦截:" +
                JSON.stringify({ url: config.url, code, msg }) || "Error"
            );
        } else {
            return data;
        }
    },
    (error) => {
        if (loadingInstance) {
            loadingInstance.close();
        }
        /*网络连接过程异常处理*/
        let { message } = error;
        switch (message) {
            case "Network Error":
                message = "后端接口连接异常";
                break;
            case "timeout":
                message = "后端接口请求超时";
                break;
            case "Request failed with status code":
                message = "后端接口" + message.substr(message.length - 3) + "异常";
                break;
        }
        errorMsg(message || "后端接口未知异常");
        return Promise.reject(error);
    }
);
export default service;
