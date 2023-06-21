import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/layout.vue";
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        name: "index",
        path: "/index",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/index"),
        meta: {
          title: "主页",
        },
      },
      {
        name: "roster",
        path: "/roster",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/roster/roster"),
        meta: {
          title: "花名册",
        },
      },
      {
        name: "finishedList",
        path: "/finishedList",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/finished/finishedList"),
        meta: {
          title: "已办列表", 
        },
      },
      {
        name: "finisDetails",
        path: "/finisDetails",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/finished/finisDetails"),
        meta: {
          title: "已办详情", 
        },
      },
      {
        name: "applicationFlow",
        path: "/applicationFlow",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/applicationFlow/applicationFlow"),
        meta: {
          title: "申请流程", 
        },
      },
      {
        name: "backlogList",
        path: "/backlogList",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/backlogList/backlogList"),
        meta: {
          title: "待办列表", 
        },
      },
      {
        name: "backlogDetail",
        path: "/backlogDetail",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/backlogList/backlogDetail"),
        meta: {
          title: "待办详情", 
        },
      },
      {
        name: "mySubmission",
        path: "/mySubmission",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/mySubmission/mySubmission"),
        meta: {
          title: "我的报送", 
        },
      },
      {
        name: "project",
        path: "/project",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/project/project"),
        meta: {
          title: "公告栏配置", 
        },
      },
    ],
  },
  {
    name: "user",
    path: "/user",
    component: () => import("@/views/user"),
    meta: {
      title: "会员中心",
    },
  }, 
  {
    name: "personal",
    path: "/personal",
    component: () => import("@/views/personal"),
    meta: {
      title: "个人详情",
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
