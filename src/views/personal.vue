<script setup>
import { useWindowScroll } from '@vueuse/core'
import { ref, reactive, onMounted } from 'vue'
import { tableList, baseInfoList } from "@/utils/enum"//基本信息 教育教学
import {
    queryUserPersonalInfo,
    queryUserAuthorizedStrengthInfo,
    queryUserInAuthorizedStrengthInfo,
    queryUserNotAuthorizedStrengthInfo,
    queryUserElseMessageInfo,
} from "@/api/personal.js";//用户基本信息
import { queryUserStudyExperience } from "@/api/studyExperience.js";//学习经历
import {queryUserParentId, queryAreaFindByPid,queryAreaFindByLevel, queryOrganizationTree,} from "@/api/dict.js";//用户字典信息
import {organization_Arr} from '@/api/dsl.js'
import { personalInformationStore } from "@/store/personalInformation.js";//基本信息仓库
import { transitionDate, changePersonalDate } from "@/utils/handleData/handleData.js";//使用封装函数
import { organizationTree, findRegion, } from '@/api/roster.js'
import { getLocalStorage } from '@/utils/index';
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { findAllByDel } from '@/api/project';
const route = useRoute()
const router = useRouter()
const { personalInfo, applyId } = storeToRefs(personalInformationStore())
const { setPersonalInfo, setApplyId, setUserInfo } = personalInformationStore()
const RoleType = ref('')
onBeforeMount(() => {
    // 获取用户信息
    if (route.query.userId) {
        userTeacherId.value = Number(route.query.userId)
        top_title.value = route.query.title
    } else {
        // userTeacherId.value = 1
        userTeacherId.value = getLocalStorage('userInfo').id
    }
     //获取用户基本信息之个人信息
   getUserPersonalInfo()


   projectAll()

})

onMounted(() => {
    
    RoleType.value = localStorage.getItem('RoleType')
    // 基本信息之编制信息之部门获取
    getDepartmentInfo()
    //根据父Id查询地区下拉框的值
    getUserArea()
    //获取右边动态宽度
    getRightWidth()
 
    //根据父Id查询下拉框的值
    getSelectParentIdInfo()
    //获取用户基本信息之编制信息
    getUserAuthorizedStrength()
    //基本信之编制信息下拉框查询
    getSelectOrganizationInfo()
    //获取用户基本信息之在编信息
    getUserInAuthorizedStrength()
    //基本信之在编信息下拉框查询
    getSelectInAuthorizedStrength()
    //获取用户基本信息之非编信息
    getUserNotAuthorizedStrength()
    //基本信之非编信息下拉框查询
    getSelectNotAuthorizedStrength()
    //获取用户基本信息之其他信息
    getUserElseMessage()
    //基本信之其他信息下拉框查询
    getSelectElseMessage()
    // window.addEventListener('scroll', handleScroll);
})
// onUnmounted(() => {
//     window.removeEventListener('scroll', handleScroll);
// })
//获取启用公告
const projectAll = async () => {
 if(route.meta.from != '/auth' || localStorage.getItem('RoleType') !=='teacher') return
  const params = {
    sort: 'startTime,desc',
    page: 0,
    size: 1,
  }
  const { result, code, msg } = await findAllByDel(params)
  if (code == 0 && result) {
    if(result.length>0){
        ElMessageBox.confirm(
    '公告标题：' + result[0].headline,
    '通知公告',
    {
      confirmButtonText: '去阅读',
      cancelButtonText: '取消',
    }
  )
    .then(() => {
        router.push({ path: '/projectdetailsTeacher',query:{item: result[0].id}})
    })
    .catch(() => {
     
    })
    }
  } else {
    console.log(msg, '失败');
  }

}
const top_title = ref(null)

const leftWidth = ref(null)
const rightWidth = ref(null)
const data = reactive({
    teacherInfoList: [
        { category: "基本信息" },
        { category: "教育教学" },
        { category: "学习经历" },
        { category: "工作经历" },
        { category: "岗位聘任信息" },
        { category: "考核信息" },
        { category: "资格证" },
        { category: "教学科研成果及获奖" },
        { category: "家庭信息" },
        { category: "师德信息" },
    ],
    personalInfo: [],//个人信息
    organizationInfo: [],//编制信息
    DepartmentInfo: [],//部门信息
    inAuthorizedInfo: [],//在编信息
    notAuthorizedStrengthInfo: [],//非编信息
    elseMessageInfo: [],//其它信息
    educationTeachingInfo: [],//教育教学
    provinces: [],//省或者直辖市

})
//获取右边宽度
const getRightWidth = () => {
    rightWidth.value = document.documentElement.clientWidth - leftWidth.value.clientWidth - 40
    // 
}

