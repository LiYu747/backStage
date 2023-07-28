<template>
    <div class="backlogCenter">
        <Examine class="m-l2" title="已办详情"></Examine>
        <div class="bom"></div>
    </div>
</template>
<script setup>
    import Examine from '../backlogList/components/Examine.vue'
    const data = reactive({});
  

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