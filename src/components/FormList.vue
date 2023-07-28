<script setup>
import { uploadHandler } from '@/utils/filesUpload/qiniuUpload'//文件上传
import { ref, reactive, onMounted } from 'vue'
import { addUserOpenClass, editUserOpenClass } from "@/api/openClass.js"; //公开课
import { ElMessage } from 'element-plus'
import lodash from 'lodash';
import { genFileId } from 'element-plus'
onMounted(() => {
    // SelectType()
})
const emit = defineEmits(['isHead', 'changeFist', 'newly', 'getdiscipline'])
const props = defineProps({
    //子组件接收父组件传递过来的值
    //是否展示表单
    //表单的标题
    title: {
        type: String
    },
    //表格标题内容及表头
    tableData: {
        type: Array,
        default: () => [],
    },
    // 表头
    formHeader: {
        type: Array,
        default: () => [],
    },
    //点击哪一个新增表单索引
    formIndex: {
        type: Number,
        // required: true
    },
    //判断是编辑还是新增
    dialogType: {
        type: String,
        // required: true
    },
    //编辑数据
    content: {
        type: Object,
        // required: true
    },
    //判断编辑
    dialogTypes: {
        type: Boolean,
        // required: true
    },
    Myform: {
        type: Array,
        // required: true
    },
    titles: {
        type: String,
        // required: true
    },
})

const tableForm = reactive({
    newObj: {},
    applyInfoList: ["course",]
})
//验证规则数据处理
const fromOptions = ref({})
const rulesOpts = ref({})
const setValue = () => {
    let option = {};
    let rules = {};
    props.formHeader.map((item) => {
        rules[item.prop2] = item.rules;
        if (item.type == 'select3') {
            option[item.prop] = item.value;
            option[item.prop1] = item.value;
            option[item.prop2] = item.value;
        } else if (item.type == 'select2') {
            option[item.prop] = item.value;
            option[item.prop2] = item.value;
        }
        option[item.prop2] = item.value;
    });
    fromOptions.value = lodash.cloneDeep(option);
    rulesOpts.value = lodash.cloneDeep(rules);
}
watch(() => props.formHeader, () => {
    // console.log(props.formHeader, 'formHeader');
    setValue();
}, {
    immediate: true,
})
watch(() => props.dialogType, (newValue, oldValue) => {
    // console.log('侦听的数据发生变化时执行', newValue, oldValue);
    if (newValue === "edit") {
        fromOptions.value = lodash.cloneDeep(props.content)
    } else {
        fileList.value = []
        fromOptions.value = {}
    }
}, { deep: true });
watch(() => props.content, () => {
    if (props.dialogType == 'edit') {
        fromOptions.value = lodash.cloneDeep(props.content)
        if (fromOptions.value.attachmentName) {
            let arr = [
                {
                    name: fromOptions.value.attachmentName,
                    url: fromOptions.value.attachment,
                }
            ]
            fileList.value = arr
        } else {
            fileList.value = []
        }
        if (props.formIndex == 0 && props.titles == '学习经历') {
            clickOption(fromOptions.value.major, '专业名称')
        }
        //赋值
        props.Myform[props.formIndex].tableHeader.forEach(item => {
            const key = item.prop2;
            if (key in fromOptions.value) {
                item.value = fromOptions.value[key];
            }
        });
        // console.log('props.Myform[props.formIndex].tableHeader: ',  props.Myform[props.formIndex].tableHeader);
    } else {
        fromOptions.value = {}
    }
}, { deep: true });

const CancelBtn = () => {
    console.log("取消");
    dialogFormVisible.value = false;
}
//新增或者编辑 确定
const formRef = ref(null)
const ConfirmBtn = async () => {
    //编辑
    let oneVerify = await formRef.value.validate((valid, fields) => {
        if (valid) {
            return true
        } else {
            return false
        }
    })
    if (!oneVerify) return
    if (props.dialogType == 'edit') {
        compile()
    }
    else {// 新增
        newly()
    }

}
// 新增
const newly = () => {
    if (JSON.stringify(resolveList.value) != '{}') {
        fromOptions.value.attachment = resolveList.value.url
        fromOptions.value.attachmentName = resolveList.value.name
    }
    emit('newly', fromOptions.value, props.formIndex)
    dialogFormVisible.value = false;
}

