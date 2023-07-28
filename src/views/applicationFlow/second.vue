<template>
    <div class="entryBox">
        <LNav title="借调"></LNav>
        <!-- 人员选择 -->
        <div>
            <FormTop ref="vail" :formData="formData" title="人员选择" @ObtainVal="ObtainVal"></FormTop>
        </div>

        <!-- 基本信息 -->
        <div>
            <FormLy ref="staffRef" isDisabled :formData="infoData" title="调动后"></FormLy>
        </div>

        <!-- 操作 -->
        <div class="flex m-l4 m-t1">
            <el-button type="primary" size="large" @click="submit">提交</el-button>
            <el-button type="primary" size="large" plain @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script setup>
import LNav from '../applicationFlow/components/LNav'
import FormTop from '../applicationFlow/components/Form-top.vue'
import FormLy from '../applicationFlow/components/Form-ly.vue'
import {
    ElMessage
} from 'element-plus'
import {
    useRouter
} from 'vue-router'
import {
    applySave,
    findDictionaries,
    findByLevel,
    findByPid
} from '../../api/apply.js'
import {
    organizationTree
} from '../../api/roster.js'
const router = useRouter();

onMounted(() => {
    getOption()
})
//获取组织架构
const getOrganizationTree = async () => {
    let {
        result
    } = await organizationTree({
        idCard: '330602196710200015',
        token: localStorage.getItem('dslToken'),
    })
    if (!result) return
    valKey(result.list)
    console.log('res: ', result.list);
    infoData.value[0].opt = result.list
    infoData.value[2].opt = result.list
    infoData.value[3].opt = result.list
}
//处理用工单位key，value
const obj = {}
const valKey = (val) => {
    for (let i = 0; i < val.length; i++) {
        obj[val[i].title] = val[i].key;
        if (val[i].children) {
            valKey(val[i].children)
        }
    }
}
const transitionInfo = (val) => {
    if (!val) return ''
    let str = val[val.length - 1]
    return str
}

// 表单验证
const optApi = ref([{
    parentId: 855, //岗位
    idx: 1,
    id: 2,
},
{
    parentId: 859, //部门
    idx: 4,
    id: 2,
},
{
    parentId: 410, //编制状态 
    idx: 5,
    id: 2,
},
])


const startTime = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请选择开始时间'))
    } else {
        let start = staffRef.value.fromOption.timeOn
        let end = staffRef.value.fromOption.EndTime
        if (transitionJab(start) > transitionJab(end)) {
            callback('不可大于结束时间')
            staffRef.value.fromOption.timeOn = ''
        } else {
            callback()
        }

    }
}
const endTime = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请选择结束时间'))
    } else {
        let start = staffRef.value.fromOption.timeOn
        let end = staffRef.value.fromOption.EndTime
        if (transitionJab(start) > transitionJab(end)) {
            callback('不可小于开始时间')
            console.log(staffRef.value.fromOption.EndTime);
            staffRef.value.fromOption.EndTime = ''
        } else {
            callback()
        }

    }
}

const getOption = async () => {
    getOrganizationTree()
    const resArr = await Promise.all(
        optApi.value.map(async (item) => {
            const res = await findDictionaries({
                parentId: item.parentId
            });
            return res.result;
        })
    );
    // console.log(resArr);
    optApi.value.map((item, index) => {
        if (item.id == 1) {
            console.log(formData.value);
            formData.value[item.idx].opt = resArr[index]
        }
        if (item.id == 2) {
            infoData.value[item.idx].opt = resArr[index]
        }
    })
}

//表单
const formData = ref([{
    label: "人员",
    type: "input",
    prop: "name",
    value: "",
    iptWid: '955px',
    rules: [{
        required: true,
        message: "请填写姓名",
        trigger: "blur",
    },],
}])

