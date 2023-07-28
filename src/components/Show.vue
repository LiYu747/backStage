<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { personalInformationStore } from "@/store/personalInformation.js";//基本信息仓库
const { userInfo } = storeToRefs(personalInformationStore())
const { setPersonalInfo, setApplyId } = personalInformationStore()
const showListData = reactive({
    showFormData: [],
    isShow: false,
    isTagShow: false
})
const props = defineProps({
    //子组件接收父组件传递过来的值
    title: {
        type: String
    },
    //子组件接收父组件传递过来的组织结构key,val形式
    unitobj: {
        type: Object
    },
    //表格标题内容及表头
    showData: {
        type: Array,
        default: () => [],
    },
    //表格标题内容及表头
    userTeacherId: {
        type: Number,
        default: 0,
    },

})
//使用父组件传递过来的值
const { title, showData, unitobj } = toRefs(props)
// console.log('showData: ', showData);
const form = ref(null)
let index2 = ref(null);//第几个表单
const Edit = (idx) => {
    console.log(idx, "第几个编辑");
    form.value[idx]?.upLose()
    index2.value = idx
}
const Submitted = (idx) => {
    if (JSON.stringify(userInfo.value) == "{}") {
        ElMessage({
            showClose: true,
            message: '请先编辑',
            type: 'error',
        })
    } else {
        form.value[idx]?.sendUserApplyInfo()
        // ElMessage({
        //     message: '报送成功,请耐心等待',
        //     type: 'success',
        // })
        // console.log("报送成功");
        // userInfo.value={}
    }

}
</script>
<template>
    <div>
        <div class="personal_baseInfo_title" :id="title">{{ title }}</div>
        <div v-for="(item1, index1) in showData" :key="index1">
            <!-- {{ showData[1].showHeader[4].value }}  {{ item1.info2 }} -->
            <div v-if="!item1.info2">
                <div class="info_box">
                    <div class="personal_personalInfo_title">{{ item1.info }}</div>
                    <div>
                        <el-button @click="Edit(index1)">编辑</el-button>
                        <el-button @click="Submitted(index1)">报送</el-button>
                    </div>
                </div>
                <div class="personal_table">
                    <el-descriptions border :column="2" >
                        <template v-for="(item, index) in item1.showHeader" :key="index">
                            <el-descriptions-item v-if="item.img" :label="item.label" align="center" width="300px">
                                <div>
                                    <el-tag v-if="item.newId">新</el-tag>
                                    <el-image v-if="item.value" style="width: 100px; height: 100px" :src="item.value" />
                                </div>
                            </el-descriptions-item>
                            <el-descriptions-item v-else :label="item.label" align="center"  width="300px">
                                <div>
                                    <el-tag v-if="item.newId">新</el-tag>
                                    <text v-if="item.value2">{{ item.value }} {{ `/ ${item.value2}` }}</text>
                                    <text v-if="!item.value2">{{ item.value }}</text>
                                </div>
                            </el-descriptions-item>
                        </template>
                    </el-descriptions>
                </div>
            </div>

            <div v-else-if="showData[1].showHeader[4].value==item1.info2 ">
                <div class="info_box">
                    <div class="personal_personalInfo_title">{{ item1.info }}</div>
                    <div>
                        <el-button @click="Edit(index1)">编辑</el-button>
                        <el-button @click="Submitted(index1)">报送</el-button>
                    </div>
                </div>
                <div class="personal_table">
                    <el-descriptions border :column="2">
                        <template v-for="(item, index) in item1.showHeader" :key="index">
                            <el-descriptions-item v-if="item.img" :label="item.label" align="center"  width="300px">
                                <div>
                                    <el-tag v-if="item.newId">新</el-tag>
                                    <el-image v-if="item.value" style="width: 100px; height: 100px" :src="item.value" />
                                </div>
                            </el-descriptions-item>
                            <el-descriptions-item v-else :label="item.label" align="center"  width="300px">
                                <div>
                                    <el-tag v-if="item.newId">新</el-tag>
                                    <text v-if="item.value2">{{ item.value }} {{ `/ ${item.value2}` }}</text>
                                    <text v-if="!item.value2">{{ item.value }}</text>
                                </div>
                            </el-descriptions-item>
                        </template>
                    </el-descriptions>
                </div>
            </div>

            <ShowFormList :formIndex="index2" :title="item1.info" ref="form" :showFormHeader="item1.showHeader"
              :titles="title" :Myform="showData"  :unitobj="unitobj" :userTeacherId="userTeacherId" />
        </div>
    </div>
</template>

<style lang='less' scoped>
.personal_baseInfo_title {
    margin-left: 6px;
    font-size: 20px;
    font-weight: bold;
}

.avatar {
    width: 100px;
    height: 100px;
}

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

.personal_table {
    margin-top: 10px;
}</style>