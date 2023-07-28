<template>
    <div>
        <div class="personal_baseInfo">
            <div class="personal_baseInfo_title" :id="educationAndTraining.title">{{ educationAndTraining.title }}</div>
            <div v-for="(item1, index1) in educationAndTraining.children" :key="index1">
                <div class="info_box">
                    <div class="personal_personalInfo_title">{{ item1.info }}</div>
                    <div>
                        <el-button v-if="item1.isBtn" @click="Add(index1, 'add')">新增</el-button>
                        <el-button @click="Submitted(index1)">报送</el-button>
                    </div>
                </div>
                <div class="personal_table">
                    <el-table :data="item1.tableContent" border>
                        <!-- 表格业务内容列 -->
                        <template v-for="(item, index) in item1.tableHeader" :key="index">

                            <el-table-column v-if="item.new == 'top'" :prop="item.prop2" :label="item.label"
                                header-align="center" align="center">
                                <template #default="scope">
                                    <el-tag v-if="scope.row.newId">新</el-tag>
                                    <text v-if="item.type == 'dateMonth'"> {{
                                        transitionDateMonth(scope.row[item.prop2]) }}</text>
                                    <text v-else-if="item.type == 'dateYear'"> {{
                                        transitionDateYear(scope.row[item.prop2]) }}</text>
                                    <text v-else-if="item.type == 'date'"> {{ transitionDate(scope.row[item.prop2])
                                    }}</text>
                                    <text v-else> {{ scope.row[item.prop2] }}</text>
                                </template>
                            </el-table-column>

                            <el-table-column v-else-if="item.type == 'date'" :prop="item.prop2" :label="item.label"
                                header-align="center" align="center">
                                <template #default="scope">
                                    <el-tag v-if="item.newId">新</el-tag>
                                    {{ transitionDate(scope.row[item.prop2]) }}
                                </template>
                            </el-table-column>
                            <el-table-column v-else-if="item.type == 'upload'" :prop="item.prop2" :label="item.label"
                                header-align="center" align="center">
                                <template #default="scope">
                                    <el-button v-if="scope.row.attachmentName" link type="primary"
                                        @click="download(index1, scope.row)">下载</el-button>
                                    <div v-else>无</div>
                                </template>
                            </el-table-column>
                            <el-table-column v-else-if="item.type == 'dateMonth'" :prop="item.prop2" :label="item.label"
                                header-align="center" align="center">
                                <template #default="scope">
                                    <el-tag v-if="item.newId">新</el-tag>
                                    {{ transitionDateMonth(scope.row[item.prop2]) }}
                                </template>
                            </el-table-column>
                            <el-table-column v-else-if="item.type == 'dateYear'" :prop="item.prop2" :label="item.label"
                                header-align="center" align="center">
                                <template #default="scope">
                                    <el-tag v-if="item.newId">新</el-tag>
                                    {{ transitionDateYear(scope.row[item.prop2]) }}
                                </template>
                            </el-table-column>
                            <el-table-column v-else :prop="item.prop2" :label="item.label" header-align="center"
                                align="center">
                                <template #default="scope">
                                    <el-tag v-if="item.newId">新</el-tag>
                                    {{ scope.row[item.prop2] }}
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 表格操作列 -->
                        <el-table-column label="操作" v-if="item1.isOperate" align="center">
                            <template #default="scope">
                                <el-button link type="primary" @click="Edit(index1, scope.row, 'edit')">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="table_page">
                    <el-pagination v-model:current-page="item1.page" v-model:page-size="item1.size" :small="small"
                        :background="background" layout="total,  prev, pager, next, jumper" :total="item1.allPage"
                        @current-change="handleCurrentChange($event, index1)">
                    </el-pagination>
                </div>
                <FormList :dialogType="dialogType" @newly="newly" :content="content" @changeFist="changeFist"
                    @getdiscipline="getdiscipline" :formIndex="index1" :title="item1.info" ref="form"
                    :formHeader="item1.tableHeader" @isHead="isHead" :Myform="educationAndTraining.children"
                    :titles="educationAndTraining.title" />
            </div>
        </div>
    </div>
