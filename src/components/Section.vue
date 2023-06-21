<script setup>
import { ref, reactive, onMounted } from 'vue'
const props = defineProps({
    //子组件接收父组件传递过来的值
    info: String,
})
//使用父组件传递过来的值
const { info} = toRefs(props)
</script>
<template>
    <div class="personal_baseInfo">
        <div class="personal_baseInfo_title">{{ info }}</div>
    </div>
</template>

<style lang='less' scoped>
.personal_baseInfo {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 10px;
    .personal_baseInfo_title {
        margin-left: 6px;
        font-size: 20px;
        font-weight: bold;
    }
}
</style>