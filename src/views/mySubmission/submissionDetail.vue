<template>
    <div class="backlogCenter">
        <Examine class="m-l2" title="报送详情"></Examine>
        <div class="bom"></div>
    </div>
    </template>
    <script setup>
         import Examine from '../backlogList/components/Examine.vue'
    const data = reactive({});
    // onBeforeRouteLeave((to, from, next) => {
    //     to.meta.keepAlive = true;
    //     next();
    // })
    onMounted(() => {});
    </script>
    
    
    <style lang="less" scoped>
          .backlogCenter {
            overflow: auto;
            background: #F7F7F7;
            height: 100%;
           position: relative;
           left: 0;
           right: 0;
           top: 0;
           bottom: 0;
        }
        .bom {
            height: 100px;
        }
    </style>