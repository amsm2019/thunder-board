import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';


// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// axios
import axios from 'axios';
Vue.prototype.axios = axios;


Vue.config.productionTip = false;


//添加全局注册事件，用来监听滚动事件
// window.Vue.directive('loadmore', {
//   bind(el, binding) {
//     const selectWrap = el.querySelector('.el-tablebody-wrapper')
//     selectWrap.addEventListener('scroll', function() {
//       let sign = 100
//       const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
//       if (scrollDistance <= sign) {
//         binding.value()
//       }
//     })
//   }
// })



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
