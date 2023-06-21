<script setup>
  import {
    userLogin,
    apiPost
  } from "@/api/admin";
  import {
    useUserStore
  } from "@/store/user";
  import {
    setToken
  } from '../utils/auth.js'
  const userStore = useUserStore();
  const {
    userInfo
  } = storeToRefs(userStore);
  onMounted(() => {
    // login()
  });
  const tipsList = ref([{
      name: '关于2022学年第一学期教职工精细化编制系统维护工作的通知'
    },
    {
      name: '关于开展教职工编制精细化管理系统应用培训的通知'
    },
    {
      name: '关于数字社会未来教育重点场景试点的通知'
    },
    {
      name: '关于2020学年第一学期教职工精细化编制系统维护工作的通知'
    },
    {
      name: '关于2019学年第一学期教职工精细化编制系统维护工作的通知'
    },
    {
      name: '关于2018学年第一学期教职工精细化编制系统维护工作的通知'
    },
  ])
  const backlogList = ref([{
      name: "赵国章(208371)  申请  教师离退"
    },
    {
      name: "杨理伟  申请  入职"
    },
    {
      name: "胡金祥(206255)  申请  变更资料"
    },
    {
      name: "陈梦悦(206818)  申请  变更资料"
    },
    {
      name: "郭海林(206524)  申请  变更资料"
    },
    {
      name: "黄荣 (208344)  申请  变更资料"
    },
  ])
  const active = ref(0);
  const applicationOptions = ref([{
      name: "入职"
    },
    {
      name: "调动"
    },
    {
      name: "借调"
    },
    {
      name: "离退"
    },
    {
      name: "长病假"
    },
    {
      name: "产假"
    },
    {
      name: "添加课后服务人员"
    },
  ])
  const login = async () => {
    const data = {
      name: "李濠铭",
      role: "teacher",
      sex: "男",
      thirdUserId: "12"
    }
    const {
      code,
      msg,
      result
    } = ({} = await userLogin(data));
    if (code === 0) {
      console.log("get api test成功", result);
      setToken(result.token)
    } else {
      console.log("get api test失败", msg);
    }
  };
</script>

<template>
  <div class="homeBox flex">
    <div class="homeRight">
      <!-- 头部 -->
      <div class="exponential pos-rel">
        <div class=" pos-abs expBox">
          <span class="expTitle">智慧教育平台</span>
          <div class="flex al-center expOpt">
            <span>智能提醒</span>
            <span class="line"></span>
            <span>多人在线</span>
            <span class="line"></span>
            <span>简单易操作</span>
          </div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="flex ju-between m-t24">
        <div class="tipsBox">
          <div class="tipsTitle">
            通知公告
          </div>
          <div>
            <div v-for="item in tipsList" class="tipsItem flex al-center" :key="item.id">
              <div class="circle"></div>
              <el-text class="w-100px cur-p" truncated>{{item.name}}</el-text>
            </div>
          </div>
        </div>
        <div class="backlogBox">
          <div class="tipsTitle">
            待办事项
          </div>
          <div>
            <div v-for="item in backlogList" class="tipsItem flex al-center" :key="item.id">
              <div class="circle"></div>
              <el-text class="w-100px wChange cur-p" truncated>{{item.name}}</el-text>
              <div class="dispose cur-p">去处理</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="functionBox">
        <div class="funTitle">
          申请审批
        </div>
        <div class="flex m-t4 m-l1">
          <div v-for="(item,index) in applicationOptions" class="flex-d al-center itemSty cur-p" :key="item.id">
            <div class="icon"></div>
            <div class="itemName" :class="{'changeName':index==6}">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边内容 -->
    <IndexRight></IndexRight>
  </div>
</template>

<style lang="less" scoped>
  .homeBox {
    padding: 20px 0 0 24px;
  }

  .homeRight {
    width: 1150px;
  }

  .exponential {
    background-image: url('../assets/exponential.png');
    background-size: 100% 100%;
    width: 100%;
    height: 278px;
    font-family: MicrosoftYaHei;

    .expTitle {
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;

    }

    .expBox {
      top: 92px;
      left: 128px;
    }

    .expOpt {
      font-size: 16px;
      color: #ffffff;
      margin-top: 27px;
    }

    .line {
      width: 2px;
      height: 16px;
      background: #ffffff;
      margin: 0 6px;
    }
  }

  .m-t24 {
    margin-top: 24px;
  }

  .tipsBox {
    width: 582px;
    height: 373px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .tipsTitle {
    font-family: SourceHanSansCN-Bold;
    font-size: 20px;
    color: #333333;
    margin: 29px 0 0 29px;
    font-weight: bold;
  }

  .tipsItem {
    margin-top: 24px;
  }

  .w-100px {
    width: 500px;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
    color: #333333;
  }

  .wChange {
    width: 400px;
  }

  .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #c4e2ff;
    margin-left: 31px;
    margin-right: 11px;
  }

  .backlogBox {
    width: 552px;
    height: 373px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .dispose {
    font-size: 16px;
    color: #007aff;
    margin-left: 10px;
  }

  .functionBox {
    height: 160px;
    background-color: #ffffff;
    border-radius: 8px;
    margin: 24px 0 30px 0;
    padding: 30px;

    .funTitle {
      font-weight: bold;
      font-family: SourceHanSansCN-Bold;
      font-size: 20px;
      color: #333333;

    }

    .itemSty{
      margin-right: 66px;
    }

    .icon {
      width: 54px;
      height: 54px;
      background: #ffffff;
    }

    .itemName {
      margin-top: 22px;
      font-size: 16px;
      color: #333333;
    }
    .changeName{
      color: #999999;
    }
  }
</style>