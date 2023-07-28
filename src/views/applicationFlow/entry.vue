<template>
    <div class="entryBox">
        <LNav title="入职"></LNav>
        <!-- 基本信息 -->
        <div>
            <FormLy ref="vail" @select="select" :formData="formData"></FormLy>
        </div>
        <!-- 教职工信息 -->
        <div>
            <!--  -->
            <FormLy ref="staffRef" title="教职工信息" :formData="infoData">
                <div class="annex">
                    <el-form-item label="附件上传"> 
                    <el-upload v-model:file-list="fileList" class="upload-demo" action="#" multiple ref="upload"
                    :before-upload="beforeUpload"  :show-file-list="false"  :limit="1" :on-exceed="onExceed" 
                    :http-request="() => { }">
                  <el-button type="primary">文件上传</el-button>
                  </el-upload>
                  <div v-if="resolveList.name" class="flex al-center m-l1 resolveBox">
                    <el-icon  color="#999999"><Document /></el-icon> <span class="resolveName">{{resolveList.name}}</span>
                    <el-icon class="closeStyle" @click="beforeRemove" color="#999999"><Close /></el-icon>
                  </div>
                    </el-form-item>
                </div>
            </FormLy>
        </div>
        <!-- 操作 -->
        <div class="flex m-l4 m-t1">
            <el-button type="primary" size="large" @click="submit">提交</el-button>
            <el-button type="primary" size="large" plain @click="cancel">取消</el-button>
        </div>
    </div>
</template>
<script setup>
import { getSemester, queryDictByType } from "@/api/dsl.js";
import LNav from '../applicationFlow/components/LNav'
import FormLy from '../applicationFlow/components/Form-ly.vue'
import { uploadHandler } from '@/utils/filesUpload/qiniuUpload'//文件上传
import { genFileId } from 'element-plus'
import { Document,Close } from "@element-plus/icons";
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
    organizationTree,
    findRegion
} from '../../api/roster.js'
const router = useRouter()
const data = reactive({});
const transitionInfo = (val) => {
    if (!val) return ''
    let str = val[val.length - 1]
    return str
}
const fileList = ref([]) //上传文件列表
const resolveList = ref({}) //返回的文件
const beforeUpload = async(file) => { //上传的事件
    let res = await uploadHandler(file, {})
    console.log('res: ', res);
    resolveList.value = res
}
//删除
const beforeRemove = () => {
    resolveList.value = {}
}
//文件超出限制
const  upload = ref(null)
const onExceed = (files) => {
    upload.value.clearFiles()
  const file = files[0] 
  file.uid = genFileId()
  upload.value.handleStart(file)
  beforeUpload(file)
}

//标准时间转时间戳
const transitionJab = (val) => {
    const date = new Date(val) * 1
    return date

}

