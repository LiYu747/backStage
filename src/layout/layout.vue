<template>
  <div>
    <div class="layoutTitle flex al-center ju-between">
      <div class="header-logo-box">
        <img src="../assets/icon.svg">
        <label style="margin-left: 8px;">诸暨教职工精细化管理系统</label>
      </div>
      <div class=" ">
        <el-dropdown class="el-dropdown-link" @command="handleCommand">
          <span class="el-dropdown-link flex al-center cur-p">
            <img src="../assets/user.png" class="user" alt="">
            <span class="m-r1 name m-l1">{{ res.name }}</span>
            <el-icon>
              <ArrowDownBold />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <div v-for="item in userOpt" class="itemIcon" :key="item.id">
                <el-dropdown-item :command=item.command><img class="m-r1" :src="item.icon" alt="">{{ item.name
                }}</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
    <div class="flex Box">
      <!-- 左边菜单 -->
      <div class="tacBox">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu :default-active="route.path" class="el-menu-vertical-demo" @open="handleOpen" @select="addSel"
              @close="handleClose">
              <div v-for="(item, index) in tabList" :key="item.id">
                <div v-if="!item.children">
                  <el-menu-item :index="item.path">
                    <span>{{ item.title }}</span>
                  </el-menu-item>
                </div>
                <div v-else>
                  <el-sub-menu :index="index + ''">
                    <template #title>
                      <span>{{ item.title }}</span>
                    </template>
                    <div v-for="(itemC, indexC) in item.children" :key="itemC.id">
                      <el-menu-item :index="itemC.path">{{ itemC.title }}</el-menu-item>
                    </div>
                  </el-sub-menu>
                </div>
              </div>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!-- 右边内容 -->
      <div class="rightBox ">
        <div class="Breadcrumb ">
          <div style="height: 8px;"></div>
          <div class="flex al-center">
            <div>
            <el-button class="leftDown m-l1">
              <el-icon>
                <ArrowLeft />
              </el-icon>
            </el-button>
          </div>
          <div class="tagBox">
            <el-tag v-for="tag in collectList" color="#fff" :key="tag.name" :class="{ 'change': route.path == tag.path }"
              class="mx-1 m-l1 cur-p tagStyle" @click="goPath(tag)" @close="close(tag)" closable :type="tag.type">
              {{ tag.title }}
            </el-tag>
          </div>
          <div>
            <el-button class="leftDown m-r1">
              <el-icon>
                <ArrowRight />
              </el-icon>
            </el-button>
          </div>
          </div>
        </div>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component v-if="$route.meta.keepAlive" :is="Component" :key="$route.name"></component>
          </keep-alive>
          <component v-if="!$route.meta.keepAlive" :is="Component" :key="$route.name"></component>
        </router-view>
        <!-- <router-view ></router-view> -->
      </div>
    </div>

  </div>
</template>
<script setup>
import {
  ArrowLeft,
  ArrowDownBold,
  ArrowRight
} from '@element-plus/icons-vue'
import {
  useRouter,
  useRoute
} from 'vue-router'
import {
  useCollectStore
} from '../store/collect.js'
import userInfo from '../assets/userInfo.png'
import changePassword from '../assets/changePassword.png'
import exit from '../assets/exit.png'
import { removeToken, getToken, getAuthUrl,getLogoutUrl } from '../utils/auth'
import { ElMessage } from 'element-plus'
import { outLogin } from '@/api/Logoutoflogin'
import { logout } from '@/api/dsl'
const collect = useCollectStore();
const {
  collectList
} = storeToRefs(collect);

onMounted(() => {
  queryUserInfo();

  theMenu();
})

//动态菜单
const theMenu = () => {
    tabList.value = tabList_all.value
}


const router = useRouter()
const route = useRoute();
const tabList_all = ref([{
  title: "首页",
  path: "/index",
},
{
  title: "教职工管理",
  path: "/about",
  children: [{
    title: '教职工花名册',
    path: "/roster"
  }]
},
{
  title: "申请审批",
  path: "/blog",
  children: [{
    title: '申请流程',
    path: "/applicationFlow"
  },
  {
    title: '待办列表',
    path: "/backlogList"
  },
  {
    title: '已办列表',
    path: "/finishedList"
  },
  {
    title: '我的报送',
    path: "/mySubmission"
  }
  ]
},
{
  title: "公告栏配置",
  path: "/project",
},

])
const tabList_teachers = ref([{
  title: "首页",
  path: "/personal",
}, {
  title: "我的报送",
  path: "/mySubmission",
},])


