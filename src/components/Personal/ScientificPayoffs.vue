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
                                    <!-- <el-tag v-if="item.newId">新</el-tag> -->
                                    {{ transitionDate(scope.row[item.prop2]) }}
                                </template>
                            </el-table-column>
                            <el-table-column v-else-if="item.type == 'upload'" :prop="item.prop2" :label="item.label"
                            header-align="center" align="center">
                            <template #default="scope"> 
                            <el-button v-if="scope.row.attachmentName" link type="primary" @click="download(index1, scope.row)">下载</el-button>
                            <div v-else>无</div>
                            </template>
                          </el-table-column>
                            <el-table-column v-else-if="item.type == 'dateMonth'" :prop="item.prop2" :label="item.label"
                                header-align="center" align="center">
                                <template #default="scope">
                                    <!-- <el-tag v-if="item.newId">新</el-tag> -->
                                    {{ transitionDateMonth(scope.row[item.prop2]) }}
                                </template>
                            </el-table-column>
                            <el-table-column v-else-if="item.type == 'dateYear'" :prop="item.prop2" :label="item.label"
                                header-align="center" align="center">
                                <template #default="scope">
                                    <!-- <el-tag v-if="item.newId">新</el-tag> -->
                                    {{ transitionDateYear(scope.row[item.prop2]) }}
                                </template>
                            </el-table-column>
                            <el-table-column v-else :prop="item.prop2" :label="item.label" header-align="center"
                                align="center">
                                <template #default="scope">
                                    <!-- <el-tag v-if="item.newId">新</el-tag> -->
                                    {{ scope.row[item.prop2] }}
                                </template>
                            </el-table-column>
                        </template>
                        <!-- 表格操作列 -->
                        <el-table-column label="操作" v-if="item1.isOperate" align="center" fixed="right">
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
                    :formIndex="index1" :title="item1.info" ref="form" :formHeader="item1.tableHeader" @isHead="isHead"
                    :Myform="educationAndTraining.children" :titles="educationAndTraining.title" />
            </div>
        </div>
    </div>
</template>
 
<script setup>
import { getSemester, queryDictByType } from "@/api/dsl.js";
import { educationAndTraining } from '@/components/Personal/ScientificPayoffs.js'
import {
    projectTopic,//教师的项目
    backboneTeacher,//骨干教师情况
    instructStudentsAward,//指导学生参加获奖
    award,//奖励
    honoraryTitle,//荣誉称号
    classTeacherHonor,//班主任荣誉
    advancedClass,//先进班集体荣誉
    talentProject,//入选人才项目
    production,//著作
    thesisCase,//论文案例
    literaryWorks,//文艺作品
    patent,// 专利或软件著作权
    studyReport,// 咨询报告或研究报告
} from "@/api/scientificPayoffs.js";
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
    educationAndTraining.value.children.forEach( item => {
        if(item.newAddObj){
            delete item.newAddObj
        }
        if(item.newObj){
            delete item.newObj  
        }
    }) 
})
const download = (index,item) => {
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
    getSelectEducationTeaching(idx);
    dialogType.value = name
    form.value[idx]?.upLose()
}
//报送
const targetType = ['projectTopic', 'backboneTeacher',
    'instructStudentsAward', 'award',
    'honoraryTitle', 'classTeacherHonor', 'advancedClass',
    'talentProject', 'production', 'thesisCase',
    'literaryWorks', 'patent', 'studyReport'];
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
    if (index == 10) {
        literaryWorksPage.value = val - 1
        getLiteraryWorks()
    }
    if (index == 11) {
        patentPage.value = val - 1
        getPatent()
    }
    if (index == 12) {
        studyReportPage.value = val - 1
        getStudyReport()
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
        title: '项目（课题）',
        list:[
            {
                parentId: 1444,//项目类型
            },
            {
                parentId: 1445,//学科领域
            },
            {
                parentId: 1446,//项目中本人角色
            },
            {
                parentId: 1447,//项目来源
            },
        ]
    },
    {
        title: '骨干教师情况',
        list:[
            {
                parentId: 1608,//骨干教师类型
            },
            {
                parentId: 1609,//骨干教师级别
            },
        ]
    },
    {
        title: '指导学生参加获奖',
        list:[
            {
                parentId: 1618,//本人角色
            },
            {
                parentId: 1619,//获奖级别
            },
        ]
    },
    {
        title: '奖励',
        list: [
            {
                parentId: 1633,//奖励类别
            },
            {
                parentId: 1619,//奖励级别
            },
            {
                parentId: 1634,//奖励等级
            },
            {
                parentId: 64,//授权国家（地区）
            },
        ]
    },
    {
        title: '荣誉称号',
        list:[
            {
                parentId: 1652,//荣誉称号
            },
            {
                parentId: 1653,//荣誉称号级别
            },
        ]
    },
    {
        title: '班主任荣誉',
    },
    {
        title: '先进班集体荣誉',
        // list:[
        //     {
        //         parentId: '',//荣誉班级
        //     },
        //     {
        //         parentId: '',//班集体情况
        //     },
        //     {
        //         parentId: '',//获奖级别
        //     },
        // ]
    },
    {
        title: '入选人才项目',
        list:[
            {
                parentId: 1710,//入选人才项目名称
            },
        ]
    },
    {
        title: '著作',
        list:[
            {
                parentId: 1726,//著作类别
            },
            {
                parentId: 1445,//学科领域
            },
            {
                parentId: 1728,//著作中本人角色
            },
        ]
    },
    {
        title: '论文案例',
        list:[
            {
                parentId: 2014,//论文案例级别
            },
            {
                parentId: 2015,//发表刊物级别
            },
            {
                parentId: 2016,//核心期刊类别
            },
            {
                parentId: 1762,//本人角色
            },
            {
                parentId: 1445,//学科领域
            },
            {
                parentId: 2018,//论文案例收录情况
            },
            {
                parentId: 1634,//奖励等级
            },
        ]
    },
    {

        title: '文艺作品',
        list:[
            {
                parentId: 1772,//文艺作品类别
            },
            {
                parentId: 1771,//本人角色
            },
        ]
    },
    {
        title: '专利或软件著作权',
        list:[
            {
                parentId: 1784,//专利或软件著作权类型
            },
            {
                parentId: 1445,//学科领域
            },
            {
                parentId: 1785,//本人角色
            },
        ]
    },
    {
        title: '咨询报告或研究报告',
        list:[
            {
                parentId: 1771,//本人角色
            },
        ]
    },
]