//  提交
const vail = ref(null)
const staffRef = ref(null)
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
        name: oneInfo.name, //姓名
        sex: transitionInfo(oneInfo.sex), //性别
        nation: transitionInfo(oneInfo.nation), //民族
        idType: transitionInfo(oneInfo.idType), //证件类型
        idNumber: oneInfo.idCard, //证件号码
        phone: oneInfo.phoneNumber, //手机号
        birthplaceProvince: oneInfo.region[0], //出生地省
        birthplaceCity: oneInfo.region[1], //出生地市
        birthplaceDistrict: oneInfo.region[2], //出生地区
        birthTime: transitionJab(oneInfo.birthday), //出生日期 
        address: oneInfo.detailedAddress, //详细地址
        workName: transitionInfo(twoInfo.workUnit), //工作单位
        workNameKey: obj[transitionInfo(twoInfo.workUnit)], //工作单位key
        affiliationWork: transitionInfo(twoInfo.group), //隶属集团
        affiliationWorkKey: obj[transitionInfo(twoInfo.group)], //隶属集团key
        organizationUnit: transitionInfo(twoInfo.unit), //编制单位(用工单位)
        organizationUnitKey: obj[transitionInfo(twoInfo.unit)],//编制单位Key
        authorizedStrengthState: transitionInfo(twoInfo.establishmentStatus), //编制状态
        jobCategory: transitionInfo(twoInfo.station), //岗位类别
        affiliationDepartment: transitionInfo(twoInfo.department), //所属部门
    }
        let FilList = [{
            file: resolveList.value.url,
            fileType: resolveList.value.fileType,
            serialNumber: "",
            fileName: resolveList.value.name,
        }]
     
    console.log(variables);
    // return
    let res = await applySave({
        applyAnnexVOList: FilList,
        applyType: "ENTRY", //申请类型,可用值:ENTRY,RETIRE,TRANSFER,LOAN,SICK_LEAVE,MATERNITY_LEAVE,UPDATE
        targetId: "", //申请对象id
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
    router.push('/backlogList')
}
// 表单验证

const optApi = ref([{
    parentId: 2, //性别
    idx: 1,
    id: 1,
},
{
    parentId: 6, //民族
    idx: 2,
    id: 1,
},
{
    parentId: 508, //证件类型
    idx: 3,
    id: 1,
},
{
    parentId: 855, //岗位
    idx: 1,
    id: 2,
},
{
    parentId: 859, //部门
    idx: 2,
    id: 2,
},
{
    parentId: 410, //编制状态 
    idx: 4,
    id: 2,
},
])

const getOption = async () => {
    getRegion()//获取省
    getOrganizationTree()//获取组织结构
    const resArr = await Promise.all(
        optApi.value.map(async (item) => {
            const res = await findDictionaries({
                parentId: item.parentId
            });
            return res.result;
        })
    );
    console.log(resArr);
    optApi.value.map((item, index) => {
        if (item.id == 1) {
            formData.value[item.idx].opt = resArr[index]
        }
        if (item.id == 2) {
            infoData.value[item.idx].opt = resArr[index]
        }
    })

    const { data } = await queryDictByType({ type: 'gender' });//性别
    if (data.code == 200) {
        let arr = data.data.dictValueList.map(s => {
            return {
                name: s.dictValue
            }
        });
        // console.log(formData.value, '000');
        arr = arr.filter(s => s.name != '其它');
        formData.value[1].opt = arr
        // educationAndTraining.value.children[idx].tableHeader[3].opt = appellation
    }
}
//选中的省
const select = (val, idx) => {
    getCity(val, idx)
}
// 获取市
const getCity = async (val, idx) => {
    let res = await findByPid({
        pid: val
    })
    if (res.code != 0) {
        ElMessage.error('请求超时,请稍后重新再试')
        return
    }
    formData.value[idx + 1].opt = res.result
}
//获取省
const getRegion = async () => {
    let res = await findRegion({ token: localStorage.getItem('dslToken'), })
    // console.log('获取省', res); 
    if (!res.result) return
    let region = res.result.province
    region.forEach(item => {
        item.children.forEach(child => {
            child.children.forEach(opt => {
                if (opt.children) {
                    delete opt.children
                }
            })
        })
    })
    formData.value[7].opt = region
}
//获取组织架构
const getOrganizationTree = async () => {
    let {
        result
    } = await organizationTree({
        idCard: '330602196710200015',
        token: localStorage.getItem('dslToken'),
        selectType: 1
    })
    if (!result) return
    console.log(result.list);
    valKey(result.list)
    infoData.value[0].opt = result.list
    infoData.value[3].opt = result.list
    infoData.value[5].opt = result.list
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
//手机号验证
const phoneNumberRegex = /^[1][3-9]\d{9}$/;
const validatePhoneNumber = (phoneNumber) => {
  return phoneNumberRegex.test(phoneNumber);
}
const  validatorPhone = (rule, value, callback) => {
 if(!value) {
    callback(new Error('请填写手机号码'));
 }else{
   if(!validatePhoneNumber(value)){
    callback(new Error('手机号码格式不正确'));
   }else{
    callback()
   }
 }
}

//身份证号校验
const validatorIdCard = (rule, value, callback) => {
    let idCardType = vail.value.fromOption.idType[0]
    console.log('start: ', idCardType);
    if (idCardType != undefined) {
        if (idCardType != '居民身份证' && idCardType != '户口簿')
            callback()
    }
    // 地区
    const aCity = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江",
        31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
        41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
        51: "四川", 52: "贵州", 53: "云南", 54: "西藏",
        61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
        71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
    };
    // 验证长度
    if (!/^\d{17}(\d|x)$/i.test(value)) {
        callback(new Error('身份证号长度或格式错误'));
        return;
    }

    // 验证前两位是否为省份代码
    value = value.replace(/x$/i, "a");
    if (aCity[parseInt(value.substr(0, 2))] == null) {
        callback(new Error('身份证号长度或格式错误'));
        return;
    }
    // 身份证上的出生年月校验
    var sBirthday = value.substr(6, 4) + "-" + Number(value.substr(10, 2)) + "-" + Number(value.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
        callback(new Error('证件号码格式不正确'));
        return;
    }
    // 身份证校验位判断
    var iSum = 0;
    for (var i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(value.charAt(17 - i), 11);
    }
    if (iSum % 11 != 1) {
        callback(new Error('证件号码格式不正确'));
        return;
    }
    // console.log('通过');
    idNoChange(value, idCardType)
    callback()
};

const idNoChange = (val, type) => {
    //获取出生日期
    if (val) {
        // console.log(val);
        let a = val.substring(6, 10) + "-" + val.substring(10, 12) + "-" + val.substring(12, 14);
        vail.value.fromOption.birthday = a
    }

    //获取性别
    if (parseInt(val.substr(16, 1)) % 2 === 1) {
        vail.value.fromOption.sex = ['男']
    } else {
        vail.value.fromOption.sex = ['女']
    }
    if (type != '户口簿') {
        vail.value.fromOption.idType = ['居民身份证']
    }
}

//表单
const formData = ref([{
    label: "姓名",
    type: "input",
    prop: "name",
    value: "",
    rules: [{
        required: true,
        message: "请填写姓名",
        trigger: "blur",
    },],
},
{
    label: "性别",
    type: "cascader",
    prop: "sex",
    value: "",
    rules: [{
        required: true,
        message: "请选择性别",
        trigger: "change",
    },],
    attrs: {
        placeholder: "",
    },
},
{
    label: "民族",
    type: "cascader",
    prop: "nation",
    value: "",
    rules: [{
        required: true,
        message: "请选择民族",
        trigger: "change",
    },],
    attrs: {
        placeholder: "",
    },
},
{
    label: "证件类型",
    type: "cascader",
    prop: "idType",
    value: "",
    rules: [{
        required: true,
        message: "请选择证件类型",
        trigger: "change",
    },],
    attrs: {
        placeholder: "",
    },
},
{
    label: "证件号码",
    type: "input",
    prop: "idCard",
    value: "",
    rules: [{
        required: true,
        validator: validatorIdCard,
        // message: "请填写证件号码",
        trigger: "blur",
    },],
    attrs: {
        placeholder: "",
    },
},
{
    label: "手机号",
    type: "input",
    prop: "phoneNumber",
    value: "",
    rules: [{
        required: true,
        validator: validatorPhone,
        trigger: "blur",
    },],
    attrs: {
        placeholder: "",
    },
},
// {
//     iptWid: "200px",
//     width: '10px',
//     label: "",
//     type: "select",
//     prop: "city",
//     value: "",
//     disabled: true,
//     rules: [{
//         required: true,
//         message: "请选择市",
//         trigger: "change",
//     }, ],
//     attrs: {
//         placeholder: "",
//     },
// },
// {
//     iptWid: "200px",
//     width: '10px',
//     label: "",
//     type: "select",
//     prop: "district",
//     value: "",
//     disabled: true,
//     rules: [{
//         required: true,
//         message: "请选择区",
//         trigger: "change",
//     }, ],
//     attrs: {
//         placeholder: "",
//     },
// },

{
    label: "生日",
    type: "date-picker",
    prop: "birthday",
    value: "",
    noIcon: true,
    rules: [{
        required: true,
        message: "请选择生日",
        trigger: "blur",
    },],
    attrs: {
        placeholder: "",
    },
},
{
    label: "出生地",
    type: "region",
    prop: "region",
    iptWid: "600px",
    value: "",
    rules: [{
        required: true,
        message: "请选择出生地",
        trigger: "change",
    },],
    attrs: {
        placeholder: "",
    },
},
{
    label: "详细地址",
    type: "input",
    prop: "detailedAddress",
    value: "",
    iptWid: '74%',
    rules: [{
        required: true,
        message: "请填写详细地址",
        trigger: "blur",
    },],
    attrs: {
        placeholder: "",
    },
},
])
const infoData = ref([{
    label: "工作单位",
    type: "cascader",
    prop: "workUnit",
    value: "",
    iptWid: '300px',
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
    iptWid: '300px',
    rules: [{
        required: true,
        message: "请选择岗位",
        trigger: "change",
    },],
},
{
    label: "部门",
    type: "cascader",
    prop: "department",
    value: "",
    iptWid: '300px',
    rules: [{
        required: true,
        message: "请选择部门",
        trigger: "change",
    },],
},
{
    label: "隶属集团",
    type: "cascader",
    prop: "group",
    title: 'title',
    iptWid: '300px',
    value: "",
    Any_layer: true,
    rules: [{
        required: false,
        message: "请选择隶属集团",
        trigger: "change",
    },],
},
{
    label: "编制状态",
    type: "cascader",
    prop: "establishmentStatus",
    value: "",
    rules: [{
        required: true,
        message: "请选择编制状态",
        trigger: "change",
    },],
    opt: []
},
{
    label: "编制单位(用工单位)",
    type: "cascader",
    prop: "unit",
    value: "",
    width: '184px',
    iptWid: '600px',
    title: 'title',
    Any_layer: true,
    rules: [{
        required: true,
        message: "请选择编制单位",
        trigger: "change",
    },],
},
])

//取消
const cancel = () => {
    router.back()
}

onMounted(() => {
    getOption()


});
</script>

<style lang="less" scoped>
.entryBox {
    padding: 20px;
}
.resolveBox{
    padding: 0 5px;
}
.closeStyle{
    display: none;
    cursor: pointer;
}
.resolveName{
    margin: 0 5px;
    max-width: 340px;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.resolveBox:hover{
    background: rgb(245,247,250);
    .closeStyle{
    display: block;
}
}
.annex{
    margin-left: 28px;
}
</style>