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
          <div>  <!-- 公告 -->
            <div v-for="item in tipsList" class="tipsItem flex al-center" :key="item.id">
              <div class="circle"></div>
              <el-text class="w-100px cur-p" truncated @click="details(item.id)">{{ item.headline }}</el-text>
            </div>
          </div>
        </div>
        <div class="backlogBox">
          <div class="tipsTitle">
            待办事项
          </div>
          <div>
            <div v-for="item in auditList" class="tipsItem flex al-center" :key="item.id">
              <div class="circle"></div>
              <el-text class="w-100px wChange cur-p" truncated> {{ item.teacherName }} <text>&nbsp; 申请&nbsp;</text> {{
                item.type }}</el-text>
              <div class="dispose cur-p" @click="DealWith(item)">去处理</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="functionBox">
        <div class="funTitle">
          申请审批
        </div>
        <div class="flex m-t4 m-l1 ">
          <div v-for="(item, index) in applicationOptions" @click="gotoFun(item)" class="flex-d al-center itemSty cur-p" :key="item.id">
            <div class="My-apply">
                  <div class="icon">
                    <img :src="item.Url" alt="">
                  </div>
                <div class="itemName" >{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <!-- 右边内容 -->
    <IndexRight :mynums="mynums"></IndexRight>
  </div>
</template>
<script setup>
import { useUserStore } from "@/store/user";
import { findAllByDel, findToDo } from '@/api/project';
import { backlogFindAll } from '@/api/apply.js';
import { judgeProcessText2 } from '@/views/backlogList/components/Examine'
import { useRouter } from 'vue-router';

const router = useRouter()

const userStore = useUserStore();
const {
  userInfo
} = storeToRefs(userStore);
onMounted(() => {
  projectAll()
  getAll()
  getmyAll()
});

let tipsList = ref([])
let auditList = ref([])
//获取启用公告
const projectAll = async () => {
  const params = {
    sort: 'startTime,desc',
    page: 0,
    size: 6
  }
  const { result, code, msg } = await findAllByDel(params)
    console.log(result);
  if (code == 0 && result) {
    tipsList.value = result
  } else {
    console.log(msg, '失败');
  }

}

//获取待办公告
const getAll = async () => {
  let el = {
    page: 0,
    size: 6,
    sort: 'createdAt,desc'
  }

  let res = await backlogFindAll(el)
  if (res.code != 0) {
    return
  }
  res.result.content.forEach(s => {
    s.type = judgeProcessText2(s.applyType)
    if (s.targetId) {
      s.teacherName = `${s.teacherName}(${s.targetId})`
    }
  });
  // console.log(res.result.content);
  auditList.value = res.result.content

}
//获取我的待办
const mynums = ref(null)
const getmyAll = async () => {
  const { result } = await findToDo()
  // console.log('res: ', result);
  mynums.value = result
}

const DealWith = (val) => {
  // console.log('id,type: ', id, type);
  router.push({
    path: "/backlogDetail", query: {
      id: val.id,
      type: val.applyType,
      targetName: val.targetName ? val.targetName : '',
      teacherId: val.teacherId ? val.teacherId : '',
      targetId: val.targetId ? val.targetId : ''
    }
  })
}


const details = (item) => {
    router.push({ path: '/projectdetails',query:{item:item}})
}

// 返回上一页
const gotoFun = (item) => {
        router.push(item.path)
    }

const applicationOptions = ref([{
  name: '入职',
  path: '/entry',
  Url:require('../assets/Cut-diagram/entry.png')
},
{
  name: '调动',
  path: '/mobilize',
  Url:require('../assets/Cut-diagram/mobilize.png')
},
{
  name: '借调',
  path: '/second',
  Url:require('../assets/Cut-diagram/second.png')
},
{
  name: '离退',
  path: '/depart',
  Url:require('../assets/Cut-diagram/Retreat.png')
},
{
  name: '长病假',
  path: '/sick_leave',
  Url:require('../assets/Cut-diagram/Longsickleave.png')
},
{
  name: '产假',
  path: '/maternity_leave',
  Url:require('../assets/Cut-diagram/maternityleave.png'),
},
{
  name: '添加课后服务人员',
  path: '/Add_waitstaff',
  Url:require('../assets/Cut-diagram/Addafterschoolservicepersonnel.png')
},
])
</script>

<style lang="less" scoped>
.homeBox {
  padding: 20px 0 0px 24px;
  height: calc(100vh - 130px);
  overflow-y: scroll;
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
  overflow: hidden;
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
  margin: 24px 0 0px 0;
  padding: 30px;

  .funTitle {
    font-weight: bold;
    font-family: SourceHanSansCN-Bold;
    font-size: 20px;
    color: #333333;

  }

  .itemSty {
    margin-right: 66px;
  }
  .itemSty:nth-child(5){
    .itemName{
      margin-left: 9px;
    }
  }
  .itemSty:nth-child(6){
    .itemName{
      margin-left: 20px;
    }
  }
  .itemSty:nth-child(7){
    .itemName{
      margin-left: 4px;
    }
  }
.My-apply{
  // background-color: #007aff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    width: 71px;
    height: 71px;
    margin-left: 10px;
  }

  .itemName {
    margin-top: 22px;
    font-size: 16px;
    color: #333333;
    // margin-left: 12px;
  }
  
}


  .changeName {
    color: #999999;
  }
}

.line {
  height: 50px;
}
</style>