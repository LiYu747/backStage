<template>
    <div class="handBox">
        <div class="flex ju-between al-center"><div class="title">{{ title }}</div> <div v-if="RoleType=='teacher'" class="m-r2"> <el-button class="button" @click="goBack" type="primary" >返回</el-button></div></div>
        <div class="flex">
            <div v-for="(item, index) in option" :key="item.id">
                <div v-if="index >= isShowState" class="flex al-center m-r1">
                    <span class="m-r1 m-l1">{{ item.name }}</span>
                    <div class="iptBox" v-if="item.type == 'input'">
                        <component :is="`el-${item.type}`" v-model="item.value" placeholder=""></component>
                    </div>
                    <div class="iptBox" v-if="item.type == 'select'">
                        <component :is="`el-${item.type}`" v-model="item.value" placeholder="">
                            <el-option @click="getValue(opt, index)" v-for="opt in item.option" :key="opt.id"
                                :label="opt.label" :value="opt.value" />
                        </component>
                    </div>
                    <div class="timeBox" v-if="item.type == 'time'">
                        <el-date-picker v-model="item.value" @change="onChange(index)" type="date" placeholder="选择时间"
                            class="cur-p" />
                    </div>
                </div>
            </div>
            <div>
                <el-button type="primary" @click="searchBtn">搜索</el-button>
            </div>
            <div v-if="isOutstanding" class="m-l1">
                <el-button type="primary" @click="batchApproval">批量审批</el-button>
            </div>
        </div>
        <div class="m-t2 ">
            <el-table ref="multipleTableRef" :data="tableData" border empty-text="暂无数据" style="width: 98%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" v-if="isOutstanding" width="40" />
                <el-table-column label="教职工" width="200">
                    <template #default="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="流程名称" width="230">
                    <template #default="scope"><span class="cur-p " @click="gotoInfo">{{ scope.row.flow }}</span></template>
                </el-table-column>
                <el-table-column header-align="center" align="center" property="tache" label="环节" width="230"
                    show-overflow-tooltip />
                <el-table-column header-align="center" align="center" property="sender" label="发送人" width="180"
                    show-overflow-tooltip />
                <el-table-column header-align="center" align="center" property="primaryOrganization" label="一级组织"
                    width="200" show-overflow-tooltip />
                <el-table-column header-align="center" align="center" property="transmissionTime" label="提交时间" width="200"
                    show-overflow-tooltip />
                <el-table-column header-align="center" align="center" property="approvalTime" label="审核时间" width="200"
                    show-overflow-tooltip />
                <el-table-column header-align="center" align="center" label="操作" show-overflow-tooltip>
                    <template #default="scope">
                        <el-button type="primary" v-if="isOutstanding" size="small" @click="examineBtn(scope.row)">审批
                        </el-button>
                        <el-button type="primary" v-else size="small" @click="editBtn(scope.row)"> 查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex m-t2 ju-center">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :small="small"
                :background="background" layout="total,  prev, pager, next, jumper" :total="totalElements"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <!-- 批量审批 -->
        <div>
            <el-dialog v-model="dialogTableVisible" width="30%" align-center>
                <template #header="{ close, titleId, titleClass }">
                    <div class="my-header flex ju-center">
                        批量审批（{{ nums }}）
                    </div>
                </template>
                <div class="flex contentBox">
                    <div>本次审批包含:</div>
                    <div class="m-l4">
                        <div v-for="item in locData" class="m-b1 flex" :key="item.id">
                            <div class="nameText">{{ item.flow }}</div>
                            <span>{{ item.count }}条</span>
                        </div>
                    </div>
                </div>
                <div class="flex ju-between m-t1 btnBox">
                    <el-button type="primary" @click="batch" :loading="loading">审批通过</el-button>
                    <el-button type="primary" plain @click="dialogTableVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import {
    Search,
    ArrowDown,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { judgeProcess, judgeTache } from './HandleScreening.js'