// 编辑
const compile = () => {
    console.log(fromOptions.value, "绑定的值");
    // for (let [key, value] of Object.entries(props.content)) {
    // console.log(key, value, "绑定的值222");
    for (let key in props.content) {
        if (transTime(props.content[key]) != transTime(fromOptions.value[key])) {
            tableForm.newObj[key] = fromOptions.value[key]
            props.content[key] = fromOptions.value[key]
            props.content.newId = true
        } else {
            // console.log('无修改');
        }
    }
    dialogFormVisible.value = false;
    let info = {
        id: props.content.id,
        targetId: props.content.teacherId
    }
    emit('isHead', info, tableForm.newObj, props.formIndex,)

}

const transTime = (val) => {
    if (isCustomTimeFormat(val)) {
        return val + ''
    } else {
        return val
    }
}
function isCustomTimeFormat(timeString) {
    const regex = /^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(.+\)$/;
    const isValidFormat = regex.test(timeString);
    return isValidFormat;
}

//一个下拉框选择哪一项
let initMsg = null
const clickOption = (item, title) => {
   
    console.log(item, title,fromOptions.value, "单选框选择哪一项");
    // console.log(rulesOpts.value);
    if (title == '专业名称' && props.titles == '学习经历') {
        if (item == '无') {
            // rulesOpts.value.elseMajor[0].message= '请输入其他专业'
            rulesOpts.value.elseMajor[0].required = true
            props.formHeader[8].isDisable = false
        } else {
            formRef.value.clearValidate('elseMajor', () => null)
            // rulesOpts.value.elseMajor[0].message = ''
            rulesOpts.value.elseMajor[0].required = false
            // console.log('rulesOpts.value.elseMajor[0]: ', rulesOpts.value.elseMajor);
            props.formHeader[8].isDisable = true
            fromOptions.value.elseMajor = ''
        }
    }

    if (props.titles == '资格证' && title == '认证学段') {
        emit('getdiscipline', item);
        // console.log(item ,initMsg,'===================');
        if( item != initMsg){
            fromOptions.value.authenticationSubject=''
            initMsg=item
        }
    }

}


//增加选择
const addition = (item) => {
    console.log('item: ', item);
    let arr = {
        prop2: "grade",
        value1: "",
        value2: "",
    }
    item.push(arr)
}

//两级选项第一级
const changeFist = (item, index) => {
    fromOptions.value[index.prop2] = ''
    index.isDisable = false
    emit('changeFist', item.id)
}
const dialogFormVisible = ref(false)
defineExpose({
    upLose() {
        dialogFormVisible.value = true
        if (props.dialogType != 'edit') {
            fromOptions.value = {}
        }

    },
    clear() {
        fromOptions.value = {}
    }
})

const getnum = (a, index) => {
    props.Myform[props.formIndex].tableHeader[index].value = a;
}
let Table_Arr = {
    '13': 'studentNumber',
    '21': 'supportEducationStart',
    '22': 'supportEducationEnd',
}
//学习经历
let StudyExperience_Arr = {
    '00': 'entranceTime',
    '01': 'graduateTime',
    '013': 'awardTime',
    '17': 'trainStart',
    '18': 'trainEnd',
    '11': 'trainingYear',
    '15': 'period',
    '16': 'credit',
    '20': 'cultivateYear',
    '21': 'startTime',
    '22': 'endTime',
}
//工作经历
let WorkExperience_Arr = {
    '01': 'officeStart',
    '02': 'officeEnd',
    '08': 'teacherAgeLimit',
    '11': 'startTime',
    '12': 'endTime',
}
//岗位聘任信息
let PositionRecruitment_Arr = {
    '02': 'hireTime',
    '08': 'officeStart',
    '11': 'engageStart',
    '12': 'engageEnd',
    '42': 'startTime',
    '43': 'endTime',
}
//考核信息
let AssessmentInformation_Arr = {
    '00': 'assessmentTime',
    '03': 'confirmationDate',
}
//资格证
let Certification_Arr = {
    '04': 'firstRegisterTime',
    '05': 'regularRegisterTime',
    '07': 'issuingCertificatesTime',
    '11': 'releaseDate',
    '20': 'trainStartTime',
    '21': 'trainEndTime',
    '34': 'getCertificateUnit',
    '41': 'getCertificateTime',
    '51': 'issueTime',
    '62': 'ratifyTime',
    '65': 'receptionTime',
    '73': 'ratifyTime',
    '74': 'inDateTime',
    '82': 'releaseTime',
}
//研究成果
let ScientificPayoffs_Arr = {
    '05': 'startTime',
    '06': 'endTime',
    '31': 'getAwardTime',
    '41': 'getHonorTime',
    '51': 'getAwardTime',
    '62': 'signatureTime',
    '71': 'talentProjectTime',
    '83': 'publicationTime',
    '96': 'publishTime',
    '916': 'getAwardTime',
    '103': 'accomplishTime',
    '113': 'ratifyTime',
    '122': 'reportTime',
}
//师德信息
let TeacherEthics_Arr = {
    '00': 'teacherMeritAssessTime',
    '04': 'honorHappenTime',
    '12': 'notificationTime',
}

