<template>
<div>
    <div class="navTitle">{{title}}</div>
</div>
</template>
<script setup> 
    const props = defineProps({
        title:{
            type:String,
            default:'标题'
        }
    })
const data = reactive({});
onMounted(() => {

});
</script>



<style lang="less" scoped>
    .navTitle{
        font-weight: bold;
        font-family: SourceHanSansCN-Bold;
        font-size: 20px;
        color: #333333;
    }
</style>
