<template>
<div>
    <el-card class="box-card">
        <template #header>
          <div class="card-header flex ju-between">
            <span>通知公告</span>
            <el-button class="button" @click="goBack" type="primary" >返回</el-button>
          </div>
          
        </template>
            <div v-for="item in tipsList" :key="item.id" @click="details(item.id)" class="flex al-center m-b2 m-t1 cur-p"><div class="circle"></div>{{ item.headline }}</div>
      </el-card>
    <div class="flex ju-center m-t3">
        <!-- <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" 
        :background="background" layout="total,  prev, pager, next, jumper" :total="totalElements"
        @current-change="handleCurrentChange">
    </el-pagination> -->
    </div>
</div>
</template>
<script setup>
    import { findAllByDel } from '@/api/project';
    import { useRouter } from 'vue-router';
const goBack = () => {
    router.back()
}
const router = useRouter()
const data = reactive({});
onMounted(() => {
    projectAll()
});
const currentPage = ref(0)
const pageSize = ref(10)
const totalElements = ref(0)
const handleCurrentChange = (val) => {
    currentPage.value  = val - 1
    projectAll()
}
const background = ref(true)
const tipsList = ref([])
//获取启用公告
const projectAll = async () => {
  const params = {
    sort: 'startTime,desc',
    page: currentPage.value,
    size: pageSize.value
  }
  const { result, code, msg } = await findAllByDel(params)
    console.log(result);
  if (code == 0 && result) {
    totalElements.value = 0
    tipsList.value = result
  } else {
    console.log(msg, '失败');
  }

}
const details = (item) => {
    router.push({ path: '/projectdetailsTeacher',query:{item:item}})
}
</script>



<style lang="less" scoped>
.box-card{
    height: 600px;
}
.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #c4e2ff;
  margin-left: 31px;
  margin-right: 11px;
}
</style>