//获取用户基本信息之个人信息
const userName = ref('')
const userTeacherId = ref(0)
const getUserPersonalInfo = async () => {
    const { code, msg, result } = ({} = await queryUserPersonalInfo({ teacherId: userTeacherId.value }))
    if (result == null) {
        setApplyId(null, 0)
    }

    //学习经历
    const res = ({} = await queryUserStudyExperience({
        teacherId: userTeacherId.value,
        page: 0,
        sort: 'createdAt,desc',
        size: 1
    }))
    if (res.code == 0 && res.result.content.length > 0) {
        // console.log('resultresultresult---------------------------------',result, res.result.content);
        result.graduateSchool = res.result.content[0].getDegreeNaAcademy //毕业院校
        result.specialty = res.result.content[0].major //专业
        result.tallEducation = res.result.content[0].educationBackground //学历
    } else {
        result.graduateSchool = '' //毕业院校
        result.specialty = '' //专业
        result.tallEducation = '' //学历
    }
    if (code === 0 && result) {
        // console.log('result: ', result.birthTime);

        //循环对比返回的对象数据的key与自己定义的数据

        const arr = baseInfoList[0].children[0].showHeader
        let native =   result.nativePlaceProvince + result.nativePlaceCity + result.nativePlaceDistrict
        result.nativePlace = native == 0 ? '':native
        baseInfoList[0].children[0].showHeader[6].birthPlaceArr = [result.birthplaceProvince, result.birthplaceCity, result.birthplaceDistrict] //出生地数组
        baseInfoList[0].children[0].showHeader[6].birthPlaceArr2 = [] //出生地数组
        let birthplace =  result.birthplaceProvince + result.birthplaceCity + result.birthplaceDistrict//出生地
        result.birthPlace = birthplace == 0 ? '' : birthplace
        baseInfoList[0].children[0].showHeader[16].nativePlaceArr = [result.nativePlaceProvince, result.nativePlaceCity, result.nativePlaceDistrict]//籍贯2()
        baseInfoList[0].children[0].showHeader[16].nativePlaceArr2 = []//籍贯2()
        changePersonalDate(arr, result)
        setPersonalInfo(baseInfoList[0].children[0].showHeader[0].value)
        setApplyId(result.id, 0)
        userName.value = result.name;

        let mybirthTime = new Date(result.birthTime);
        let myteachTime = new Date(result.teachTime);
        let today = new Date();
        if (result.birthTime) {
            baseInfoList[0].children[0].showHeader[11].value = today.getFullYear() - mybirthTime.getFullYear();
        }
        if (result.teachTime) {
            baseInfoList[0].children[0].showHeader[12].value = today.getFullYear() - myteachTime.getFullYear();
        }
    }

    // 
}
//用户字典信息基本信之个人信息下拉框
const optArr = [
    {
        parentId: 2,//性别  
    },
    {
        parentId: 64,//国家和地区  
    },
    {
        parentId: 370,//政治面貌
    },
    {
        parentId: 304,//婚姻状况
    },
    {
        parentId: 6,//民族
    },
    {
        parentId: 384,//健康状况
    },
]
//基本信之个人信息下拉框查询
const getSelectParentIdInfo = async () => {
    const personalOptData = await Promise.all(
        optArr.map(async item => {
            const res = await queryUserParentId({ parentId: item.parentId })
            return res.result
        })
    )
    data.personalInfo = personalOptData

    data.personalInfo[0] = data.personalInfo[0].filter(item => item.name !== "未知");
    baseInfoList[0].children[0].showHeader[2].opt = data.personalInfo[0]//性别
    baseInfoList[0].children[0].showHeader[3].opt = data.personalInfo[1]//国家和地区  
    baseInfoList[0].children[0].showHeader[5].opt = data.personalInfo[2]//政治面貌
    baseInfoList[0].children[0].showHeader[7].opt = data.personalInfo[3]//婚姻状况
    baseInfoList[0].children[0].showHeader[14].opt = data.personalInfo[4]//民族
    baseInfoList[0].children[0].showHeader[17].opt = data.personalInfo[5]//健康状况


    // 
}
//获取用户基本信息之编制信息
const getUserAuthorizedStrength = async () => {
    const { code, msg, result } = ({} = await queryUserAuthorizedStrengthInfo({ teacherId: userTeacherId.value }))
    if (result == null) {
        setApplyId(null, 1)
        baseInfoList[0].children[1].showHeader.forEach(s => {
            s.value=''
        });
    }
    if (code === 0 && result) {
        //循环对比返回的对象数据的key与自己定义的数据
        const arr = baseInfoList[0].children[1].showHeader
        changePersonalDate(arr, result)
        setApplyId(result.id, 1)
    }

}
//用户字典信息基本信之编制信息下拉框
const optOrganization = [
    {
        parentId: 410,//编制状态  
    },
    {
        parentId: 414,//人员状态  
    },
]
//基本信之编制信息下拉框查询
const getSelectOrganizationInfo = async () => {
    const personalOptData = await Promise.all(
        optOrganization.map(async item => {
            const res = await queryUserParentId({ parentId: item.parentId })
            return res.result
        })
    )
    data.organizationInfo = personalOptData
    baseInfoList[0].children[1].showHeader[4].opt = data.organizationInfo[0]//编制状态
    baseInfoList[0].children[1].showHeader[5].opt = data.organizationInfo[1]//人员状态  
    // 
}
//基本信息之编制信息之部门获取
const getDepartmentInfo = async () => {

    /* 读书郎接口组织 */
    // const {data} =  await organization_Arr({ selectType:0 })
    // data.data.list = addHierarchyTitle(data.data.list);
    // valKey(data.data.list)
    // data.DepartmentInfo = data.data.list


    const organizationTree = {
        idCard: "330602196710200015",
        token: localStorage.getItem('dslToken'),
        // selectType: 0
    }
    const { code, msg, result } = ({} = await queryOrganizationTree({ ...organizationTree }))
    result.list = addHierarchyTitle(result.list);
    valKey(result.list)
    data.DepartmentInfo = result.list

    baseInfoList[0].children[1].showHeader[2].opt = data.DepartmentInfo//编制单位(用工单位)
    baseInfoList[0].children[1].showHeader[1].opt = data.DepartmentInfo//隶属集团

}


