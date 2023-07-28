<template>
    <div class="boxHand">
        <HandleScreening class="m-l2"  :totalElements="totalElements" @getSearchInfo="getSearchInfo" @handleCurrentChange="handleCurrentChange" title="我的报送" :auditList="auditList"  ></HandleScreening>
    </div>
    </template>
    <script setup>
        import { Initiated } from '../../api/apply.js'
        import { ElMessage } from 'element-plus'
     //页数 
     const page = ref(0)
     const size = ref(10)
     //审核列表
    const auditList = ref([])
    // 总条数
    const totalElements = ref(0)
    //搜索条件
    const search = ref({})
    const getAll = async() => {
        let el = {
        page:page.value,
        size:size.value,
        sort:'createdAt,desc'
       }
        if(search){
            Object.assign(el,search.value)
        }
       let res = await Initiated(el)
       if(res.code != 0){
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
        page.value = val-1
        getAll()
    }
    onActivated(() => {
        getAll()
    })
    onMounted(() => {
        // getAll()
    });
    </script>
    
    
    
    <style lang="less" scoped>

        .boxHand{
            width: 100%;
            height: 100vh;
            background: #F7F7F7;
            overflow:auto;
        }
    </style>