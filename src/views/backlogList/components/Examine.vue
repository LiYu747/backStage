<template>
    <div>
        <div class="title">{{ title }}</div>
        <!-- 入职 -->
        <Entry v-if="flowType == 'ENTRY'" :formData="formData" :flowType="flowType" :infoData="infoData"></Entry>
        <!-- 添加课后服务人员 -->
        <Entry v-if="flowType == 'OUTSIDE_SCHOOL'" :flowType="flowType" :formData="formData" noStaff></Entry>
        <!-- 调动 -->
        <Transfer v-if="flowType == 'TRANSFER'" :flowType="flowType" :formData="transferFrom"
            :priorToTransfer="priorToTransfer"></Transfer>
        <!-- 借调 -->
        <Transfer v-if="flowType == 'LOAN'" :formData="second" :flowType="flowType" :priorToTransfer="priorToTransfer">
        </Transfer>
        <!-- 离退  -->
        <Retirement :formData="retirement" :flowType="flowType" v-if="flowType == 'RETIRE'" title='离退信息'
            :priorToTransfer="priorToTransfer"></Retirement>
        <!--  病假 -->
        <Retirement :formData="sickLeave" :flowType="flowType" v-if="flowType == 'SICK_LEAVE'" title='长病假信息'
            :priorToTransfer="priorToTransfer"></Retirement>
        <!-- 产假 -->
        <Retirement :formData="maternityLeave" :flowType="flowType" v-if="flowType == 'MATERNITY_LEAVE'" title='产假信息'
            :priorToTransfer="priorToTransfer"></Retirement>
        <!-- 更新 -->
        <Update v-if="flowType == 'UPDATE'"></Update>
        <!-- 审批情况 -->
        <div v-if="isOutstanding">
            <div>审批情况</div>
            <div class="sun">
                <div class="flex al-center fz-14 m-l1 m-t2">
                <div class="m-r1 sun-itema">是否通过</div>
                <el-select v-model="isPass" size="large">
                    <el-option v-for="item in passOpt" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <div class="flex m-t2">
                <span class="fz-14 m-l1 m-r1 sun-itemb">审批意见</span>
                <el-input class="textarea" resize="none" v-model="ruleFormDesc" type="textarea" />
            </div>
            <div class="flex m-t2 m-l1">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="primary" plain @click="cancel">取消</el-button>
            </div>
            </div>
           
        </div>
        <!-- 流程跟踪 -->
        <div class="m-t2">
            <div>流程跟踪</div>
            <div class="m-t1">
                <el-table ref="multipleTableRef" :data="tableData" border empty-text="暂无数据" style="width: 96%">
                    <el-table-column label="环节">
                        <template #default="scope">{{ scope.row.tache }}</template>
                    </el-table-column>
                    <el-table-column header-align="center" align="center" label="状态">
                        <template #default="scope"><span class="cur-p" @click="gotoInfo">{{ scope.row.state
                        }}</span></template>
                    </el-table-column>
                    <el-table-column header-align="center" align="center" property="operator" label="操作人"
                        show-overflow-tooltip />
                    <el-table-column header-align="center" align="center" width="200" property="executionTime" label="执行时间"
                        show-overflow-tooltip />
                    <el-table-column header-align="center" align="center" property="opinion" label="意见" width="400"
                        show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script setup>
import Entry from './Entry.vue'
import Transfer from './Transfer.vue'
import Retirement from './Retirement.vue'
import Update from './Update.vue'
import {
    passOpt,
    timestampToTime,
    judgeProcess,
    judgeState,
    formData,
    infoData,
    transferFrom,
    priorToTransfer,
    retirement,
    sickLeave,
    maternityLeave,
    second,
    judgeProcessText
} from './Examine.js'
import {
    auditLog,
    isPassAudit
} from '../../../api/apply.js'
import {
    ElMessage
} from 'element-plus'
import {
    useRoute,
    useRouter
} from 'vue-router'
const route = useRoute()
const router = useRouter()
const props = defineProps({
    isOutstanding: {
        type: Boolean,
        default: false
    },
})
//标题
const title = ref('')
//id
const passId = ref('')
//审批意见
const ruleFormDesc = ref('')
const role = ref(0)
//提交
const submit = async () => {

    if (isPass.value == ''&& JSON.stringify(isPass.value)!='false') {
        ElMessage({
            message: '请选择是否通过',
            type: 'warning',
        })
        return
    }

    // return
    let res = await isPassAudit({
        pass: isPass.value,
        id: passId.value,
        opinion: ruleFormDesc.value
    })
    if (res.code != 0) {
        ElMessage({
            message: res.msg,
            type: 'error',
        })
        return
    }
    router.back()
    if (isPass.value) {
        ElMessage({
            message: '审批通过',
            type: 'success',
        })
    }else{
        ElMessage({
            message: '审批不通过',
            type: 'success',
        })
    }

}

//取消
const cancel=()=>{
    router.back()
}

// 是否通过
const isPass = ref("")

//流程列表
const tableData = ref([])
//获取流程信息
const getFlow = async (id) => {
    let res = await auditLog({
        applyId: id
    })
    if (res.code !== 0) return
    let list = []
    res.result.map(item => {
        let arr = {
            tache: judgeProcess(item.taskType),
            state: judgeState(item.applyLogState),
            operator: item.operatorName,
            executionTime: item.operateDate ? timestampToTime(item.operateDate, 'is') : '',
            opinion: item.opinion,
        }
        list.push(arr)
    })
    tableData.value = list
    console.log('list: ', list);
}
const flowType = ref('')
onMounted(() => {
    passId.value = route.query.id
    console.log('route.query: ', route.query);
    flowType.value = route.query.type
    title.value = judgeProcessText(route.query.type)
    getFlow(route.query.id)
});
</script>



<style lang="less" scoped>
.title {
    font-size: 20px;
    font-weight: 700;
    margin: 20px 0;
}

.textarea {
    width: 1215px;
}

.el-dropdown-link {
    width: 200px;
    padding: 0 10px;
    height: 30px;
    border: 1px solid #dcdfe6;
    background: #ffffff;
    border-radius: 4px;
}
.sun{
    margin-left: 9px;
    .sun-itema{
        margin-left: 35px;
    }
}

.sun-itemb{
    // width: 100px;
    margin-left: 45px;
}
:deep(.el-input__wrapper){
    width: 220px;
}
</style>