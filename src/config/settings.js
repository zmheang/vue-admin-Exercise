module.exports = {
  // 配置文件
  publicPath: '',
  // 生产环境下构建文件的目录名
  outputDir: 'dist',
  // 放置生成的静态资源（js,css,img,fonts）的（相当于outputDir的）目录
  assetsDir: 'static',
  // 开发环境每次保存时是否输出为Eslint编译警告
  lintOnSave: true,
  // 进行编译的依赖
  transpileDependencies: ["vue-echarts","resize-detector"],
  // 标题（包括首次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: "vue-admin-beautiful-copy",
  // 简写
  abbreviation: "vabc",
  // 开发环境的端口号
  devPort: "9516",
  // 路由模式，可选值为 history 或 hash
  routerMode: "hash",
  //intelligence和all两种方式，前者后端权限只控制permissions不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
  authentication: "intelligence",
  //是否依据mock数据生成webstorm HTTP Request请求文件
  httpRequestFile: false,
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 5000,
  //操作正常code
  successCode: 200,
  //登录失效code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401,
  //需要加loading层的请求，防止重复提交
  debounce: ["doEdit"],
  //token名称
  tokenName: "accessToken",
  //是否开启登录RSA加密
  loginRSA: false,
  //token存储位置localStorage sessionStorage cookie
  //区别：存储在 localStorage 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 sessionStorage 的数据会被清除；cookie也是会话级别，信息保存在客户端
  storage: "localStorage",//token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: "vue-admin-beautiful-copy",


}