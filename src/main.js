import { createApp } from "vue";
import App from "./App.vue";
// unocss
// import "uno.css";
// base css
import "./styles/main.css";
// vant css

// other
import { router } from "./router";
import pinia from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
zhCn.el.pagination = {
    goto: '跳至第',
    pagesize: '条/页',
    total: `共 {total} 条`,
    pageClassifier: '页',
  };
  
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(ElementPlus, {
    locale: zhCn,
  });
app.mount("#app");