</template>
 
<script setup>
import { queryDictByType } from "@/api/dsl.js";
import { educationAndTraining } from '@/components/Personal/Certification.js'
import {
    teacherCertification,//教师资格
    teacherCertificationAffirm,//教师资格证认定信息
    trainingHours,//培训学时记录
    certificateInformation,//证书信息
    societySportsGuidanceCertificate,//社会体育指导员证书
    societySportsGuidanceTrainMessage,//社会体育指导员技术等级培训信息
    refereeInformation,//等级裁判员信息
    nationMedicineCertificate,//国家医药证书
    governmentStandard,//国家标准或行业标准
    languageCapacity,//语言能力
} from "@/api/certification.js";
import { ref, reactive, onMounted } from 'vue'
import { queryUserParentId, queryAreaFindByPid, queryAreaFindByLevel } from "@/api/dict.js";//用户字典信息
import { transitionDate, transitionDateYear, transitionDateMonth, transitionJab, tarTime } from "@/utils/handleData/handleData.js";//使用封装函数
import { UserApplyInfo } from "@/api/applyApi.js";//报送
import { ElMessage } from 'element-plus'
import { downloadFileBySaveAs } from '@/views/backlogList/components/Examine.js'
const form = ref(null)
const dialogType = ref("add")//选择的类型
const content = ref(null) //选择的内容
//离开删除新增数据
onUnmounted(() => {
    educationAndTraining.value.children.forEach(item => {
        if (item.newAddObj) {
            delete item.newAddObj
        }
        if (item.newObj) {
            delete item.newObj
        }
    })
})
const download = (index, item) => {
    downloadFileBySaveAs(item.attachment, item.attachmentName)
}
//新增
const Add = (idx, name) => {
    if (educationAndTraining.value.children[idx].newAddObj) {
        ElMessage({
            message: '请先报送之前的数据',
            type: 'warning',
        })
        return
    }
    getSelectEducationTeaching(idx)
    dialogType.value = name
    form.value[idx]?.upLose()
}
//报送
const targetType = ['teacherCertification', 'teacherCertificationAffirm',
    'trainingHours', 'certificateInformation', 'societySportsGuidanceCertificate',
    'societySportsGuidanceTrainMessage', 'refereeInformation',
    'nationMedicineCertificate', 'governmentStandard', 'languageCapacity']
const Submitted = async (index) => {
    let newAdd = educationAndTraining.value.children[index].newAddObj //判断是否为新增
    let update = educationAndTraining.value.children[index].newObj
    if (newAdd == undefined && update == undefined) {
        ElMessage({
            message: '请先新增或者编辑报送信息',
            type: 'warning',
        })
        return
    }
    if (newAdd) {
        newAdd.teacherId = props.userTeacherId
        tarTime(newAdd)
        const applyInfoData = reactive({
            applyType: "UPDATE",//必传
            teacherId: props.userTeacherId,//必传
            targetId: "",//新增不传，编辑传当前对象id
            targetName: targetType[index],
            teacherName: props.userName,
            variables: newAdd,
        })
        console.log('applyInfoData: ', applyInfoData);

        // return
        const { code, msg, result } = ({} = await UserApplyInfo({
            ...applyInfoData
        }))
        if (code == 0) {
            delete educationAndTraining.value.children[index].newAddObj
            ElMessage({
                message: '报送成功,请耐心等待',
                type: 'success',
            })
            form.value[index]?.clear()
        }
        console.log(code, msg, result, "报送信息");
    } else {
        let educationVal = educationAndTraining.value.children[index].newObj
        tarTime(educationVal)
        const applyInfoData = reactive({
            applyType: "UPDATE",//必传
            teacherId: props.userTeacherId,//必传
            targetId: editTargetId.value,//新增不传，编辑传当前对象id
            targetName: targetType[index],
            teacherName: props.userName,
            variables: educationVal,
        })
        const { code, msg, result } = ({} = await UserApplyInfo({
            ...applyInfoData
        }))
        if (code == 0) {
            ElMessage({
                message: '报送成功,请耐心等待',
                type: 'success',
            })
        }
        console.log(code, msg, result, "报送信息");
    }

}
//新增
const newly = (item, index) => {
    ElMessage({
        message: '新增成功，请点击报送按钮',
        type: 'success',
    })
    educationAndTraining.value.children[index].tableContent.unshift({ ...item, newId: true })
    educationAndTraining.value.children[index].newAddObj = item
}
//编辑
const isHead = (id, v, idx) => {
    if (JSON.stringify(v) !== '{}') {
        ElMessage({
            message: '修改成功，请点击报送按钮',
            type: 'success',
        })
    }
    educationAndTraining.value.children[idx].newInfo = id
    educationAndTraining.value.children[idx].newObj = v
}
//编辑
const editTargetId = ref(0)
const Edit = (idx, value, name) => {
    getSelectEducationTeaching(idx)
    dialogType.value = name//编辑
    content.value = value//编辑的内容
    editTargetId.value = value.id
    form.value[idx]?.upLose()//打开组件
}