import { timestampToTime } from '../../views/backlogList/components/Examine.js'
import { batchAudit, asyncTask } from '@/api/apply.js'
import { ElMessage } from 'element-plus'
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const props = defineProps({
    title: {
        type: String,
        default: '标题'
    },
    isOutstanding: {
        type: Boolean,
        default: false
    },
    auditList: {
        type: Array,
        default: []
    },
    totalElements: {
        type: Number,
        default: 0
    },//总数
    isShowState: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['getSearchInfo', 'handleCurrentChange', 'getAll'])
const locData = ref([]);//批量数据
const nums = ref(null);//批量数据
const dataArr = ref([]);//批量数据id
//搜索
const searchBtn = () => {
    currentPage4.value = 1
    let arr = {
        auditState: option.value[0].idType,
        teacherName: option.value[1].value,
        applyType: option.value[2].idType,
        startDate: dateTrans(option.value[3].value),
        endDate: dateTrans(option.value[4].value),
    }
    emit('getSearchInfo', arr)
}
const dateTrans = (val) => {
    if (!val) return ''
    return val.getTime()
}
const goBack = () => {
    router.back()
}
//时间选择
const onChange = (idx) => {
    let startDate = dateTrans(option.value[3].value)
    let endDate = dateTrans(option.value[4].value)
    //开始时间
    if (idx == 3) {
        if (!endDate) return
        if (startDate >= endDate) {
            ElMessage({
                message: '开始时间小于结束时间',
                type: 'warning',
            })
            option.value[3].value = ''
        }
    }
    //结束时间
    if (idx == 4) {
        if (!startDate) return
        if (startDate >= endDate) {
            ElMessage({
                message: '结束时间大于开始时间',
                type: 'warning',
            })
            option.value[4].value = ''
        }
    }
}
//选中的值 
const getValue = (val, index) => {
    option.value[index].idType = val.value
}
//默认第几页
const currentPage4 = ref(1)
// 分页器配置
// 每页显示条目个数
const pageSize4 = ref(10)
//第几页
const page = ref(1)
const small = ref(false)
const background = ref(true)
//点击第几页
const handleCurrentChange = (val) => {
    emit('handleCurrentChange', val)
}
//编辑
const editBtn = (val) => {
    // console.log(val);
    if (props.title == '我的报送') {
        let RoleType =  localStorage.getItem('RoleType') 
        let path =  RoleType&&RoleType == 'teacher'?'submissionDetailTeacher':'/submissionDetail'
        router.push({
            path: path,
            query: {
                id: val.id,
                type: val.type,
                targetName: val.targetName ? val.targetName : '',
                teacherId: val.teacherId ? val.teacherId : '',
                targetId: val.targetId ? val.targetId : ''
            }
        })
    } else {
        router.push({
            path: "/finisDetails",
            query: {
                id: val.id,
                type: val.type,
                targetName: val.targetName ? val.targetName : '',
                teacherId: val.teacherId ? val.teacherId : '',
                targetId: val.targetId ? val.targetId : ''
            }
        })
    }

}
//审批
const examineBtn = (val) => {
    router.push({
        path: "/backlogDetail",
        query: {
            id: val.id,
            type: val.type,
            targetName: val.targetName ? val.targetName : '',
            teacherId: val.teacherId ? val.teacherId : '',
            targetId: val.targetId ? val.targetId : ''
        }
    })
}
//批量审批
const dialogTableVisible = ref(false)
const batchApproval = () => {

    if (checkList.value.length == 0) {
        ElMessage({
            message: '请先选择需要批量处理的数据',
            type: 'warning',
        })
        return
    }
    console.log(checkList.value);
    nums.value = checkList.value.length

    // 统计流程出现的次数
    const count = {};

    checkList.value.forEach(item => {
        dataArr.value.push(item.id)
        dataArr.value = [...new Set(dataArr.value)]
        const flow = item.flow;
        if (count[flow]) {
            count[flow] += 1;
        } else {
            count[flow] = 1;
        }
    });

    // 转换为对象数组形式
    const resultArray = Object.keys(count).map(flow => ({ flow, count: count[flow] }));

    // 输出结果
    locData.value = resultArray
    console.log('locData.value: ', locData.value, dataArr.value);


    dialogTableVisible.value = true;
}
//
const checkList = ref([])
const handleSelectionChange = (item, index) => {
    checkList.value = item
}


const batch = async () => {
    loading.value = true
    let obj = { ids: dataArr.value, pass: true }

    let res = await batchAudit(obj)
    console.log('res: ', res);
    if (res.code == 0) {
        getasyncTask(res.result.id)
    }
}

let timer
const getasyncTask = async (id) => {

    await asyncTask({ id }).then(s => {
        console.log(s.result.complete);
        if (s.result.complete == false) {
            timer = setTimeout(() => {
                getasyncTask(id)
            }, 1000)//1秒查一下
        } else {
            clearTimeout(timer);//清理定时任务
            emit('getAll')//重新渲染
            dialogTableVisible.value = false;
            loading.value = false;

            ElMessage({
                message: '批量申请完成',
                type: 'success',
            })
        }
    })
    // console.log('res2: ', res2.result.complete);
}

const tableData = ref([])
//处理数据
const disposeData = (val) => {
    console.log(val);
    if (val.length == 0) {
        tableData.value = []
        return
    }
    let list = []
    val.map(item => {
        let arr = {
            name: item.teacherName,
            flow: judgeProcess(option.value[2].option, item.applyType),
            type: item.applyType,
            tache: judgeTache(item.auditState),
            sender: item.promoterName,
            primaryOrganization: "",
            transmissionTime: timestampToTime(item.createdAt),
            approvalTime: timestampToTime(item.updatedAt),
            edit: '',
            id: item.id,
            teacherId: item.teacherId,
            targetName: item.targetName,
            targetId: item.targetId
        }
        list.push(arr)
    })
    tableData.value = list
}
watch(() => props.auditList, () => {
    disposeData(props.auditList)
    console.log('props.auditList: ', props.auditList);
})
const RoleType =  localStorage.getItem('RoleType')
onMounted(() => {
    disposeData(props.auditList)
});
const option = ref([{
    name: "状态",
    type: "select",
    value: "全部",
    idType: "",
    option: [{
        label: "全部",
        value: "",
    },
    {
        label: "待审核",
        value: "WAIT_AUDIT",
    },
    {
        label: "审核中",
        value: "REVIEW",
    },
    {
        label: "审核通过",
        value: "PASS_AUDIT",
    },
    {
        label: "审核不通过",
        value: "FAIL_AUDIT",
    },
    ],
},
{
    name: "教职工",
    type: "input",
    value: "",
},
{
    name: "流程名称",
    type: "select",
    idType: "",
    value: "全部",
    option: [{
        label: "全部",
        value: "",
    },
    {
        label: "入职",
        value: "ENTRY",
    },
    {
        label: "调动",
        value: "TRANSFER",
    },
    {
        label: "借调",
        value: "LOAN",
    },
    {
        label: "离退",
        value: "RETIRE",
    },
    {
        label: "长病假",
        value: "SICK_LEAVE",
    },
    {
        label: "产假",
        value: "MATERNITY_LEAVE",
    },
    {
        label: "更新",
        value: "UPDATE",
    },
    {
        label: "课外",
        value: "OUTSIDE_SCHOOL",
    },
    ],
},
{
    name: "开始时间",
    type: "time",
    value: "",
},
{
    name: "结束时间",
    type: "time",
    value: "",
},
]);
</script>



<style lang="less" scoped>
.title {
  
    font-weight: 700;
    font-size: 20px;
    margin: 20px 0;
}

.iptBox {
    width: 130px;
}

.el-dropdown-link {
    width: 110px;
    padding: 0 10px;
    height: 28px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    display: flex;
}

:deep(.el-date-editor) {
    width: 130px;
}

.my-header {
    font-size: 18px;
}

.contentBox {
    font-size: 16px;
    padding-left: 60px;
    max-height: 500px;
    overflow: auto;
}

.nameText {
    width: 80px;
    text-align: right;
    margin-right: 10px;
}

.btnBox {
    padding: 0 60px;
}
</style>