//表单
const infoData = ref([{
    label: "工作单位",
    type: "cascader",
    prop: "workUnit",
    value: "",
    iptWid: "520px",
    title: 'title',
    Any_layer: true,
    rules: [{
        required: true,
        message: "请选择工作单位",
        trigger: "change",
    },],
},
{
    label: "岗位",
    type: "cascader",
    prop: "station",
    value: "",
    iptWid: '435px',
    rules: [{
        required: true,
        message: "请选择岗位",
        trigger: "change",
    },],
},
{
    label: "编制单位(用工单位)",
    type: "cascader",
    prop: "unit",
    value: "",
    width: '185px',
    iptWid: '475px',
    title: 'title',
    Any_layer: true,
    rules: [{
        required: true,
        message: "请选择编制单位",
        trigger: "change",
    },],
},

{
    label: "隶属集团",
    type: "cascader",
    prop: "group",
    value: "",
    iptWid: '520px',
    title: 'title',
    Any_layer: true,
    rules: [{
        required: false,
        message: "请选择隶属集团",
        trigger: "change",
    },],
},

{
    label: "部门",
    type: "cascader",
    prop: "department",
    value: "",
    iptWid: '435px',
    rules: [{
        required: true,
        message: "请选择部门",
        trigger: "change",
    },],
},
{
    label: "借调开始时间",
    type: "date-picker",
    prop: "timeOn",
    value: "",
    width: '148px',
    iptWid: '250px',
    rules: [{
        required: true,
        validator: startTime,
        // message:'请选择借调开始时间',
        trigger: "change",
    },],
    opt: []
},
{
    label: "借调结束时间",
    type: "date-picker",
    prop: "EndTime",
    value: "",
    // width: '180px',
    iptWid: '225px',
    rules: [{
        required: true,
        validator: endTime,
        // message:'请选择借调结束时间',
        trigger: "change",
    },],
    opt: []
},


{
    label: "调动原因",
    type: "input",
    prop: "why",
    value: "",
    iptWid: '1430px',
    rules: [{
        required: false,
    },],
    opt: []
},
])
//标准时间转时间戳
const transitionJab = (val) => {
    const date = new Date(val) * 1
    return date
}
//  提交
const vail = ref(null)
const staffRef = ref(null)
const top_val = ref(null)
//防抖
let timer = null
const submit = () => {
    let firstClick = !timer;
    if (firstClick) fnSubmit()
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        timer = null
    }, 1500)
};
const fnSubmit = async () => {
    console.log(vail.value.fromOption);
    console.log(staffRef.value.fromOption);
    let oneVerify = await vail.value.ruleFormRef.validate((valid) => {
        if (valid) {
            return true
        } else {
            return false
        }
    })
    let twoVerify = await staffRef.value.ruleFormRef.validate((valid) => {
        console.log(valid);
        if (valid) {
            return true
        } else {
            return false
        }
    })
    console.log(oneVerify, twoVerify);
    if (!oneVerify || !twoVerify) return
    let oneInfo = vail.value.fromOption
    let twoInfo = staffRef.value.fromOption
    const variables = {
        teacherId: top_val.value.id, //对应的教师id
        newWorkName: transitionInfo(twoInfo.workUnit), //调动后工作单位
        newWorkNameKey: obj[transitionInfo(twoInfo.workUnit)], //调动后工作单位key
        newJob: transitionInfo(twoInfo.station), //调动后的岗位
        newAffiliationDepartment: transitionInfo(twoInfo.department), //所属部门
        newAffiliationWork: transitionInfo(twoInfo.group), //调动后隶属集团
        newAffiliationWorkKey: obj[transitionInfo(twoInfo.group)], //调动后隶属集团key
        newOrganizationUnit: transitionInfo(twoInfo.unit), //调动后编制单位(用工单位)
        newOrganizationUnitKey: obj[transitionInfo(twoInfo.unit)],//编制单位Key
        loanedPersonnelStartTime: transitionJab(twoInfo.timeOn), //调动开始时间
        loanedPersonnelEndTime: transitionJab(twoInfo.EndTime), //调动结束时间
        cause: twoInfo.why, //调动原因
    }
    let res = await applySave({
        applyType: "LOAN", //申请类型,可用值:ENTRY,RETIRE,TRANSFER,LOAN,SICK_LEAVE,MATERNITY_LEAVE,UPDATE
        targetId: top_val.value.id, //申请对象id
        targetName: "", //申请对象
        teacherName: oneInfo.name, //教职工名称
        variables: variables, //	自定义变量 
    })
    console.log('res', res);
    if (res.code != 0) {
        ElMessage.error(res.msg)
        return
    }
    ElMessage({
        message: '提交成功',
        type: 'success',
    })
    router.push('/backlogList')
}


//获取头部表达数据
const ObtainVal = (val) => {
    console.log('val: ', val);
    top_val.value = val
}

//取消
const cancel = () => {
    router.back()
}
</script>

<style lang="less" scoped>
.entryBox {
    padding: 20px;
}
:deep(.el-form-item__error){
z-index: 10;
}
</style>