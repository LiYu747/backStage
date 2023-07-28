<template>
    <div>
        <HandleScreening class="m-l2" :isShowState="1" :totalElements="totalElements" @getSearchInfo="getSearchInfo" @handleCurrentChange="handleCurrentChange" title="已办列表" :auditList="auditList"  ></HandleScreening>
    </div>
    </template>
    <script setup>
        import { Handled } from '../../api/apply.js'
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
       let res = await Handled(el)
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
    // onBeforeRouteLeave((to, from, next) => {
    //     console.log(to.path);
    //     if (to.path == '/backlogDetail') {
    //         to.meta.keepAlive = true;
    //     } else {
    //         console.log(2111);
    //         to.meta.keepAlive = false;
    //     }
    //     next();
    // })
    onMounted(() => {
        // getAll()
    });
    </script>
    
    
    
    <style lang="less" scoped>
    </style>