//教育教学之教育教学下拉框查询
const getSelectEducationTeaching = async (idx) => {
    // if (idx == 0) {
    //     if (educationAndTraining.value.children[idx].tableHeader[0].opt.length > 0) return
    // }
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
    //项目（课题）
    if(idx==0){
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//项目类型
        educationAndTraining.value.children[idx].tableHeader[3].opt = personalOptData[1]//学科领域
        educationAndTraining.value.children[idx].tableHeader[7].opt = personalOptData[2]//项目中本人角色
        educationAndTraining.value.children[idx].tableHeader[10].opt = personalOptData[3]//项目来源
    }
    //骨干教师情况
    if(idx==1){
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//骨干教师类型
        educationAndTraining.value.children[idx].tableHeader[1].opt = personalOptData[1]//骨干教师级别

    }
    //指导学生参加获奖
    if(idx==2){
        educationAndTraining.value.children[idx].tableHeader[1].opt = personalOptData[0]//本人角色
        educationAndTraining.value.children[idx].tableHeader[3].opt = personalOptData[1]//获奖级别
    }
    //奖励
    if(idx==3){
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//奖励类别
        educationAndTraining.value.children[idx].tableHeader[3].opt = personalOptData[1]//奖励级别
        educationAndTraining.value.children[idx].tableHeader[4].opt = personalOptData[2]//奖励等级
        educationAndTraining.value.children[idx].tableHeader[7].opt = personalOptData[3]//授权国家（地区）
    }
    //荣誉称号
    if(idx==4){
        educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//荣誉称号
        educationAndTraining.value.children[idx].tableHeader[2].opt = personalOptData[1]//荣誉称号级别
    }
    //先进班集体荣誉
    if(idx==6){
        //    educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//荣誉班级
        //    educationAndTraining.value.children[idx].tableHeader[2].opt = personalOptData[1]//班集体情况
        //    educationAndTraining.value.children[idx].tableHeader[3].opt = personalOptData[2]//获奖级别
    }
    //入选人才项目
    if(idx==7){
           educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//入选人才项目名称
    }
    //著作
    if(idx==8){
           educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//著作类别
           educationAndTraining.value.children[idx].tableHeader[2].opt = personalOptData[1]//学科领域
           educationAndTraining.value.children[idx].tableHeader[6].opt = personalOptData[2]//著作中本人角色
    }
    //论文案例
    if(idx==9){
           educationAndTraining.value.children[idx].tableHeader[1].opt = personalOptData[0]//论文案例级别
           educationAndTraining.value.children[idx].tableHeader[3].opt = personalOptData[1]//发表刊物级别
           educationAndTraining.value.children[idx].tableHeader[5].opt = personalOptData[2]//核心期刊类别
           educationAndTraining.value.children[idx].tableHeader[11].opt = personalOptData[3]//本人角色
           educationAndTraining.value.children[idx].tableHeader[12].opt = personalOptData[4]//学科领域
           educationAndTraining.value.children[idx].tableHeader[13].opt = personalOptData[5]//论文案例收录情况
           educationAndTraining.value.children[idx].tableHeader[20].opt = personalOptData[6]//奖励等级
    }
    //文艺作品
    if(idx==10){
           educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//文艺作品类别
           educationAndTraining.value.children[idx].tableHeader[2].opt = personalOptData[1]//本人角色
    }
    //专利或软件著作权
    if(idx==11){
           educationAndTraining.value.children[idx].tableHeader[0].opt = personalOptData[0]//专利或软件著作权类型
           educationAndTraining.value.children[idx].tableHeader[2].opt = personalOptData[1]//学科领域
           educationAndTraining.value.children[idx].tableHeader[4].opt = personalOptData[2]//本人角色
    }
    //咨询报告或研究报告
    if(idx==12){
           educationAndTraining.value.children[idx].tableHeader[1].opt = personalOptData[0]//专利或软件著作权类型
    }

    if (idx == 3) {
        educationAndTraining.value.children[idx].tableHeader[7].opt = personalOptData[3]//国家

        const { data: data3 } = await queryDictByType({ type: 'ranking' });//
        if (data3.code == 200) {
            let appellation = data3.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[4].opt = appellation
        }

        const { data: data0 } = await queryDictByType({ type: 'level' });//骨干级别
        if (data0.code == 200) {
            let appellation = data0.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[3].opt = appellation
        }
    }
    // console.log(personalOptData, "教学科研成果及获奖");

    if (idx == 0) {
        const { data: data0 } = await queryDictByType({ type: 'level' });//骨干级别
        if (data0.code == 200) {
            let appellation = data0.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[1].opt = appellation
        }
    }

    if (idx == 1) {
        const { data: data1 } = await queryDictByType({ type: 'level' });//获奖级别
        if (data1.code == 200) {
            let appellation = data1.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[1].opt = appellation
        }
    }

    if (idx == 2) {
        const { data: data2 } = await queryDictByType({ type: 'ranking' });//等级
        if (data2.code == 200) {
            let appellation = data2.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[3].opt = appellation
        }
    }
    if (idx == 4) {
        const { data: data4 } = await queryDictByType({ type: 'level' });//
        if (data4.code == 200) {
            let appellation = data4.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[2].opt = appellation
        }
    }

    if (idx == 6) {
        const { data: data6 } = await queryDictByType({ type: 'level' });//
        if (data6.code == 200) {
            let appellation = data6.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[3].opt = appellation
        }
    }
    if (idx == 9) {
        const { data: data6 } = await queryDictByType({ type: 'ranking' });//
        if (data6.code == 200) {
            let appellation = data6.data.dictValueList.map(s => {
                return {
                    name: s.dictValue
                }
            });
            educationAndTraining.value.children[idx].tableHeader[20].opt = appellation
        }
    }





}