const props = defineProps({
    userName: String,
    userTeacherId: Number
})
//判断返回字段是时间转换时间戳
// const tarTime = (newAdd) => {
//     if (newAdd.lectureDate) {
//         newAdd.lectureDate = transitionJab(newAdd.lectureDate)
//     }
//     if (newAdd.supportEducationEnd) {
//         newAdd.supportEducationEnd = transitionJab(newAdd.supportEducationEnd)
//     }
//     if (newAdd.supportEducationStart) {
//         newAdd.supportEducationStart = transitionJab(newAdd.supportEducationStart)
//     }
//     return newAdd
// }
//使用父组件传递过来的值
const { title, tableData } = toRefs(props)
//默认第几页
const currentPage4 = ref(0)
// 每页显示条目个数
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(true)
//分页
const handleCurrentChange = (val, index) => {
    if (index == 0) {
        educationPage.value = val - 1
        getUserEducationTeaching()
    }
    if (index == 1) {
        openClassPage.value = val - 1
        getUserOpenClass()
    }
    if (index == 2) {
        expertSituationPage.value = val - 1
        getExpertSituation()
    }
    if (index == 3) {
        assessmentExpertsPage.value = val - 1
        getAssessmentExperts()
    }
    if (index == 4) {
        teacherWorkRoomPage.value = val - 1
        getTeacherWorkRoom()
    }
    if (index == 5) {
        characteristicPage.value = val - 1
        getCharacteristicCourse()
    }
    if (index == 6) {
        refereeInPage.value = val - 1
        getRefEreeInformation()
    }
    if (index == 7) {
        nationMedicinePage.value = val - 1
        getNationMedicine()
    }
    if (index == 8) {
        governmentPage.value = val - 1
        getGovernment()
    }
    if (index == 9) {
        languagePage.value = val - 1
        getLanguage()
    }
}

//获取二级选项
const changeFist = async (id) => {
    let res = await queryUserParentId({ parentId: id })
    educationAndTraining.value.children[0].tableHeader[3].opt2 = res.result
}

