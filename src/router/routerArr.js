import Layout from "@/layout/layout.vue";
//教师路由
const teachersArr = [
  {
    path: "/",
    component: () => import("@/layout/layout"),
    redirect: "/auth",
    children: [
      {
        name: "personal",
        path: "/personal",
        component: () => import(/* webpackChunkName: "personal" */"@/views/personal"),
        meta: {
          title: "个人详情",
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
    ],
  },
]

//校端路由
const principalArr = [
  {
    path: "/",
    component: () => import("@/layout/layout"),
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
        name: "projectdetails",
        path: "/projectdetails",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/project/components/projectdetails"),
        meta: {
          title: "公告详情",
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
]
//局端路由
const directorArr = [
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
        name: "projectdetails",
        path: "/projectdetails",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/project/components/projectdetails"),
        meta: {
          title: "公告详情",
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
]


export function getrouter(type) {
  if (type == 'teacher') {
    return teachersArr
  } else if (type == 'bureau_administrator') {
    return directorArr
  } else if (type == 'school_administrator') {
    return principalArr
  }
}