//教师的项目
const educationPage = ref(0)
const getUserEducationTeaching = async (val) => {
    const { code, msg, result } = ({} = await projectTopic({
        teacherId: props.userTeacherId,
        page: educationPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[0].tableContent = result.content
        educationAndTraining.value.children[0].allPage = result.totalElements
        console.log('educationAndTraining: ', educationAndTraining);
    }
    // console.log(code, result, "教师的项目");

}
//骨干教师情况
const openClassPage = ref(0)
const getUserOpenClass = async (val) => {
    const { code, msg, result } = ({} = await backboneTeacher({
        teacherId: props.userTeacherId,
        page: openClassPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[1].tableContent = result.content
        educationAndTraining.value.children[1].allPage = result.totalElements
        
        console.log('骨干教师情况: ', result);
    }
}
//指导学生参加获奖
const expertSituationPage = ref(0)
const getExpertSituation = async (val) => {
    const { code, msg, result } = ({} = await instructStudentsAward({
        teacherId: props.userTeacherId,
        page: expertSituationPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[2].tableContent = result.content
        educationAndTraining.value.children[2].allPage = result.totalElements
        // console.log('指导学生参加获奖: ', result);
    }
}
//奖励
const assessmentExpertsPage = ref(0)
const getAssessmentExperts = async (val) => {
    const { code, msg, result } = ({} = await award({
        teacherId: props.userTeacherId,
        page: assessmentExpertsPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[3].tableContent = result.content
        educationAndTraining.value.children[3].allPage = result.totalElements
        // console.log('奖励: ', result);
    }
}
//荣誉称号
const teacherWorkRoomPage = ref(0)
const getTeacherWorkRoom = async (val) => {
    const { code, msg, result } = ({} = await honoraryTitle({
        teacherId: props.userTeacherId,
        page: teacherWorkRoomPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[4].tableContent = result.content
        educationAndTraining.value.children[4].allPage = result.totalElements
        // console.log('荣誉称号: ', result);
    }
}
//班主任荣誉
const characteristicPage = ref(0)
const getCharacteristicCourse = async (val) => {
    const { code, msg, result } = ({} = await classTeacherHonor({
        teacherId: props.userTeacherId,
        page: characteristicPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[5].tableContent = result.content
        educationAndTraining.value.children[5].allPage = result.totalElements
        // console.log('班主任荣誉: ', result);
    }
}
//先进班集体荣誉
const refereeInPage = ref(0)
const getRefEreeInformation = async (val) => {
    const { code, msg, result } = ({} = await advancedClass({
        teacherId: props.userTeacherId,
        page: refereeInPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[6].tableContent = result.content
        educationAndTraining.value.children[6].allPage = result.totalElements
        // console.log('先进班集体荣誉: ', result);
    }
}
//入选人才项目
const nationMedicinePage = ref(0)
const getNationMedicine = async (val) => {
    const { code, msg, result } = ({} = await talentProject({
        teacherId: props.userTeacherId,
        page: nationMedicinePage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[7].tableContent = result.content
        educationAndTraining.value.children[7].allPage = result.totalElements
        // console.log('入选人才项目: ', result);
    }
}
//著作
const governmentPage = ref(0)
const getGovernment = async (val) => {
    const { code, msg, result } = ({} = await production({
        teacherId: props.userTeacherId,
        page: governmentPage.value,
        sort: 'createdAt,desc',
        size: 10
    }));
    console.log(' code, msg, result: ', code, msg, result);

    if (code === 0 && result) {
        educationAndTraining.value.children[8].tableContent = result.content
        educationAndTraining.value.children[8].allPage = result.totalElements
        console.log('著作: ', result);
    }
}
//论文案例
const languagePage = ref(0)
const getLanguage = async (val) => {
    const { code, msg, result } = ({} = await thesisCase({
        teacherId: props.userTeacherId,
        page: languagePage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[9].tableContent = result.content
        educationAndTraining.value.children[9].allPage = result.totalElements
        // console.log('论文案例: ', result);
    }
}
//文艺作品
const literaryWorksPage = ref(0)
const getLiteraryWorks = async (val) => {
    const { code, msg, result } = ({} = await literaryWorks({
        teacherId: props.userTeacherId,
        page: literaryWorksPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[10].tableContent = result.content
        educationAndTraining.value.children[10].allPage = result.totalElements
        // console.log('文艺作品: ', result);
    }
}
//专利或软件著作权
const patentPage = ref(0)
const getPatent = async (val) => {
    const { code, msg, result } = ({} = await patent({
        teacherId: props.userTeacherId,
        page: patentPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[11].tableContent = result.content
        educationAndTraining.value.children[11].allPage = result.totalElements
        // console.log('专利或软件著作权: ', result);
    }
}

//咨询报告或研究报告
const studyReportPage = ref(0)
const getStudyReport = async (val) => {
    const { code, msg, result } = ({} = await studyReport({
        teacherId: props.userTeacherId,
        page: studyReportPage.value,
        sort: 'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[12].tableContent = result.content
        educationAndTraining.value.children[12].allPage = result.totalElements
        // console.log('咨询报告或研究报告: ', result);
    }
}

onMounted(() => {
    getUserEducationTeaching()//教师的项目
    getUserOpenClass()//骨干教师情况
    getExpertSituation()//指导学生参加获奖
    getAssessmentExperts()//奖励
    getTeacherWorkRoom()//荣誉称号
    getCharacteristicCourse()//班主任荣誉
    getRefEreeInformation()//先进班集体荣誉
    getNationMedicine()//入选人才项目
    getGovernment()//著作
    getLanguage()//论文案例
    getLiteraryWorks()//文艺作品
    getPatent()//专利或软件著作权
    getStudyReport()//咨询报告或研究报告
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