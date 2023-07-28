<script setup>
import { ref, reactive, onMounted } from 'vue'
</script>


<template>
    <div class="scroll_top">
        <el-backtop :right="100" :bottom="20">
            回到顶部
        </el-backtop>
    </div>
</template>

<style lang='less' scoped>
.scroll_top{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
:deep(.el-backtop){
    width: 100px;
    height: 40px;
    border-radius:0;
}
</style>