function addHierarchyTitle(data, parentTitle = '') {
    data.forEach((item) => {
        const { title, children, ...rest } = item;
        const modifiedTitle = parentTitle ? `${parentTitle}/${title}` : title;
        if (children && children.length > 0) {
            rest.children = addHierarchyTitle(children, modifiedTitle);
        }
        rest.hierarchyTitle = modifiedTitle;
        Object.assign(item, rest);
    });
    return data;
}


//处理用工单位key，value
const unitobj = {}
const valKey = (val) => {
    for (let i = 0; i < val.length; i++) {
        unitobj[val[i].title] = { key: val[i].key, arr: val[i].hierarchyTitle.split('/') };
        if (val[i].children) {
            valKey(val[i].children)
        }
    }
}

//获取用户基本信息之在编信息
const getUserInAuthorizedStrength = async () => {
    const { code, msg, result } = ({} = await queryUserInAuthorizedStrengthInfo({ teacherId: userTeacherId.value }))
    // console.log('result: ', result);
    if (result == null) {
        setApplyId(null, 2)
        baseInfoList[0].children[2].showHeader.forEach(s => {
            s.value=''
            if(s.value2){
                s.value2=''
            }
        });
    }
    if (code === 0 && result) {
        //循环对比返回的对象数据的key与自己定义的数据
        const arr = baseInfoList[0].children[2].showHeader
        changePersonalDate(arr, result)
        setApplyId(result.id, 2)
    }

}
//用户字典信息基本信之在编信息下拉框
const optInAuthorizedStrength = [
    {
        parentId: 435,//教职工来源  
    },
    {
        parentId: 453,//用人形式  
    },
    {
        parentId: 470,//签订合同情况  
    },
]
//基本信之在编信息下拉框查询
const getSelectInAuthorizedStrength = async () => {
    const personalOptData = await Promise.all(
        optInAuthorizedStrength.map(async item => {
            const res = await queryUserParentId({ parentId: item.parentId })
            return res.result
        })
    )
    data.inAuthorizedInfo = personalOptData
    baseInfoList[0].children[2].showHeader[0].opt = data.inAuthorizedInfo[0]//教职工来源
    baseInfoList[0].children[2].showHeader[3].opt = data.inAuthorizedInfo[1]//用人形式  
    baseInfoList[0].children[2].showHeader[4].opt = data.inAuthorizedInfo[2]//签订合同情况  
}
//获取用户基本信息之非编信息
const getUserNotAuthorizedStrength = async () => {
    const { code, msg, result } = ({} = await queryUserNotAuthorizedStrengthInfo({ teacherId: userTeacherId.value }))
    // 
    if (result == null) {
        setApplyId(null, 3)
        baseInfoList[0].children[3].showHeader.forEach(s => {
            s.value=''
        });
    }
    if (code === 0 && result) {
        //循环对比返回的对象数据的key与自己定义的数据
        const arr = baseInfoList[0].children[3].showHeader

        changePersonalDate(arr, result)
        // 
        setApplyId(result.id, 3)
    }
    // 
}
//用户字典信息基本信之非编信息下拉框
const optNotAuthorizedStrength = [
    {
        parentId: 476,//岗位分类  
    },
    {
        parentId: 477,//人员类别  
    },
    {
        parentId: 478,//用工方式  
    },
    {
        parentId: 479,//经费来源  
    },
    {
        parentId: 470,//签订合同情况  
    },
]
//基本信之非编信息下拉框查询
const getSelectNotAuthorizedStrength = async () => {
    const personalOptData = await Promise.all(
        optNotAuthorizedStrength.map(async item => {
            const res = await queryUserParentId({ parentId: item.parentId })
            return res.result
        })
    )

    const whetherOrNotArr = [{ name: '是' }, { name: '否' }]

    data.notAuthorizedStrengthInfo = personalOptData
    // 
    baseInfoList[0].children[3].showHeader[0].opt = data.notAuthorizedStrengthInfo[0]//岗位分类
    baseInfoList[0].children[3].showHeader[1].opt = data.notAuthorizedStrengthInfo[1]//人员类别  
    baseInfoList[0].children[3].showHeader[2].opt = data.notAuthorizedStrengthInfo[2]//用工方式  
    baseInfoList[0].children[3].showHeader[3].opt = data.notAuthorizedStrengthInfo[4]//签订合同情况   
    baseInfoList[0].children[3].showHeader[8].opt = data.notAuthorizedStrengthInfo[3]//经费来源  
    baseInfoList[0].children[3].showHeader[9].opt = whetherOrNotArr//是否人事代理
    baseInfoList[0].children[3].showHeader[10].opt = whetherOrNotArr//是否退休返聘
    // 
}
//获取用户基本信息之其他信息
const getUserElseMessage = async () => {
    const { code, msg, result } = ({} = await queryUserElseMessageInfo({ teacherId: userTeacherId.value }))
    if (result == null) {
        setApplyId(null, 4)
        baseInfoList[0].children[4].showHeader.forEach(s => {
            s.value=''
        });
    }
    if (code === 0 && result) {
        //循环对比返回的对象数据的key与自己定义的数据
        const arr = baseInfoList[0].children[4].showHeader
        changePersonalDate(arr, result)
        setApplyId(result.id, 4)
    }
    // 
}
//用户字典信息基本信息之其他信息下拉框
const optElseMessage = [
    {
        parentId: 502,//信息技术应用能力  
    },
    {
        parentId: 508,//证件信息  
    },
]
//基本信之其他信息下拉框查询
const getSelectElseMessage = async () => {
    const personalOptData = await Promise.all(
        optElseMessage.map(async item => {
            const res = await queryUserParentId({ parentId: item.parentId })
            return res.result
        })
    )
    data.elseMessageInfo = personalOptData
    baseInfoList[0].children[4].showHeader[0].opt = data.elseMessageInfo[0]//信息技术应用能力

    const whetherOrNotArr = [{ name: '是' }, { name: '否' }]
    for (let i = 1; i <= 11; i++) {
        baseInfoList[0].children[4].showHeader[i].opt = whetherOrNotArr
    }

    // 
}
//用户字典信息教育教学之教育教学下拉框
const optEducationTeaching = [
    {
        parentId: 522,//任教课程  
    },
    {
        parentId: 523,//兼任工作  
    },
    {
        parentId: 524,//任教学段  
    },
    {
        parentId: 525,//任教班级类型  
    },
]
//教育教学之教育教学下拉框查询
const getSelectEducationTeaching = async () => {
    const personalOptData = await Promise.all(
        optEducationTeaching.map(async item => {
            const res = await queryUserParentId({ parentId: item.parentId })
            return res.result
        })
    )
    data.educationTeachingInfo = personalOptData
    tableList[0].children[0].tableHeader[3].opt = data.educationTeachingInfo[0]//任教课程
    // 
}