//用户字典信息教育学习经历
const optEducationTeaching = [
    {
        title: '教师资格',
        list: [{
            parentId: 1235,//资格证种类
        },
        {
            parentId: 524,//认证学段
        },
        {
            parentId: '',//认证学科
        },
        {
            parentId: 1238,//首次注册结论
        },
        ]
    },
    {
        title: '教师资格证认定信息',
        list: [
            {
                parentId: 1258,//证照状态
            }
        ]
    },
    {
        title: '培训学时记录',
    },
    {
        title: '证书信息',
        list: [
            {
                parentId: 1268,//证书类型
            },
            {
                parentId: 1269,//语言证书名称
            },
        ]
    },
    {
        title: '社会体育指导员证书',
        list: [
            {
                parentId: 1288,//证书等级
            },
        ]
    },
    {
        title: '社会体育指导员技术等级培训信息',
        list: [
            {
                parentId: 6,//民族
            },
        ]
    },
    {
        title: '等级裁判员信息',
    },
    {
        title: '国家医药证书',
        list: [
            {
                parentId: 1292,//本人角色
            },
        ]
    },
    {
        title: '国家标准或行业标准',
        // list: [
        //     {
        //         parentId: '',//本人角色
        //     },
        // ]
    },
    {
        title: '语言能力',
        list: [
            {
                parentId: 2000,//语种
            },
            {
                parentId: 1298,//掌握程度
            },
        ]
    },
]
//教育教学之教育教学下拉框查询
const getSelectEducationTeaching = async (idx) => {
    if (idx == 0) {
        if (educationAndTraining.value.children[idx].tableHeader[0].opt.length > 0) return
    }
    let personalOptData
    if (optEducationTeaching[idx].list) {
        let list = optEducationTeaching[idx].list
        personalOptData = await Promise.all(
            list.map(async item => {
                const res = await queryUserParentId({ parentId: item.parentId })
                return res.result
            })
        )
    }

    if (idx == 0) {
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//资格证种类
        educationAndTraining.value.children[idx].tableHeader[1].opt = personalOptData[1]//认证学段
        // educationAndTraining.value.children[idx].tableHeader[2].opt = personalOptData[2]//认证学科
        educationAndTraining.value.children[idx].tableHeader[8].opt = personalOptData[3]//首次注册结论
    }
    if (idx == 1) {
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//证照状态
    }
    if (idx == 3) {
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//证书类型
        educationAndTraining.value.children[idx].tableHeader[2].opt = personalOptData[1]//语言证书名称
    }
    if (idx == 4) {
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//证书等级
    }
    if (idx == 5) {
        educationAndTraining.value.children[idx].tableHeader[3].opt = personalOptData[0]//民族
    }
    if (idx == 7) {
        educationAndTraining.value.children[idx].tableHeader[2].opt = personalOptData[0]//本人角色
    }
    if (idx == 9) {
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//语种
        educationAndTraining.value.children[idx].tableHeader[1].opt = personalOptData[1]//掌握程度
    }
    console.log(personalOptData, "资格证");


    //读书郎字典
    if (idx == 0) {
        const { data: data0 } = await queryDictByType({ type: 'schoolStage' });//学段
        if (data0.code == 200) {
            let appellation = data0.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[1].opt = appellation
        }
    }

}

//学科枚举
const enumerate = {
    '学前': 'preschoolSubject',
    '小学': 'primarySchoolSubject',
    '初中': 'juniorHighSchoolSubject',
    '高中': 'highSchoolSubject',
    '中职': 'secondaryVocationalSubject',
}

const getdiscipline = async (name) => {

    if (name != null) {
        const { data: data0 } = await queryDictByType({ type: enumerate[name] });//学科
        if (data0.code == 200) {
            let appellation = data0.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[0].tableHeader[2].opt = appellation
        }
    }

}