const tabList = ref();

const userOpt = ref([
//   {
//   name: '用户信息',
//   icon: userInfo,
//   command: "a"
// },
// {
//   name: '修改密码',
//   icon: changePassword,
//   command: "b"
// },
{
  name: '退出登录',
  icon: exit,
  command: "c",

}
])
const handleOpen = (e, keyPath) => {
  // console.log(e, keyPath);
};
const handleClose = (e) => {
  console.log(e);
}
//跳转
const goPath = (val) => {
  router.push(val.path)
}
//删除
const close = (val) => {
  collect.removeCollect(val.path)
}
const addSel = (e) => {
  let path
  tabList.value.map(item => {
    if (item.children) {
      item.children.map(child => {
        if (child.path == e) {
          path = child
        }
      })
    } else {
      if (item.path == e) {
        path = item
      }
    }
  })
  collect.addCollect(path)
  router.replace(e)
}


let req = ref()
const res = ref('')
const queryUserInfo = () => {
  req = JSON.parse(localStorage.getItem('userInfo'))
  const { staffModel } = req
  res.value = staffModel
}

const handleCommand = async (command) => {
  // ElMessage('退出登录')
  const toke = getToken().access_token
  if (command == 'c') {
    const params = { access_token: toke }
    const { code, msg, result } = await outLogin(params)
    if (code == 0 && result) {
      console.log(msg, result, '退出参数');
      removeToken()
      // location.reload()
      let logoutUrl = getLogoutUrl();
      console.log('logoutUrl：' + logoutUrl)
      // await logout({ redirect_uri: logoutUrl })
      location.href = logoutUrl;
      // window.location.assign(window.location.origin + window.location.pathname + "#/auth");
    }
  } else {
    console.log(msg);
  }
}


</script>
<style lang="less" scoped>
.layoutTitle {
  /* width: 100%; */
  padding: 0 40px;
  height: 59px;
  border-bottom: 1px solid #ebebeb;
  font-size: 20px;
  color: #000000;
}

.header-logo-box {
  display: flex;
  align-items: center;
}

.user {
  width: 14px;
  height: 16px;
}

.itemIcon {
  margin: 10px 0;
  color: #333;
}

.itemIcon:nth-child(1) {
  img {
    width: 17px;
    height: 17px;
  }
}

.itemIcon:nth-child(2) {
  img {
    width: 15px;
    height: 13px;
  }
}

.itemIcon:nth-child(3) {
  img {
    width: 14px;
    height: 16px;
  }
}

.Box {
  height: calc(100vh - 60px);
  overflow: auto;
}

.tacBox {
  /*    margin-left: 20px;*/
  width: 294px;
  border-right: 1px solid #dcdfe6;
  height: calc(100vh - 60px);
}

:deep(.el-col-12) {
  max-width: none;
  flex: none;
  width: 100%;
}

:deep(.el-menu) {
  border-right: none;
}

.rightBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #F7F7F7;

  .Breadcrumb {
    width: 100%;
    /*      height: 50px;*/
    // margin-top: 8px;
    // padding-top: 8px;
    // margin-bottom: 8px;
  }

  .leftDown {
    width: 30px;
    height: 30px;
    background: #fff;
    border-color: #fff;
  }

  .tagBox {
    flex: 1;
    overflow: auto;
  }
}

.name {
  font-size: 16px;
  color: #333333;
}

.el-dropdown-link:focus {
  outline: none;
}

:deep(.el-dropdown-menu__item:focus) {
  background: none !important;
  color: #333 !important;
}

.tagStyle {
  height: 30px;
  color: #333333;
  border: none;
  font-size: 14px;
  padding: 0 12px;
}

:deep(.el-tag__close) {
  color: #000000 !important;
  background: #fff !important;
}

.change {
  color: #409eff;

  :deep(.el-tag__close) {
    color: #409eff !important;
    background: #fff !important;
  }
}
</style>