# thunder-board
thunder-board是雷电数据接口（Thunder API）的简易演示工具。

## 主要页面

  1. Home演示页面：
    分为两栏演示
      - 左侧：示例网页（由Thunder API提供）
      - 右侧：数据滚动页面（接口由Thunder API提供）
  2. Login登录页面：
      未登录状态下从Home页面自动跳转到登录页面，默认用户名及密码
      ```
      username: test
      passwd: 12345
      ```
  3. 404

## TODO

- [x] 基础页面
- [x] 登录验证
- [x] 登录信息合规校验
- [x] 路由跳转中的身份检测
- [x] 基于axios的HTTP请求
- [x] 链接示例网页
- [x] 链接Thunder API
  - [x] responseType: BLOB
  - [x] 跨域
  - [x] 完善这部分的文档
  - [x] GB2312 to UTF-8
  - [x] 定时获取的逻辑
- [ ] 用户登录由服务器端验证
- [ ] 页面美化
- [ ] webpack打包混淆



## 链接Thunder API相关参考

### XMLHttpRequest
1. [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
2. [二进制数据接收](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)
3. [blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

### 跨域
1. [MDN关于跨域的解释](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
2. [vue-cli跨域](https://cli.vuejs.org/zh/config/#devserver-proxy)
3. [http-proxy-middleware中间件](https://github.com/chimurai/http-proxy-middleware#options)

### 数据获取逻辑
每2分钟获取一次数据（JSON），覆盖（todo:部分覆盖）thunderData对象以供展示。展示过程中应令thunderData中数据*逐条滚动*，须保证新数据到达前一直在滚动。
```JavaScript
// 数据格式：
const thunderData = [
  {
    LATITUDE: '',
    LONGITUDE: '',
    INTENS: '',
    PROVINCE: '',
    COUNTRY: '',
    DISTRICT: ''
  },
  ...
  {
    ...
  }
]
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
