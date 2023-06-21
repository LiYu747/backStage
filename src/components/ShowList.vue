<script setup>
// 基本信息展示
import { ref, reactive, onMounted } from 'vue'
const Edit = () => {
    console.log("编辑");
}
const Submitted = () => {
    console.log("报送");
}

const props = defineProps({
    //子组件接收父组件传递过来的值
    info: String,
    List: Array
})
//使用父组件传递过来的值
const { info,List } = toRefs(props)
</script>


<template>
    <div>
        <div class="info_box">
            <div class="personal_personalInfo_title">{{ info }}</div>
            <div>
                <el-button @click="Edit">编辑</el-button>
                <el-button @click="Submitted">报送</el-button>
            </div>
        </div>
        <div class="personal_table">
            <el-descriptions border :column="2">
                <el-descriptions-item v-for="(item, index) in List" :key="item.id" :label="item.label"
                    align="center">{{ item.value }}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<style lang='less' scoped>
.info_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .personal_personalInfo_title {
        position: relative;
        margin-left: 22px;
        font-size: 16px;
    }

    .personal_personalInfo_title::before {
        position: absolute;
        content: "";
        left: -10px;
        top: 4px;
        width: 3px;
        height: 14px;
        background-color: #666;
    }
}
.personal_table{
        margin-top: 10px;
    }
</style>