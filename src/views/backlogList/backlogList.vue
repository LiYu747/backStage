<template>
    <div>
        <HandleScreening class="m-l2" :totalElements="totalElements" @getSearchInfo="getSearchInfo" @getAll="getAll"
            @handleCurrentChange="handleCurrentChange" title="待办列表" :isShowState="1" :auditList="auditList" isOutstanding></HandleScreening>
    </div>
</template>
<script setup>
import { backlogFindAll } from '../../api/apply.js'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
//页数 
const page = ref(0)
const size = ref(10)
//审核列表
const auditList = ref([])
// 总条数
const totalElements = ref(0)
//搜索条件
const search = ref({})
const getAll = async () => {
    let el = {
        page: page.value,
        size: size.value,
        sort: 'createdAt,desc'
    }
    if (search) {
        Object.assign(el, search.value)
    }
    let res = await backlogFindAll(el)
    if (res.code != 0) {
        return
    }
    console.log(res);
    auditList.value = res.result.content
    totalElements.value = res.result.totalElements
}
//获取搜索信息
const getSearchInfo = (val) => {
    page.value = 0
    search.value = val
    getAll()
}
//分页跳转页数
const handleCurrentChange = (val) => {
    page.value = val - 1
    getAll()
}
onActivated(() => {
    getAll()
})

onMounted(() => {
    
    // getAll()
});
</script>



<style lang="less" scoped></style>