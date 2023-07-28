<template>
    <div class="entryBox">
        <LNav title="离退"></LNav>
        <!-- 人员选择 -->
        <div>
            <FormTop ref="vail" :formData="formData" title="人员选择" @ObtainVal="ObtainVal"></FormTop>
        </div>

        <!-- 基本信息 -->
        <div>
            <FormLy ref="staffRef" isDisabled :formData="infoData" title="离退信息"></FormLy>
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
onMounted(() => {
    // getOption()
})

// 表单验证
const optApi = ref([
    // {
    //     parentId: 855, //岗位
    //     idx: 1,
    //     id: 2,
    // },
    // {
    //     parentId: 859, //部门
    //     idx: 2,
    //     id: 2,
    // },
    // {
    //     parentId: 410, //编制状态 
    //     idx: 5,
    //     id: 2,
    // },
])

const getOption = async () => {
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
    iptWid: '1000px',
    rules: [{
        required: true,
        message: "请填写姓名",
        trigger: "change",
    },],
}])

//表单
const infoData = ref([{
    label: "离退类型",
    type: "select",
    prop: "retireType",
    value: "",
    iptWid: '400px',
    rules: [{
        required: true,
        // required: false,
        message: "请选择离退类型",
        trigger: "change",
    },],
    opt:[
      {  name:'暂未在本单位任职-借出到机关'},
      {  name:'暂未在本单位任职-借出到事业单位'},
      {  name:'暂未在本单位任职-进修'},
      {  name:'暂未在本单位任职-交流轮岗'},
      {  name:'暂未在本单位任职-企业实践'},
      {  name:'暂未在本单位任职-因公出国'},
      {  name:'暂未在本单位任职-离岗创业'},
      {  name:'暂未在本单位任职-待退休'},
      {  name:'暂未在本单位任职-待岗'},
      {  name:'暂未在本单位任职-下落不明'},
      {  name:'暂未在本单位任职-退休'},
      {  name:'暂未在本单位任职-离职'},
      {  name:'暂未在本单位任职-辞职'},
      {  name:'暂未在本单位任职-死亡'},
      {  name:'暂未在本单位任职-开除'},
      {  name:'暂未在本单位任职-其他'},
    ]
},

{
    label: "离退时间",
    type: "date-picker",
    prop: "timeOn",
    value: "",
    iptWid: '452px',
    rules: [{
        required: true,
        message: "请选择离退时间",
        trigger: "change",
    },],
    opt: []
},

{
    label: "离退原因",
    type: "input",
    prop: "why",
    value: "",
    iptWid: '1000px',
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

const transitionInfo = (val) => {
    if (!val) return ''
    let str = val[0]
    return str
}

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

const vail = ref(null)
const staffRef = ref(null)
const top_val = ref(null)
const fn = async () => {
    console.log(vail.value.fromOption);
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
    const variables = {
        teacherId: top_val.value.id, //对应的教师id
        retireTime: transitionJab(twoInfo.timeOn), //离退时间
        retireType: twoInfo.retireType, //离退类型
        cause: twoInfo.why, //离退原因

    }
    let FilList = []
    console.log('variables', variables);

    let res = await applySave({
        applyAnnexVOList: FilList,
        applyType: "RETIRE", //申请类型,可用值:ENTRY,RETIRE,TRANSFER,LOAN,SICK_LEAVE,MATERNITY_LEAVE,UPDATE
        targetId: top_val.value.id, //申请对象id
        targetName: "", //申请对象
        teacherName: oneInfo.name, //教职工名称
        variables: variables, //	自定义变量 
    })

    console.log(res);
    if (res.code != 0) {
        ElMessage.error(res.msg)
        return
    }
    ElMessage({
        message: '提交成功',
        type: 'success',
    })
    router.push('/backlogList');


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