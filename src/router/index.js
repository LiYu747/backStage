import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/layout.vue";
import { setToken, getToken, formatToken } from "@/utils/auth";
import { getrouter } from './routerArr'
const routes = [
  {
    path: "/",
    // component: Layout,
    redirect: "/auth",
  },
  {
    path: "/",
    component: Layout,
    redirect: "/auth",
    children: [
      {
        name: "index",
        path: "/index",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/index"),
        meta: {
          title: "诸暨教师精细化管理系统",
        },
      },
      {
        name: "roster",
        path: "/roster",
        component: () =>
          import(/* webpackChunkName: "roster" */ "@/views/roster/roster"),
        meta: {
          title: "花名册",
        },
      },
      {
        name: "finishedList",
        path: "/finishedList",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/finished/finishedList"),
        meta: {
          title: "已办列表",
          keepAlive: true
        },
      },
      {
        name: "finisDetails",
        path: "/finisDetails",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/finished/finisDetails"),
        meta: {
          title: "已办详情",
        },
      },
      {
        name: "applicationFlow",
        path: "/applicationFlow",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/applicationFlow/applicationFlow"),
        meta: {
          title: "申请流程",
        },
      },
      {
        name: "entry",
        path: "/entry",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/applicationFlow/entry"),
        meta: {
          title: "申请入职",
        },
      },
      {
        name: "mobilize",
        path: "/mobilize",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/applicationFlow/mobilize"),
        meta: {
          title: "申请调动",
        },
      },
      {
        name: "second",
        path: "/second",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/applicationFlow/second"),
        meta: {
          title: "申请借调",
        },
      },
      {
        name: "depart",
        path: "/depart",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/applicationFlow/depart"),
        meta: {
          title: "申请离退",
        },
      },
      {
        name: "sick_leave",
        path: "/sick_leave",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/applicationFlow/sick_leave"),
        meta: {
          title: "申请长病假",
        },
      },
      {
        name: "maternity_leave",
        path: "/maternity_leave",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/applicationFlow/maternity_leave"),
        meta: {
          title: "申请产假",
        },
      },
      {
        name: "Add_waitstaff",
        path: "/Add_waitstaff",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/applicationFlow/Add_waitstaff"),
        meta: {
          title: "添加课后服务人员",
        },
      },
      {
        name: "backlogList",
        path: "/backlogList",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/backlogList/backlogList"),
        meta: {
          title: "待办列表",
          keepAlive: true
        },
      },
      {
        name: "backlogDetail",
        path: "/backlogDetail",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/backlogList/backlogDetail"),
        meta: {
          title: "待办详情",
        },
      },
      {
        name: "mySubmission",
        path: "/mySubmission",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/mySubmission/mySubmission"),
        meta: {
          title: "我的报送",
          keepAlive: true
        },
      },
      {
        name: "submissionDetail",
        path: "/submissionDetail",
        component: () =>
          import(/* webpackChunkName: "backlog" */ "@/views/mySubmission/submissionDetail"),
        meta: {
          title: "报送详情",
        },
      },
      {
        name: "project",
        path: "/project",
        component: () =>
          import(/* webpackChunkName: "project" */ "@/views/project/project"),
        meta: {
          title: "公告栏配置",
        },
      },
      {
        name: "projectedit",
        path: "/projectedit",
        component: () =>
          import(/* webpackChunkName: "project" */ "@/views/project/components/projectedit"),
        meta: {
          title: "公告栏编辑",
        },
      },
      {
        name:"projectdetails",
        path:"/projectdetails",
        component:() =>
          import(/* webpackChunkName: "index" */ "@/views/project/components/projectdetails"),
        meta:{
          title:"公告详情",
        }
      },
      {
        name: "personal",
        path: "/personal",
        component: () => import(/* webpackChunkName: "personal" */"@/views/personal"),
        meta: {
          title: "个人详情",
        },
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */"@/views/login"),
    meta: {
      title: "登录",
    },
  },
  {
    name: "auth",
    path: "/auth",
    component: () => import(/* webpackChunkName: "auth" */"@/views/auth"),
    meta: {
      title: "授权登录",
    },
  },
  {
    name: "personalTeacher",
    path: "/personalTeacher",
    component: () => import(/* webpackChunkName: "personal" */"@/views/personal"),
    meta: {
      title: "个人详情",
    },
  },
  {
    name: "mySubmissionTeacher",
    path: "/mySubmissionTeacher",
    component: () =>
      import(/* webpackChunkName: "backlog" */ "@/views/mySubmission/mySubmission"),
    meta: {
      title: "我的报送",
      keepAlive: true
    },
  },
  {
    name: "submissionDetailTeacher",
    path: "/submissionDetailTeacher",
    component: () =>
      import(/* webpackChunkName: "backlog" */ "@/views/mySubmission/submissionDetail"),
    meta: {
      title: "报送详情",
    },
  },
  {
    name: "announcement",
    path: "/announcement",
    component: () =>
      import(/* webpackChunkName: "backlog" */ "@/views/announcement"),
    meta: {
      title: "公告列表",
    },
  }, 
  {
    name:"projectdetailsTeacher",
    path:"/projectdetailsTeacher",
    component:() =>
      import(/* webpackChunkName: "index" */ "@/views/project/components/projectdetails"),
    meta:{
      title:"公告详情",
    }
  },
  {
    path: '/pathMatch',
    name: 'Not_Found',
    component: () => import('../views/Not_Found.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'Not_Found',
    component: () => import('../views/Not_Found.vue')
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

let AddRoute = false;
let list = ['/auth','/personalTeacher','/pathMatch','/announcement','/mySubmissionTeacher','/submissionDetailTeacher','/projectdetailsTeacher']
router.beforeEach(async (to, from, next) => {
  const title = to.meta && to.meta.title;
  to.meta.from = from.path
  if (title) {
    document.title = title;
  }
  let RoleType =  localStorage.getItem('RoleType')
  if(RoleType=='teacher'){
    if(list.includes(to.path)){
      next()
    }else{
      next('/pathMatch')
    }
  }else{
    next()
  }
 
 
  // if (to.path.includes("auth")) {
  //   next()
  // } else {
  //   if (getToken()) {
  //     const data = getrouter(localStorage.getItem('RoleType'))
  //     // if (!AddRoute) {
  //     //   data.forEach(s => {
  //     //     router.addRoute(s);
  //     //     console.log('s: ', s);
  //     //   });

  //     //   router.addRoute({
  //     //     path: '/:pathMatch(.*)',
  //     //     name: 'Not_Found',
  //     //     component: () => import('../views/Not_Found.vue')
  //     //   });
  //     //   // const routes = router.getRoutes();
  //     //   // console.log('routes: ', routes);
  //     //   AddRoute = true;
  //     //   next()
  //     // }

  //     /* 方法2 */
  //     // console.log(to.path, data[0].children);
  //     // const res = data[0].children.filter(s => s.path == to.path)
  //     // console.log('res: ', res);
  //     // if (!AddRoute) {
  //     //   if (res.length > 0) {
  //     //     next()
  //     //   } else {

  //     //   }
  //     // }
  //     // next()

  //   } else {
  //     alert('请先登录');
  //     // next('/login');
  //     window.location.assign(window.location.origin + window.location.pathname + "#/auth");
  //   }
  // }


});




export { router };