watch(() => props.Myform, () => {
    let arr = props.Myform
    for (let i = 0; i < props.Myform.length; i++) {
        for (let s = 0; s < arr[i].tableHeader.length; s++) {
            if (arr[i].tableHeader[s].value == 'blank') {
                // console.log('props.titles: ', props.titles);
                if (props.titles == '学习经历') {
                    fromOptions.value[StudyExperience_Arr[i + '' + s]] = ''
                }
                if (props.titles == '工作经历') {
                    fromOptions.value[WorkExperience_Arr[i + '' + s]] = ''
                }
                if (props.titles == '岗位聘任信息') {
                    fromOptions.value[PositionRecruitment_Arr[i + '' + s]] = ''
                }
                if (props.titles == '考核信息') {
                    fromOptions.value[AssessmentInformation_Arr[i + '' + s]] = ''
                }
                if (props.titles == '资格证') {
                    fromOptions.value[Certification_Arr[i + '' + s]] = ''
                }
                if (props.titles == '教学科研成果及获奖') {
                    fromOptions.value[ScientificPayoffs_Arr[i + '' + s]] = ''
                }
                if (props.titles == '师德信息') {
                    fromOptions.value[TeacherEthics_Arr[i + '' + s]] = ''
                }
                if (props.titles == '教育教学') {
                    fromOptions.value[Table_Arr[i + '' + s]] = null
                }
            }
        }
    }
}, { deep: true });
const fileList = ref([]) //上传文件列表
const resolveList = ref({}) //返回的文件
const beforeUpload = async (file) => { //上传的事件
    let res = await uploadHandler(file, {})
    console.log('文件: ', res);
    if (props.dialogType == 'edit') {
        fromOptions.value.attachment = res.url
        fromOptions.value.attachmentName = res.name
    } else {
        resolveList.value = res
    }

}
//删除
const beforeRemove = () => {
    fromOptions.value.attachment = ""
    fromOptions.value.attachmentName = ""
    resolveList.value = {}
}
//文件超出限制
const uploads = ref(null)
const onExceed = (files) => {
    uploads.value[0].clearFiles()
    const file = files[0]
    file.uid = genFileId()
    uploads.value[0].handleStart(file)
    beforeUpload(file)
}


