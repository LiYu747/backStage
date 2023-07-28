<script setup>
import { ElMessage } from 'element-plus'
import { baseInfoList } from "@/utils/enum"
import { ref, reactive, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { editUserPersonalInfo } from "@/api/personal.js";//用户基本信息之个人信息
import { UserApplyInfo } from "@/api/applyApi.js";//报送
import lodash from 'lodash';
import { queryAreaFindByPid, queryUserParentId } from "@/api/dict.js";//用户字典信息查
import { personalInformationStore } from "@/store/personalInformation.js";//基本信息之个人信息
import { transitionDate, transitionJab, transitionChinaDate, transitionDateMonth, transitionDateYear } from "@/utils/handleData/handleData.js";//使用封装函数
import { uploadHandler } from '@/utils/filesUpload/qiniuUpload'//照片上传
const { personalInfo, applyId, userInfo, newUserInfo } = storeToRefs(personalInformationStore())
const { setUserInfo, setNewUserInfo } = personalInformationStore()
onMounted(() => {
    // getSelectParentIdInfo()

    baseInfoList[0].children.map(item => {
        item.showHeader.map(child => {
            child.newId = false
        })
    })
})
const fileList = ref([])//照片上传
const formRef = ref(null)
const props = defineProps({
    //子组件接收父组件传递过来的值
    //表单的标题
    title: {
        type: String
    },
    // 表头
    showFormHeader: {
        type: Array,
        default: () => [],
    },
    // 哪一个表单索引
    formIndex: {
        type: Number,
        // required: true
    },
    //子组件接收父组件传递过来的组织结构key,val形式
    unitobj: {
        type: Object
    },
    //教师id
    userTeacherId: {
        type: Number
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
//验证规则数据处理
const fromOption = ref({})
const rulesOpt = ref({})
const setValue = () => {
    let option = {};
    let rules = {};
    props.showFormHeader.map((item) => {
        rules[item.prop2] = item.rules;
        if (item.type == 'select3') {
            //select3:地区
            // option[item.prop]=getRegion()
            option[item.prop] = [item.province1, item.province2, item.province3];
            // option[item.prop1] = item.province2;
            option[item.prop2] = item.value;//获取接口定义数据
            // 
            option[item.prop3] = item.province3;
        } else if (item.type == 'select2') {
            option[item.prop] = item.value;
            option[item.prop2] = item.value;
        }
        option[item.prop2] = item.value;
    });
    fromOption.value = lodash.cloneDeep(option);
    rulesOpt.value = lodash.cloneDeep(rules);
    // fromOption.value = JSON.parse(JSON.stringify(option));
    // // rulesOpt.value = JSON.parse(JSON.stringify(rules));
    // rulesOpt.value = rules;
    // console.log('rulesOpt.value: ', rulesOpt.value);
}


watch(() => props.showFormHeader, () => {
    setValue();
}, {
    immediate: true,
})
const formListData = reactive({
    newObj: {},
    cities: [],//城市
    area: [],//地区
    secondData: [],//二级目录
    applyInfoList: ["nativePlace", "birthPlace",],//多个下拉框定义不需要传给后端的key值
    sData: [],//单个下拉框
    timeData: ["joinTime", "birthTime", "teachTime", "joinWorkTime", "contractStartTime", "contractEndTime",],//时间的名字
    applyInfo: ["staff", "authorizedStrength", "inAuthorizedStrength", "notAuthorizedStrength", "elseMessage",],//报送的targetName
    disabledCity: false,
    disabledArea: false,
})

//弹出弹出前赋值
const open = () => {
    // console.log('formIndex.value: ', props.unitobj);
    const array = JSON.parse(JSON.stringify(props.showFormHeader));
    console.log('array: ', array);
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        // 
        for (let key of Object.keys(fromOption.value)) {
            if (item.prop == key) {
                fromOption.value[key] = item.province1 //省份
            } else if (item.prop2 == key) {
                fromOption.value[key] = item.value //绑定
            } else if (item.prop1 == key) {
                fromOption.value[key] = item.province2 //城市
                // 
            } else if (item.prop3 == key) {
                fromOption.value[key] = item.province3 //区县
            }
        }

    }
    if (props.formIndex == 0) {
        fromOption.value.birthPlaceArr = array[6].birthPlaceArr
        fromOption.value.nativePlaceArr = array[16].nativePlaceArr
        // console.log('fromOption.value: ', fromOption.value);
    }
    //在编信息
    if (props.formIndex == 2) {
        fromOption.value.teacherSource = array[0].value
        fromOption.value.teacherSourceSupplement = array[0].value2
        // console.log(fromOption.value);
    }
    //非编信息
    if (props.formIndex == 3) {
        console.log('array[7].value', array[7].value, transitionJab(array[7].value));
        props.Myform[props.formIndex].showHeader[6].value_other = transitionJab(array[6].value);
        props.Myform[props.formIndex].showHeader[7].value_other = transitionJab(array[7].value);
    }



}
//表单取消
const CancelBtn = () => {
    // 
    dialogFormVisible.value = false;
}
//表单确定
const ConfirmBtn = async (formEl) => {
    // 
    let oneVerify = await formRef.value.validate((valid, fields) => {
        console.log('valid: ', valid);
        if (valid) {
            return true
        } else {
            return false
        }
    });
    if(!oneVerify){
        ElMessage({
            message: '请完善表单信息',
            type: 'warning',
        })
        return
      }
    // if (!oneVerify) return;
    // console.log(fromOption.value);
    const array = props.showFormHeader
    for (let [key, value] of Object.entries(fromOption.value)) {
        for (let index = 0; index < array.length; index++) {
            const item = array[index];
            //item.type == "input"  !item.opt && !item.time
            if (item.type == "input") {
                //是输入框
                if (item.prop2 == key) {
                    if (item.value != value) {
                        formListData.newObj[key] = value;
                        item.value = formListData.newObj[key]
                        item.newId = true
                    }
                }
                //item.type == "select3"  item.opt && !item.time
            } else if (item.type == "upload") {
                //是上传照片
                if (item.prop2 == key) {
                    if (item.value != value) {
                        formListData.newObj[key] = value;
                        item.value = formListData.newObj[key]
                        item.newId = true
                    }
                }
            } else if (item.type == "select") {
                //单个选择框
                if (item.prop2 == key) {
                    if (item.value != value) {
                        formListData.newObj[key] = value;
                        item.value = formListData.newObj[key]
                        item.newId = true
                    }
                }
            } else if (item.type == "select3") {
                //省市区
                // 出生地
                if (item.propArr == 'birthPlaceArr') {

                    if (item.value != fromOption.value.birthPlaceArr.join("")) {
                        // 
                        formListData.newObj.birthPlaceArr = fromOption.value.birthPlaceArr.join("")
                        formListData.newObj.birthplaceProvince = fromOption.value.birthPlaceArr[0]
                        formListData.newObj.birthplaceCity = fromOption.value.birthPlaceArr[1]
                        formListData.newObj.birthplaceDistrict = fromOption.value.birthPlaceArr[2]
                        item.value = formListData.newObj.birthPlaceArr
                        item.birthPlaceArr = fromOption.value.birthPlaceArr
                        props.showFormHeader[6].birthPlaceArr = fromOption.value.birthPlaceArr
                        item.newId = true
                    }
                }
                //籍贯
                if (item.propArr == 'nativePlaceArr') {

                    if (item.value != fromOption.value.nativePlaceArr.join("")) {
                        formListData.newObj.nativePlaceArr = fromOption.value.nativePlaceArr.join("")

                        formListData.newObj.nativePlaceProvince = fromOption.value.nativePlaceArr[0]
                        formListData.newObj.nativePlaceCity = fromOption.value.nativePlaceArr[1]
                        formListData.newObj.nativePlaceDistrict = fromOption.value.nativePlaceArr[2]

                        item.value = formListData.newObj.nativePlaceArr
                        item.nativePlaceArr = fromOption.value.nativePlaceArr
                        props.showFormHeader[16].nativePlaceArr = fromOption.value.nativePlaceArr
                        item.newId = true
                    }
                }
                if (item.prop == key) {
                    if (item.province1 != value) {
                        formListData.newObj[key] = value;
                    } //省份
                } else if (item.prop1 == key) {
                    if (item.province2 != value) {
                        formListData.newObj[key] = value;
                    }//城市
                } else if (item.prop3 == key) {
                    if (item.province3 != value) {
                        formListData.newObj[key] = value;
                    }//地区
                } else if (item.prop2 == key) {
                    // 
                    if (item.value != value) {
                        formListData.newObj[key] = value;
                        item.value = formListData.newObj[key]
                        item.newId = true
                    } //自定义绑定
                }
                //item.type == "date" !item.opt && item.time
            } else if (item.type == "date") {
                //是年月日
                if (item.prop2 == key) {

                    if ((item.value == '' ? item.value : transitionJab(item.value)) != (value == '' ? value : transitionJab(value))) {
                        formListData.newObj[key] = transitionJab(value);
                        item.value = transitionChinaDate(formListData.newObj[key])
                        item.newId = true
                    }
                }
                //item.type == "select4"  
            } else if (item.type == "select4") {
                //级联选择框
                if (item.prop2 == key) {
                    if (item.value != value) {
                        formListData.newObj[key] = value[value.length - 1];
                        item.value = formListData.newObj[key]
                        item.newId = true
                    }
                }

            } else if (item.type == "dateMonth") {
                //是年月
                if (item.prop2 == key) {
                    if ((item.value == '' ? item.value : transitionJab(item.value)) != (value == '' ? value : transitionJab(value))) {
                        formListData.newObj[key] = transitionJab(value);
                        item.value = transitionDateMonth(formListData.newObj[key])
                        item.newId = true
                    }
                }
                // 
            } else if (item.type == "dateYear") {
                //是年
                if (item.prop2 == key) {
                    if (transitionJab(item.value) != transitionJab(value)) {
                        formListData.newObj[key] = transitionJab(value);
                        item.value = transitionDateYear(formListData.newObj[key])
                        item.newId = true
                    }
                }
            } else if (item.type == "select2") {
                if (item.prop == key) {
                    console.log('item.prop == key: ', item.value, value);
                    if (item.value2 != value) {
                        console.log(item.value, value, fromOption.value);
                        formListData.newObj[key] = value;
                        item.value2 = formListData.newObj[key]
                        item.newId = true
                    }
                }
                if (item.prop2 == key) {
                    // console.log('item.prop == key: ', item.prop2, key);
                    if (item.value != value) {
                        formListData.newObj[key] = value;
                        item.value = formListData.newObj[key]
                        item.newId = true
                    }

                }
            }
        }
    }
    //删除自定义的数据
    formListData.applyInfoList.forEach((item) => {
        delete formListData.newObj[item]
    })

    // return
    //判断是否修改
    console.log('JSON.stringify(formListData.newObj)', JSON.stringify(formListData.newObj));
    if (JSON.stringify(formListData.newObj) == "{}") {
        // ElMessage({
        //     showClose: true,
        //     message: '未作任何修改',
        //     type: 'warning',
        // })
        dialogFormVisible.value = false;

        return
    } else {
        setUserInfo(formListData.newObj)
        ElMessage({
            message: '修改成功,请点击报送按钮',
            type: 'success',
        })
        dialogFormVisible.value = false;
        // formListData.newObj = {}
    }
    // formListData.sData = []//重新给数组赋值
}

//基本信息
let Show_Arr = {
    '36': 'contractStartTime',
    '37': 'contractEndTime',
}

watch(() => props.Myform, () => {
    let arr = props.Myform
    for (let i = 0; i < props.Myform.length; i++) {
        for (let s = 0; s < arr[i].showHeader.length; s++) {
            if (arr[i].showHeader[s].value_other == 'blank') {
                // console.log('props.titles: ', props.titles);
                if (props.titles == '基本信息') {
                    fromOption.value[Show_Arr[i + '' + s]] = ''
                }
            }
        }
    }
}, { deep: true });


//自动填入的数据
const automatic = (a, b, index) => {
    if (props.formIndex == 0) {
        // console.log('a,b: ', a, b);
        let today = new Date();
        let num;
        if (today) {
            num = today.getFullYear() - b.getFullYear();
        }
        if (a == '出生日期') {
            fromOption.value.age = num
        } else if (a == '从教开始时间') {
            fromOption.value.teachAge = num
        }
    }

    if (props.formIndex == 3) {
        props.Myform[props.formIndex].showHeader[index].value_other = transitionJab(b);
    }
}






//报送
const sendUserApplyInfo = async () => {
    console.log(formListData.timeData);

    for (let i = 0; i < formListData.timeData.length; i++) {
        const item = formListData.timeData[i];
        // 
        for (let [key, value] of Object.entries(formListData.newObj)) {
            // 
            if (item == key) {
                formListData.newObj[key] = transitionJab(value)
                // 
            }
        }
    }
    console.log('props.formIndex: ', props.formIndex);

    if (props.formIndex == 0) {
        //处理出生地和籍贯数据
        delete formListData.newObj.birthPlaceArr
        delete formListData.newObj.nativePlaceArr
    }
    if (props.formIndex == 1) {
        //编制单位(用工单位)传递key
        if (formListData.newObj.organizationUnitKey) {
            formListData.newObj.organizationUnitKey = props.unitobj[formListData.newObj.organizationUnit].key;
        }
        if (formListData.newObj.affiliationWorkKey) {
            formListData.newObj.affiliationWorkKey = props.unitobj[formListData.newObj.affiliationWork].key;
        }

    }
    formListData.newObj.teacherId = props.userTeacherId//新增必传教师id
    console.log('formListData.newObj: ', formListData.newObj, Object.keys(formListData.newObj).length);
    if (Object.keys(formListData.newObj).length <= 1) {
        ElMessage({
            message: '请先编辑报送信息',
            type: 'warning',
        })
        return
    }

    const applyInfoData = reactive({
        applyType: "UPDATE",//必传
        teacherId: props.userTeacherId,//必传
        // targetId: applyId.value[props.formIndex].id,//新增不传，编辑传当前对象id
        targetName: formListData.applyInfo[props.formIndex],
        teacherName: personalInfo.value,
        variables: formListData.newObj,
    })
    if (applyId.value[props.formIndex].id != null) {
        applyInfoData.targetId = applyId.value[props.formIndex].id;//新增不传，编辑传当前对象id
    }
    //
    console.log('applyInfoData: ', applyInfoData,);
    // return
    const { code, msg, result } = ({} = await UserApplyInfo({
        ...applyInfoData
    }))
    console.log(code, msg, result);
    if (code == 0) {
        ElMessage({
            message: '报送成功,请耐心等待',
            type: 'success',
        })
        console.log("报送成功");
        formListData.newObj = {}
    }


}
// //照片上传




//二级目录选择框
const changeFist = (e, idxs) => {

    getSecondSelect(e, idxs)
}
//根据父id查询二级目录(在编信息教职工来源("录用","军队转业、复员","调入"))
const getSecondSelect = async (e, is) => {
    // console.log('e, is: ', e, is);
    const { code, msg, result } = ({} = await queryUserParentId({ parentId: e }))
    if (code === 0 && result) {
        formListData.secondData = result
        baseInfoList[0].children[2].showHeader[is].opt2 = formListData.secondData
        fromOption.value.teacherSourceSupplement = ''
    }

}

// 一个下拉框选择哪一项
const clickOption = (item, index) => {
    // baseInfoList[0].children[0].showHeader[index].sName = item
    // formListData.sData.push(baseInfoList[0].children[0].showHeader[index].sName)
    // 
}

const dialogVisible = ref(false)
//照片上传
const beforeUpload = async (item) => {
    console.log('item: ', item);
    let res = await uploadHandler(item, {})
    console.log('res: ', res);
    fromOption.value.headImg = res.url
    console.log('fromOption.value: ', fromOption.value);

}
const dialogFormVisible = ref(false)
defineExpose({
    upLose() {
        dialogFormVisible.value = true
    }, sendUserApplyInfo
})

const del_img = () => {
    fromOption.value.headImg = ''
    console.log('fromOption.value: ', fromOption.value);
}


</script>


<template>
    <div>
        <el-dialog v-model="dialogFormVisible" :title="title" class="showAll_dialog" @open="open">
           <div class="dialogBox">
            <el-form  :validate-on-rule-change="false" :model="fromOption" ref="formRef" :rules="rulesOpt" label-position="right">
                <el-form-item v-for="(item, index) in showFormHeader" :key="index" :label="item.label"
                    :required="item.isMust" :prop="item.prop2" :label-width="item.width">
                    <template v-if="item.type === 'input'">
                        <el-input v-model="fromOption[item.prop2]" :disabled="item.isDisable"
                            :placeholder="`请输入${item.label}`"></el-input>
                    </template>
                    <template v-if="item.type === 'dateYear'">
                        <el-date-picker v-model="fromOption[item.prop2]" type="year" :disabled="item.isDisable"
                            :placeholder="`请选择${item.label}`" :editable="false"/>
                    </template>
                    <template v-if="item.type === 'dateMonth'">
                        <el-date-picker v-model="fromOption[item.prop2]" type="month" :disabled="item.isDisable"
                            :placeholder="`请选择${item.label}`" :editable="false"/>
                    </template>
                    <template v-if="item.type === 'date'"><!-- 日期选择 -->
                        <el-date-picker v-model="fromOption[item.prop2]" type="date" :disabled="item.isDisable"
                            :placeholder="`请选择${item.label}`" :clearable="false"
                            @change="automatic(item.label, fromOption[item.prop2], index)" :editable="false"/>
                    </template>
                    <template v-if="item.type === 'number'">
                        <el-input-number v-model="fromOption[item.prop2]" :min="0" :disabled="item.isDisable"
                            :placeholder="`请选择${item.label}`" />
                    </template>
                    <template v-if="item.type === 'select'">
                        <el-select v-model="fromOption[item.prop2]" :disabled="item.isDisable"
                            :placeholder="`请选择`">
                            <el-option v-for="(item2, index2) in item.opt" @click="clickOption(item2, index)"
                                :label="item2.name" :value="item2.name" :key="item2.id" />
                        </el-select>
                    </template>
                    <template v-if="item.type === 'select2'">
                        <el-select v-model="fromOption[item.prop2]" :disabled="item.isDisable">
                            <el-option @click="changeFist(item2.id, index)" v-for="(item2, index2) in item.opt"
                                :label="item2.name" :value="item2.name" :key="item2.id" />
                        </el-select>
                        <el-select v-if="item.opt2.length != 0" v-model="fromOption[item.prop]" class="selectMiddle">
                            <el-option v-for="(item3, index3) in item.opt2" :label="item3.name" :value="item3.name"
                                :key="item3.name" />
                        </el-select>
                    </template>
                    <!-- 地区 -->
                    <template v-if="item.type === 'select3'">
                        <el-cascader v-model="fromOption[item.propArr]" :options="item.opt"
                            :props="{ label: 'name', value: 'name' }" :show-all-levels="false" />
                    </template>
                    <template v-if="item.type === 'select4'">
                        <el-cascader v-model="fromOption[item.prop2]" :options="item.opt"
                            :props="{ label: 'title', value: 'title', checkStrictly: item.Any_layer, }"
                            :show-all-levels="false" />
                    </template>
                    <template v-if="item.type === 'upload'">
                        <div class="img" v-if="fromOption[item.prop2]">
                            <el-image style="width: 146px; height: 146px" :src="fromOption[item.prop2]" />
                            <div class="castInto-img"><a class="castInto-img-a" href="" onclick="return false;"><img
                                        src="../assets/del.png" alt="" @click="del_img"></a>
                            </div>
                        </div>

                        <el-upload v-if="!fromOption[item.prop2]" class="avatar-uploader" v-model:file-list="fileList"
                            :show-file-list="false" list-type="picture-card" action="#" :before-upload="beforeUpload"
                            :http-request="() => { }" accept="image/*">
                            <el-icon class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>

                    </template>
                </el-form-item>
            </el-form>
           </div>
           <template #footer>
            <span class="dialog-footer">
                <el-button @click="CancelBtn">取消</el-button>
                <el-button type="primary" @click="ConfirmBtn(formRef)">
                    确定
                </el-button>
            </span>
        </template>
        </el-dialog>
    </div>
</template>

<style lang='less' scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}


.dialogBox{
    max-height: 60vh;
    overflow: auto;
}

.selectMiddle {
    margin: 0 10px;
}
</style>
<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

// .showAll_dialog{
//     position: relative;
//     height: 100%;
//     .dialog-footer{
//         position: absolute;
//         right: 20px;
//         bottom: 20px;
//     }
// }

.img {
    position: relative;
    width: 146px;
    height: 146px;

    .castInto-img {
        position: absolute;
        width: 146px;
        height: 146px;
        top: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        display: none;

        .castInto-img-a {
            width: 28px;
            height: 28px;
            display: block;

            >img {
                width: 28px;
                height: 28px;
            }
        }
    }

    &:hover .castInto-img {
        display: flex;
    }
}
</style>