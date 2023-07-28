<template>
    <div class="backlogCenter">
        <Examine class="m-l2" isOutstanding></Examine>
        <div class="bom"></div>
    </div>
</template>
<script setup>
    import Examine from './components/Examine.vue'
    const data = reactive({});
//     onBeforeRouteLeave((to, from, next) => {
//         to.meta.keepAlive = true;
//     next(); 
// })
    onMounted(() => {});
</script>



<style lang="less" scoped>
    .backlogCenter {
        height: 100%;
        overflow: auto;
    }

    .bom {
        height: 100px;
    }
</style>