const open = () =>{
    console.log('打开',fromOptions.value.authenticationStudying);
    if(fromOptions.value.authenticationStudying){
        emit('getdiscipline', fromOptions.value.authenticationStudying)
    }
    initMsg=fromOptions.value.authenticationStudying
}
</script>
<template>
    <div>
        <el-dialog destroy-on-close v-model="dialogFormVisible" :title="title"  @open="open">
            <div class="dialogBox">
                <el-form :model="fromOptions" ref="formRef" :rules="rulesOpts" label-position="right"
                    :validate-on-rule-change="false">
                    <el-form-item v-for="(item, index) in formHeader" :key="index" :label="item.label"
                        :label-width="item.width" :prop="item.prop2">
                        <template v-if="item.type === 'upload'">
                            <el-upload v-model:file-list="fileList" ref="uploads" class="upload-demo" action="#" multiple
                                :before-upload="beforeUpload" :limit="1" :on-exceed="onExceed" :before-remove="beforeRemove"
                                :http-request="() => { }">
                                <el-button type="primary">文件上传</el-button>
                            </el-upload>
                        </template>
                        <template v-if="item.type === 'input'">
                            <el-input v-model="fromOptions[item.prop2]" :disabled="item.isDisable"></el-input>
                        </template>
                        <template v-if="item.type === 'dateYear'">
                            <el-date-picker :clearable="false" @change="getnum(fromOptions[item.prop2], index)"
                                v-model="fromOptions[item.prop2]" type="year" :disabled="item.isDisable"
                                :editable="false" />
                        </template>
                        <template v-if="item.type === 'dateMonth'">
                            <el-date-picker :clearable="false" @change="getnum(fromOptions[item.prop2], index)"
                                v-model="fromOptions[item.prop2]" type="month" :disabled="item.isDisable"
                                :editable="false" />
                        </template>
                        <template v-if="item.type === 'date'">
                            <el-date-picker :clearable="false" @change="getnum(fromOptions[item.prop2], index)"
                                v-model="fromOptions[item.prop2]" type="date" :disabled="item.isDisable"
                                :editable="false" />
                        </template>
                        <template v-if="item.type === 'number'">
                            <el-input-number @change="getnum(fromOptions[item.prop2], index)"
                                v-model="fromOptions[item.prop2]" :disabled="item.isDisable" />
                        </template>
                        <template v-if="item.type === 'organization'">
                            <el-cascader v-model="fromOptions[item.prop2]" :options="item.opt"
                                :props="{ label: 'title', value: 'title', checkStrictly: true, }"
                                :show-all-levels="false" />
                        </template>
                        <template v-if="item.type === 'select'">
                            <el-select v-model="fromOptions[item.prop2]" :disabled="item.isDisable">
                                <el-option v-for="(item2, index2) in item.opt"
                                    @click="clickOption(item2.name, item.label, index)" :label="item2.name"
                                    :value="item2.name" :key="item2.id" />
                            </el-select>
                        </template>
                        <template v-if="item.type === 'select2'">
                            <el-select v-model="fromOptions[item.prop1]">
                                <el-option v-for="(item2, index2) in item.opt" @click="changeFist(item2, item)"
                                    :label="item2.name" :value="item2.id" :key="item2.id" />
                            </el-select>
                            <el-select v-model="fromOptions[item.prop2]" :disabled="item.isDisable" class="selectMiddle">
                                <el-option v-for="(item3, index3) in item.opt2" :label="item3.name" :value="item3.name"
                                    :key="item3.name" />
                            </el-select>
                        </template>
                        <template v-if="item.type === 'addFunction'">
                            <div class="addFunction flex">
                                <div class="flex-d">
                                    <div v-for="opt in  item.addPush" :key="opt.id">
                                        <el-select v-model="opt.value1">
                                            <el-option v-for="(item2, index2) in opt.opt" @click="changeOpt(item2, item)"
                                                :label="item2.name" :value="item2.id" :key="item2.id" />
                                        </el-select>
                                        <el-select v-model="opt.value2">
                                            <el-option v-for="(item2, index2) in opt.opt" @click="changeOpt(item2, item)"
                                                :label="item2.name" :value="item2.id" :key="item2.id" />
                                        </el-select>
                                    </div>
                                </div>
                                <el-button class="m-l2" @click="addition(item.addPush)" type="primary">添加</el-button>
                            </div>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="CancelBtn">取消</el-button>
                    <el-button type="primary" @click="ConfirmBtn">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang='less' scoped>
/* 修改对话框高度 */
/* :deep(.el-dialog) {
    height: 70vh;
    overflow: hidden;
    overflow-y: auto;
} */
:deep(.el-upload-list__item-file-name) {
    min-width: 130px;
    text-align: left;
}

.addFunction {
    width: 70%;
}

.dialogBox {
    max-height: 60vh;
    overflow: auto;
}

/* .dialogBox::-webkit-scrollbar {
    width: 4px;
  }

  .dialogBox::-webkit-scrollbar-thumb {
    background-color: #d1e1ff;
    border-radius: 2px;
  } */</style>