<template>
    <div class="entryBox">
        <LNav title="长病假"></LNav>
        <!-- 人员选择 -->
        <div>
            <FormTop ref="vail" :formData="formData" title="人员选择"  @ObtainVal="ObtainVal"></FormTop>
        </div>

        <!-- 基本信息 -->
        <div class="sun">
            <FormLy ref="staffRef" isDisabled :formData="infoData" title="长病假信息"></FormLy>
        </div>

        <!-- 操作 -->
        <div class="flex m-l4 m-t1">
            <el-button type="primary" size="large" @click="submit">提交</el-button>
            <el-button type="primary" size="large" plain @click="cancel">取消</el-button>
        </div>
        <!-- <InfoUpload ref="reference" title="附件上传" @upBack="upBack"></InfoUpload> -->
    </div>
</template>

<script setup>
import LNav from '../applicationFlow/components/LNav'
import FormTop from '../applicationFlow/components/Form-top.vue'
import FormLy from '../applicationFlow/components/Form-ly.vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {
    applySave,
    findDictionaries,
    findByLevel,
    findByPid
} from '../../api/apply.js'

const router = useRouter()

//标准时间转时间戳
const transitionJab = (val) => {
    const date = new Date(val) * 1
    return date
}


//表单
const formData = ref([{
    label: "人员",
    type: "input",
    prop: "name",
    value: "",
    iptWid: '1000px',
    rules: [{
        required: true,
        message: "请填写姓名",
        trigger: "input",
    },],
}])

//表单
const infoData = ref([{
    label: "病假开始时间",
    type: "date-picker",
    prop: "timeOn",
    value: "",
    // width: '135px',
    // iptWid: '600px',
    iptWid: '230px',
    rules: [{
        required: true,
        message: "请选择病假开始时间",
        trigger: "change",
    },],
},

{
    label: "长病假原因",
    type: "input",
    prop: "why",
    value: "",
    iptWid: '770px',
    rules: [{
        required: false,
    },],
    opt: []
},
])


//防抖变量
let timer = null
//防抖
const submit = () => {
    let firstClick = !timer;
    if (firstClick) fn()
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        timer = null
    }, 1500)
};

//  提交
const isRepetition = ref(false)
const vail = ref(null)
const staffRef = ref(null)
const top_val = ref(null)
const fn = async () => {
    console.log(vail.value.fromOption);
    // if (isRepetition.value) return
    isRepetition.value = true
    let oneVerify = await vail.value.ruleFormRef.validate((valid) => {
        if (valid) {
            return true
        } else {
            return false
        }
    })
    let twoVerify = await staffRef.value.ruleFormRef.validate((valid) => {
        if (valid) {
            return true
        } else {
            return false
        }
    })
    if (!oneVerify || !twoVerify) return
    let oneInfo = vail.value.fromOption
    let twoInfo = staffRef.value.fromOption

    console.log('top_val', top_val.value);
    const variables = {
        teacherId: top_val.value.id, //对应的教师id
        // name: oneInfo.name, //姓名
        // sex: '', //性别
        // idNumber: '', //证件号码
        // phone: '', //手机号
        // workName: '', //工作单位
        // affiliationWork: '', //隶属集团
        // organizationUnit: '', //编制单位(用工单位)
        // authorizedStrengthState: '', //编制状态
        // jobCategory: '', //岗位类别
        // affiliationDepartment: '', //所属部门
        retireTime: transitionJab(twoInfo.timeOn), //长病假原因时间
        cause: twoInfo.why, //长病假原因
    }
    let FilList = []

    let res = await applySave({
        applyAnnexVOList: FilList,
        applyType: "SICK_LEAVE", //申请类型,可用值:ENTRY,RETIRE,TRANSFER,LOAN,SICK_LEAVE,MATERNITY_LEAVE,UPDATE
        targetId: top_val.value.id, //申请对象id
        targetName: "", //申请对象
        teacherName: oneInfo.name, //教职工名称
        variables: variables, //	自定义变量 
    })
    isRepetition.value = false
    console.log(res);
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
const cancel=()=>{
    router.back()
}

</script>

<style lang="less" scoped>
.entryBox {
    padding: 20px;
}
</style>