//根据级别查询所有的省份
const getUserArea = async () => {
    // const { code, msg, result } = ({} = await queryAreaFindByLevel({ level: 1 }))
    // // 
    let res = await findRegion({ token: localStorage.getItem('dslToken') })
    //  
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

    // if (code === 0 && result) {
    //     data.provinces = result
    // 
    baseInfoList[0].children[0].showHeader[16].opt = region//籍贯的省
    baseInfoList[0].children[0].showHeader[6].opt = region//出生地的省
    // }
}

//公告栏
const goNotice = () => {
    router.push({ path: '/announcement' })
}
//跳转到我的报送
const goSubmitted = () => {
    router.push('/mySubmissionTeacher')
}
//锚点定位
const goLocation = (row, column, event) => {
    // 
    if (row) {
        let id = row.category;
        showDetails(id)
    }


}

const showDetails = (id) => {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth", block: "start"});
    // nextTick(() => {
    //     window.scrollTo({ "behavior": "smooth", "top": el.offsetTop });
    // })
}
const showRef = ref(null)
const isShow = ref(false)
// const handleScroll = () => {
//       // 处理滚动事件的逻辑
//     let scrollTop =   document.documentElement.scrollTop || document.body.scrollTop
//     let show =  showRef.value.offsetHeight
//     console.log(scrollTop,show);
//      if(scrollTop>show/2){
//         isShow.value = true
//      }
// }
</script>
<template>
    <div class="personal">
        <div v-if="RoleType=='teacher'" class="personal_header flex al-center ">
            <div class="personal_header_btn m-t1">
                <el-button type="primary" @click="goNotice">系统公告</el-button>
                <el-button type="primary" @click="goSubmitted">我的报送</el-button>
            </div>
        </div>
        <div class="flex al-center m-t1 m-b1 m-l1" v-else>{{ top_title }}</div>
        <!-- 注释 -->
        <div class="personal_content">
            <div ref="leftWidth" class="personal_list">
                <div  v-if="RoleType=='teacher'" class="homeText cur-p">
                    首页
                </div>
                <el-table @row-click="goLocation" class="cur-p" :data="data.teacherInfoList" border :show-header="false"
                    style="width:180px">
                    <el-table-column align="center" prop="category" width="180" />
                </el-table>
            </div>
            <div class="personal_baseInfo" :class="RoleType=='teacher'?'teacher':'other'">
                <!-- 基本信息 -->
                <div ref="showRef"><Show v-for="(item, index) in baseInfoList" :key="index" :title="item.title" :showData="item.children"
                    :id="item.title" :unitobj="unitobj" :userTeacherId="userTeacherId" /></div> 
                <!-- 教育教学 -->
                <Table :userName="userName" :DepartmentInfo="data.DepartmentInfo" :isShow="isShow"
                    :userTeacherId="userTeacherId" />
                <!-- 学习经历 -->
                <StudyExperience :userName="userName" :userTeacherId="userTeacherId"></StudyExperience>
                <!-- 工作经历  -->
                <WorkExperience :userName="userName" :userTeacherId="userTeacherId"></WorkExperience>
                <!-- 岗位聘任信息 -->
                <PositionRecruitment :userName="userName" :userTeacherId="userTeacherId"></PositionRecruitment>
                <!-- 考核信息 -->
                <AssessmentInformation :userName="userName" :userTeacherId="userTeacherId"></AssessmentInformation>
                <!-- 资格证Certification -->
                <Certification :userName="userName" :userTeacherId="userTeacherId"></Certification>
                <!-- 研究成果 -->
                <ScientificPayoffs :userName="userName" :userTeacherId="userTeacherId"></ScientificPayoffs>
                <!-- 家庭信息FamilyInformation -->
                <FamilyInformation :userName="userName" :userTeacherId="userTeacherId"></FamilyInformation>
                <!-- 师德信息TeacherEthics -->
                <TeacherEthics :userName="userName" :userTeacherId="userTeacherId"></TeacherEthics>
                
            </div>
        </div>
       
        <ScrollTop />
    </div>
</template>

<style lang='less' scoped>
.personal {
    width: 100%;

    .personal_header {
        justify-content: flex-end;
        padding: 0 20px;
    }

    .homeText {
        margin-left: 70px;
        margin-bottom: 6px;
    }

    .personal_content {
      
        display: flex;
        margin: 0 10px;
        position: relative;

        .personal_list {
          
            height: 400px;
           
        }
        .teacher{
            width: calc(100vw - 200px) !important;
            height: calc(100vh - 82px);
        }
        .other{
            width: calc(100vw - 294px - 200px) !important;
            height: calc(100vh - 160px);
        }

        .personal_baseInfo {
            overflow: auto;
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            margin-top: 20px;
            padding-right: 30px;
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

                .merge-row {
                    grid-row: span 5;
                }
            }
        }
    }
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}


</style>
<style>
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
</style>