//教师资格
const educationPage = ref(0)
const getUserEducationTeaching = async (val) => {
    const { code, msg, result } = ({} = await teacherCertification({
        teacherId: props.userTeacherId,
        page: educationPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[0].tableContent = result.content
        educationAndTraining.value.children[0].allPage = result.totalElements
        // console.log('educationAndTraining: ', educationAndTraining);
    }
    // console.log(code, result, "教师资格");

}
//教师资格证认定信息
const openClassPage = ref(0)
const getUserOpenClass = async (val) => {
    const { code, msg, result } = ({} = await teacherCertificationAffirm({
        teacherId: props.userTeacherId,
        page: openClassPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[1].tableContent = result.content
        educationAndTraining.value.children[1].allPage = result.totalElements
        // console.log('教师资格证认定信息: ', result);
    }
}
//培训学时记录
const expertSituationPage = ref(0)
const getExpertSituation = async (val) => {
    const { code, msg, result } = ({} = await trainingHours({
        teacherId: props.userTeacherId,
        page: expertSituationPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[2].tableContent = result.content
        educationAndTraining.value.children[2].allPage = result.totalElements
        // console.log('培训学时记录: ', result);
    }
}
//证书信息
const assessmentExpertsPage = ref(0)
const getAssessmentExperts = async (val) => {
    const { code, msg, result } = ({} = await certificateInformation({
        teacherId: props.userTeacherId,
        page: assessmentExpertsPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[3].tableContent = result.content
        educationAndTraining.value.children[3].allPage = result.totalElements
        // console.log('证书信息: ', result);
    }
}
//社会体育指导员证书
const teacherWorkRoomPage = ref(0)
const getTeacherWorkRoom = async (val) => {
    const { code, msg, result } = ({} = await societySportsGuidanceCertificate({
        teacherId: props.userTeacherId,
        page: teacherWorkRoomPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[4].tableContent = result.content
        educationAndTraining.value.children[4].allPage = result.totalElements
        // console.log('社会体育指导员证书: ', result);
    }
}
//社会体育指导员技术等级培训信息
const characteristicPage = ref(0)
const getCharacteristicCourse = async (val) => {
    const { code, msg, result } = ({} = await societySportsGuidanceTrainMessage({
        teacherId: props.userTeacherId,
        page: characteristicPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[5].tableContent = result.content
        educationAndTraining.value.children[5].allPage = result.totalElements
        // console.log('社会体育指导员技术等级培训信息: ', result);
    }
}
//等级裁判员信息
const refereeInPage = ref(0)
const getRefEreeInformation = async (val) => {
    const { code, msg, result } = ({} = await refereeInformation({
        teacherId: props.userTeacherId,
        page: refereeInPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[6].tableContent = result.content
        educationAndTraining.value.children[6].allPage = result.totalElements
        // console.log('等级裁判员信息: ', result);
    }
}
//国家医药证书
const nationMedicinePage = ref(0)
const getNationMedicine = async (val) => {
    const { code, msg, result } = ({} = await nationMedicineCertificate({
        teacherId: props.userTeacherId,
        page: nationMedicinePage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[7].tableContent = result.content
        educationAndTraining.value.children[7].allPage = result.totalElements
        // console.log('国家医药证书: ', result);
    }
}
//国家标准或行业标准
const governmentPage = ref(0)
const getGovernment = async (val) => {
    const { code, msg, result } = ({} = await governmentStandard({
        teacherId: props.userTeacherId,
        page: governmentPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[8].tableContent = result.content
        educationAndTraining.value.children[8].allPage = result.totalElements
        // console.log('国家标准或行业标准: ', result);
    }
}
//语言能力
const languagePage = ref(0)
const getLanguage = async (val) => {
    const { code, msg, result } = ({} = await languageCapacity({
        teacherId: props.userTeacherId,
        page: languagePage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[9].tableContent = result.content
        educationAndTraining.value.children[9].allPage = result.totalElements
        // console.log('语言能力: ', result);
    }
}

onMounted(() => {
    getUserEducationTeaching()//岗位聘任列表
    getUserOpenClass()//专业技术职务聘任
    getExpertSituation()//担任培训专家情况
    getAssessmentExperts()//担任评审专家情况
    getTeacherWorkRoom()//名师工作室负责人情况
    getCharacteristicCourse()//承担特色课程领衔教师
    getRefEreeInformation()//等级裁判员信息
    getNationMedicine()//国家医药证书
    getGovernment()//国家标准或行业标准
    getLanguage()//语言能力
})

</script>

<style lang='less' scoped>
.personal_baseInfo {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 10px;

    .personal_baseInfo_title {
        margin-left: 6px;
        font-size: 20px;
        font-weight: bold;
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

        // .isObject {
        //     display: flex;

        //     .m_r1 {
        //         margin-right: 10px;
        //     }
        // }
    }

    .table_page {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
}
</style>