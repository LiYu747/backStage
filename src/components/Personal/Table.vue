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
                 <div v-if="index1 == 0" class="personal_table">
                  <el-table  :span-method="objectSpanMethod" :data="item1.tableContent" border> 
                      <!-- 表格业务内容列 -->
                      <template v-for="(item, index) in item1.tableHeader" :key="index">
                         <el-table-column v-if="item.type == 'date'" :prop="item.prop2" :label="item.label"
                           header-align="center" align="center">
                           <template #default="scope">
                             <el-tag v-if="item.newId">新</el-tag>
                             <!-- {{  transitionDate(scope.row[item.prop2]) }} -->
                             {{scope.row[item.prop2]!='' ? transitionDate(scope.row[item.prop2]):scope.row[item.prop2] }}
                           </template>
                         </el-table-column>
                         <el-table-column v-if="item.type == 'compile'" :prop="item.prop2" :label="item.label"
                         header-align="center" align="center">
                         <template #default="scope">
                          <el-button link type="primary" class="btnClass" @click="Edit(index1, scope.row, 'edit')">编辑</el-button>
                         </template>
                       </el-table-column>
                         <el-table-column v-else :prop="item.prop2" :label="item.label" header-align="center"
                           align="center">
                           <template #default="scope">
                             {{ scope.row[item.prop2] }}
                             <el-tag v-if="scope.row.isNew&&index==7">新</el-tag>
                           </template>
                         </el-table-column>
                      </template>
                  </el-table>
              </div>
                 <div v-else class="personal_table">
                     <el-table  :data="item1.tableContent" border> 
                         <!-- 表格业务内容列 -->
                         <template v-for="(item, index) in item1.tableHeader" :key="index">
                        <el-table-column v-if="item.type == 'date'"  :prop="item.prop2" :label="item.label"
                            header-align="center" align="center">
                            <template #default="scope">
                                <el-tag v-if="index==0&&scope.row.newId">新</el-tag>
                                {{scope.row[item.prop2]!='' ? transitionDate(scope.row[item.prop2]):scope.row[item.prop2] }}
                            </template>
                        </el-table-column> 
                           <el-table-column v-else-if="item.type == 'upload'" :prop="item.prop2" :label="item.label"
                             header-align="center" align="center">
                             <template #default="scope"> 
                             <el-button v-if="scope.row.attachmentName" link type="primary" @click="download(index1, scope.row)">下载</el-button>
                             <div v-else>无</div>
                             </template>
                           </el-table-column>
                           <el-table-column v-else :prop="item.prop2" :label="item.label" header-align="center"
                             align="center">
                             <template #default="scope">
                               <el-tag v-if="index==0&&scope.row.newId">新</el-tag>
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
                 <div class="table_page" v-if="index1 >0">
                     <el-pagination v-model:current-page="item1.page" v-model:page-size="item1.size"
                         :page-sizes="[5, 10, 15, 20]" :small="small" :background="background"
                         layout="total,  prev, pager, next, jumper" :total="item1.allPage" 
                         @current-change="handleCurrentChange($event,index1)">
                     </el-pagination>
                 </div>
                 <FormAdd :newData="newData"  :Myform="educationAndTraining.children" :titles="educationAndTraining.title" v-if="index1 == 0"  :dialogType="dialogType" @newly="newly" :content="content" @changeFist="changeFist"  :title="item1.info" ref="formAdd"
                 :formHeader="item1.tableHeader" @isHead="addNewly" />
                 <FormList :Myform="educationAndTraining.children" :titles="educationAndTraining.title" v-else :dialogType="dialogType" @newly="newly" :content="content" @changeFist="changeFist" :formIndex="index1" :title="item1.info" ref="form"
                     :formHeader="item1.tableHeader" @isHead="isHead" />
                
             </div>
         </div>
    </div>
 </template>
 
<script setup>
import { getSemester,queryDictByType,gradeSchoolId ,schoolStage,classEduClass} from "@/api/dsl.js"; 
import { queryUserEducationSemesterIds } from "@/api/educationTeaching.js"; //教育教学
import { queryUserOpenClass } from "@/api/openClass.js"; //公开课
import { queryUserSupportEducation } from "@/api/supportEducation.js";//承担市外支教任务情况
import { ref, reactive, onMounted } from 'vue'
import { queryUserParentId, queryAreaFindByPid, queryAreaFindByLevel } from "@/api/dict.js";//用户字典信息
import { transitionDate, transitionDateYear, transitionDateMonth,transitionJab,tarTime } from "@/utils/handleData/handleData.js";//使用封装函数
import { UserApplyInfo } from "@/api/applyApi.js";//报送
import { ElMessage } from 'element-plus'
import { downloadFileBySaveAs } from '@/views/backlogList/components/Examine.js'
import lodash from 'lodash'
const form = ref(null)
const dialogType = ref("add")//选择的类型
const content = ref(null) //选择的内容
// 下载
const download = (index,item) => {
  downloadFileBySaveAs(item.attachment, item.attachmentName)
}
//新增
const Add = (idx, name) => {
    if(educationAndTraining.value.children[idx].newAddObj){
        ElMessage({
        message: '请先报送之前的数据',
        type: 'warning',
        })
        return
    }
    dialogType.value = name
    form.value[idx-1]?.upLose()
}
 //报送
const   targetType  = ['educationTeaching','openClass','supportEducation']
const Submitted = async(index) => {
    if(index == 0){
      educationSubmission()
      return
    }
    let newAdd = educationAndTraining.value.children[index].newAddObj //判断是否为新增
    if(newAdd){
      newAdd.teacherId = props.userTeacherId
      tarTime(newAdd)
      const applyInfoData = reactive({
      applyType: "UPDATE",//必传
      teacherId:props.userTeacherId,//必传
      targetId:"",//新增不传，编辑传当前对象id
      targetName: targetType[index],
      teacherName:props.userName,
      variables: newAdd,
      })
      const { code, msg, result } = ({} = await UserApplyInfo({
      ...applyInfoData
    }))
    if(code == 0){
        delete educationAndTraining.value.children[index].newAddObj
        delete educationAndTraining.value.children[index].newObj
    }
    console.log(code, msg, result, "报送信息");
    }else{
    let educationVal = educationAndTraining.value.children[index].newObj
    if(!educationVal){
        ElMessage({
        message: '请先新增或者编辑报送信息',
        type: 'warning',
        })
        return
    }
    tarTime(educationVal)
    const applyInfoData = reactive({
    applyType: "UPDATE",//必传
    teacherId:props.userTeacherId,//必传
    targetId:editTargetId.value,//新增不传，编辑传当前对象id
    targetName: targetType[index],
    teacherName:props.userName,
    variables: educationVal,
    })
    const { code, msg, result } = ({} = await UserApplyInfo({
    ...applyInfoData
    }))
    if(code == 0){
        delete educationAndTraining.value.children[index].newObj
        ElMessage({
                message: '报送成功,请耐心等待',
                type: 'success',
            })
    }
    console.log(code, msg, result, "报送信息");
    }
   
}
//新增完成
const newly = (item,index) => {
    ElMessage({
    message: '新增成功，请点击报送按钮',
    type: 'success',
    })
    educationAndTraining.value.children[index].tableContent.unshift({...item,newId:true})
    educationAndTraining.value.children[index].newAddObj = item
  
    
}
//编辑完成
const isHead = (id,v,idx) => {
  if(JSON.stringify(v) !== '{}'){
    ElMessage({
    message: '修改成功，请点击报送按钮',
    type: 'success',
    })
  }
    educationAndTraining.value.children[idx].newInfo = id
    educationAndTraining.value.children[idx].newObj = v 
}
//教育教学报送
const educationSubmission = async() => {
  let tableContent =  educationAndTraining.value.children[0].tableContent
  let list = []//拿到所有的编辑的列表
  tableContent.map( item => {
    if(item.semester == editSemester.value){
      list.push(item)
    }
  })
  let semesterId = 0
  let teacherId = 0
  let edID = 0
  educationList.value.map( item => {//从原数据拿到需要的值
    if(item.semester == editSemester.value){
      semesterId = item.semesterId
      teacherId = item.teacherId
      edID = item.id
    }
  })
  let filterMsg = []
  let rule = [] //记录原始数值
  originalRule.value.map(item =>{
      if(item.semester == editSemester.value){
        rule.push(item)
      }
  })
  if(list.length > rule.length){
    filterMsg = list.slice(rule.length)
    filterMsg.map(x => {
      x.id = ""
    })
  }
  list.forEach((item,index) => {
    rule.forEach((opt,idx) => {
     if(index == idx){
      if(item.course != opt.course||item.classType!= opt.classType||item.jointClass != opt.jointClass||item.section != opt.section){
        filterMsg.push(item)
     }
     }
    })
  })
  if(list.hour != rule.hour || list.partJob != rule.partJob || list.teachingSituation != rule.teachingSituation){
    if(filterMsg.length == 0){
    ElMessage({
        message: '请先编辑报送信息',
        type: 'warning',
        })
    return
  }
  }
  let schoolGradeSave = []
  filterMsg.forEach( item => {
     let msg = {
				classKey: item.classMsg&&item.classMsg.classId?item.classMsg.classId:item.classKey,
				classType: item.classType,
				course: item.course,
				delOld: false,
				gradeKey: item.remMsg&&item.remMsg.gradeId?item.remMsg.gradeId:item.gradeModel.gradeKey,
				id:item.id?item.id:'',
				name: item.jointClass,
				schoolGradeSaveVO: {
					gradeKey: item.remMsg&&item.remMsg.gradeId?item.remMsg.gradeId:item.gradeModel.gradeKey,
					name: item.remMsg&&item.remMsg.gradeName?item.remMsg.gradeName:item.gradeModel.class,
					schoolKey: item.gradeModel.schoolKey,
					section: item.section
				},
				schoolKey:item.gradeModel.schoolKey
      }
      schoolGradeSave.push(msg)
  })
   const variable = {
    hour:list[0].hour, //课时
		partJob: list[0].partJob,//兼职工作
    semester:editSemester.value,//学期
		semesterId:semesterId,//学期id
		teacherId: teacherId,//教师id新增必
		teachingSituation: list[0].teachingSituation,//任教情况
		schoolClassSaveVOS: schoolGradeSave
    }
    const applyInfoData = reactive({
      applyType: "UPDATE",//必传
      teacherId:props.userTeacherId,//必传
      targetId:edID,//新增不传，编辑传当前对象id
      targetName:'educationTeaching',
      teacherName:props.userName,
      variables: variable,
      })
    const res =  await UserApplyInfo({
    ...applyInfoData
    })
    if(res.code == 0){
        ElMessage({
                message: '报送成功,请耐心等待',
                type: 'success',
        })
    }

    console.log(res);
}
//教育教学编辑完成
const addNewly = (fromOptions,increase) => {
  console.log('fromOptions,increase: ', fromOptions,increase);
  let tableContent =  educationAndTraining.value.children[0].tableContent
  let array = []
  let flag = false
  tableContent.map( item => { //拿到对应的列表
    if(item.semester == fromOptions.semester){
      array.push(item)
    }
  })
  if(increase.length>array.length){ //判断是否有新增
    let num = increase.length - array.length
    for(let i = 0; i < num; i++){
      fromOptions.isNew = true
      array.push(fromOptions)
    }
  }
  array.map( (item,index) => {
    if(item.hour!=fromOptions.hour||item.partJob!=fromOptions.partJob || item.teachingSituation!=fromOptions.teachingSituation){
      flag = true
    }
    item.hour = fromOptions.hour
    item.partJob = fromOptions.partJob
    item.teachingSituation = fromOptions.teachingSituation
    increase.map( (opt,idx) => {
       if(index == idx){
        item.section = opt.list[0].value
        item.course = opt.list[1].classNum.value2
        item.classType = opt.list[2].value
        item.class = opt.list[3].addPush.value1
        item.jointClass = opt.list[3].addPush.value2
        item.remMsg = opt.list[3].remMsg
        item.classMsg = opt.list[3].classMsg
       }
    })
  })
  let rule = [] //记录原始数值
  originalRule.value.map(item =>{
      if(item.semester == editSemester.value){
        rule.push(item)
      }
  })
  array.map((item,index) => {
    rule.map((opt,idx) => {
     if(index == idx){
      if(item.course != opt.course||item.classType!= opt.classType||item.jointClass != opt.jointClass||item.section != opt.section){
        item.isNew = true;
      }
     }
    })
  })
  
  array.forEach(item => {
   if(item.isNew){
    flag = true;
    return
   }
  })
  if(flag){
    ElMessage({
    message: '修改成功，请点击报送按钮',
    type: 'success',
    })
  }
  console.log('array',array,rule);
  educationAndTraining.value.children[0].tableContent = array
  getSpanArr()
}
//编辑
const editTargetId = ref(0)
const editSemester = ref('') //编辑的学期名字
const formAdd = ref(null)
const newData = ref([])
const thickData = ref([])
const Edit = async(idx, value, name) => {
  if(idx == 0){
    let arr = []
    educationAndTraining.value.children[0].tableContent.forEach( opt => {
      if(opt.semester == value.semester){
       arr.push(opt)
      }
    })
    newData.value = arr
    thickData.value =  lodash.cloneDeep(arr)
    await getClassType(value.gradeModel.schoolKey)
    dialogType.value = name//编辑
    content.value = value//编辑的内容
    editTargetId.value = value.id
    editSemester.value = value.semester
    formAdd.value[idx]?.upLose()//打开组件
    return
  }
    dialogType.value = name//编辑
    content.value = value//编辑的内容
    editTargetId.value = value.id
    form.value[idx-1]?.upLose()//打开组件
}
const  objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
      // console.log(spanArr[rowIndex * colFields.length + columnIndex]);
      return spanArr[rowIndex * colFields.length + columnIndex];
    }
const  spanArr = []//存储合并单元格的开始位置  
const colFields = [
        "semester",
        "teachingSituation",
        "partJob",
        "hour",
        "section",
        "course",
        "classType",
        "jointClass",
        "compile"
      ]
const getSpanArr = () => {
   let  table =  educationAndTraining.value.children[0].tableContent
   for (let i = 0; i < table.length; i++) {
        let row = i;
        // let col = i % this.colCount;
        if (row === 0) {
          // i 表示行 j表示列
          for (let j = 0; j < colFields.length; j++) {
            spanArr[i * colFields.length + j] = {
              rowspan: 1,
              colspan: 1,
            };
          }
        } else {
          for (let j = 0; j < colFields.length; j++) {
            // 当前和上一次的一样
            //  合并所有列的相同数据单元格
            if (
              colFields[j] == "semester" ||
              colFields[j] == "teachingSituation" ||
              colFields[j] == "compile"||
              colFields[j] == "partJob"||
              colFields[j] == "hour"
            ) { // 指定合并哪些列
              
              if (
                table[row]["semester"] !==
                  table[row - 1]["semester"]
              ) { // 哪些不合并:School不一样的,不合并
                spanArr[row * colFields.length + j] = {
                  rowspan: 1,
                  colspan: 1,
                };
              } else if (
                table[row][colFields[j]] ===
                table[row - 1][colFields[j]]
              ) {
                let beforeItem =
                spanArr[(row - 1) * colFields.length + j];
                spanArr[row * colFields.length + j] = {
                  rowspan: 1 + beforeItem.rowspan,// 合并几列
                  colspan: 1,// 合并几行
                };
                beforeItem.rowspan = 0;
                beforeItem.colspan = 0;
              } else {
                // rowspan 和 colspan 都为1表格此单元格不合并
                spanArr[row * colFields.length + j] = {
                  rowspan: 1,
                  colspan: 1,
                };
              }
            }

          
          }
        }
      }
      // 对数据进行倒序
      let stack = [];
      for (let i = 0; i < colFields.length; i++) {
        for (let j = 0; j < table.length; j++) {
          // console.log("i=" + i + " j=" + j);
          // i 表示列 j表示行
          if (j === 0) {
            if (spanArr[j * colFields.length + i].rowspan === 0) {
              stack.push(spanArr[j * colFields.length + i]);
            }
          } else {
            if(spanArr[j * colFields.length + i]){
              if (spanArr[j * colFields.length + i].rowspan === 0) {
              stack.push(spanArr[j * colFields.length + i]);
            } else {
              stack.push(spanArr[j * colFields.length + i]);
              while (stack.length > 0) {
                let pop = stack.pop();
                let len = stack.length;
                spanArr[(j - len) * colFields.length + i] = pop;
              }
            }
            }
          }
        }
      }
      // console.log(spanArr);
    }
const Download = (value) => {
    console.log(value, "下载");
}
const Upload = (value) => {
    console.log(value, "上传");
}
const props = defineProps({
    userName:String,
    userTeacherId:Number,
    DepartmentInfo:{
      type:Array
    },
    isShow:{
      type:Boolean,
      default:false
    }
})
//获取年级
const getClassType = async(id) => {
 if(educationAndTraining.value.children[0].tableHeader[7].opt.length>0) return
 let res = await gradeSchoolId(id)
 educationAndTraining.value.children[0].tableHeader[7].opt = res.data.data//获取年级
//  let ret = await schoolStage({//获取学段
//   schoolIds:id
//  })
//  console.log('学段',ret.data.data);
}

//使用父组件传递过来的值
const { title, tableData } = toRefs(props)
//默认第几页
const currentPage4 = ref(0)
// 每页显示条目个数
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(true)
//分页
const handleCurrentChange = (val,index) => {
   if(index == 0) {
    educationPage.value = val - 1
    getUserEducationTeaching()
   }
   if(index == 1) {
    openClassPage.value = val - 1
    getUserOpenClass()
   }
   if(index==2){
    supportPage.value = val - 1
    getUserSupportEducation()
   }
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
//获取二级选项
const changeFist = async(id) => {
   let res =  await queryUserParentId({ parentId: id})
   educationAndTraining.value.children[0].tableHeader[3].opt2 = res.result
}
//教育教学之教育教学下拉框查询
const getSelectEducationTeaching = async () => {
    const personalOptData = await Promise.all(
        optEducationTeaching.map(async item => {
            const res = await queryUserParentId({ parentId: item.parentId })
            return res.result
        })
    )
    educationAndTraining.value.children[0].tableHeader[5].opt = personalOptData[0]//任教课程
    educationAndTraining.value.children[0].tableHeader[2].opt = personalOptData[1]//兼任工作
    educationAndTraining.value.children[0].tableHeader[4].opt = personalOptData[2]//任教学段
    educationAndTraining.value.children[0].tableHeader[6].opt = personalOptData[3]//任教班级类型
    console.log(personalOptData, "教育教学之教育教学下拉框查询");
}

//承担教育教学
const educationPage = ref(0) 
const educationList = ref([]) //原数据
const originalRule = ref([])//原始处理后的数据
const getUserEducationTeaching = async (val) => {
    const ret = await getSemester({page:1});
    let res = ret.data.data.data
    let ids = ''
    res.map( item =>{
        ids += item.semesterId +','
    })
    const resData = await queryUserEducationSemesterIds({
      semesterIds:ids, //
      teacherId: props.userTeacherId,
    })
    if(!resData) return
    educationList.value =  resData.result
    console.log('根据学期',resData);
    let arr = []
    resData.result.map( item => {
      let str = {
        hour:item.hour,
        partJob:item.partJob,
        semester:item.semester,
        teachingSituation:item.teachingSituation
      }
      item.classModels.map( opt => {
        opt.class = opt.gradeModel.name
        opt.section = opt.gradeModel.section
        opt.arr = {...str,...opt}
        arr.push( opt.arr)
      })
     
    })
    arr.map( item => {
      item.jointClass =item.name
    })
    educationAndTraining.value.children[0].tableContent = arr
    originalRule.value = lodash.cloneDeep(arr)
    getSpanArr()
    // const ret2 = await queryDictByType({type:'secondaryVocationalSubject'});
    // console.log("queryDictByType--------------",ret2);
}
// 获取用户公开课
const openClassPage = ref(0)
const getUserOpenClass = async (val) => {
    const { code, msg, result } = ({} = await queryUserOpenClass({
        teacherId: props.userTeacherId,
        page: openClassPage.value,
        sort:'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[1].tableContent = result.content
        educationAndTraining.value.children[1].allPage = result.totalElements
    }
}
//获取承担市外支教任务情况
const supportPage = ref(0)
const getUserSupportEducation = async (val) => {
    const { code, msg, result } = ({} = await queryUserSupportEducation({
        teacherId:props.userTeacherId,
        page: supportPage.value,
        sort:'createdAt,desc',
        size: 10
    }))
    if (code === 0 && result) {
        educationAndTraining.value.children[2].tableContent = result.content
        educationAndTraining.value.children[2].allPage = result.totalElements
    }
    // console.log(code, msg, result, result.totalElements, "获取承担市外支教任务情况");
}
//监听获取组织结构
watch(()=>props.isShow,()=> {
  
   
})
onMounted(() => {
  getSelectEducationTeaching()//教育教学下拉框查询
    getUserEducationTeaching()//获取教育教学
    getUserOpenClass()//公开课
    getUserSupportEducation()//支教任务
  
})
const isDecimal = (num) => {
  return num % 1 !== 0;
};
//课时
const teacherAgeLimit_regular = (rule, value, callback) => {
  if (value === '' || value === null) {
    callback(new Error('请填写课时'))
  } else if (value <= 0 || value + '' === '-0') {
    callback('课时不能低于0');
    educationAndTraining.value.children[0].tableHeader[3].value = 'blank'
  } else if (isDecimal(value)) {
    callback('请输入整数');
    educationAndTraining.value.children[0].tableHeader[3].value = 'blank'
  }else{
    callback();
  }
}
//学生人数
const studentNumber_regular = (rule, value, callback) => {
  if (value === '' || value === null) {
    callback(new Error('请填写学生人数'))
  } else if (value <= 0 || value + '' === '-0') {
    callback('学生人数不能低于0');
    educationAndTraining.value.children[1].tableHeader[3].value = 'blank'
  } else if (isDecimal(value)) {
    callback('请输入整数');
    educationAndTraining.value.children[1].tableHeader[3].value = 'blank'
  }else{
    callback();
  }
}
const startTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[2].tableHeader[1].value
  console.log('start: ',start,);
  let end = educationAndTraining.value.children[2].tableHeader[2].value
  console.log('end: ', end);
  if (value === '' || value === null) {
    callback(new Error('请选择开始日期'))
  } else {
    console.log( transitionJab(start) , transitionJab(end));
    if (transitionJab(start) > transitionJab(end)) {
      callback('开始日期不能大于结束日期')
      educationAndTraining.value.children[2].tableHeader[1].value = 'blank'
    } else {
      callback()
    }

  }
}

const endTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[2].tableHeader[1].value
  let end = educationAndTraining.value.children[2].tableHeader[2].value
  if (value === '' || value === null) {
    callback()
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('结束日期不能大于开始日期')
      educationAndTraining.value.children[2].tableHeader[2].value = 'blank'
    } else {
      callback()
    }
  }
}
const educationAndTraining = ref( {
    title: '教育教学',
    children: [
      {
        info: '教育教学',
        isBtn: false,
        isOperate: true,
        isAnnex: true,
        allPage:0,
        number : 1,
        size : 10,
        tableHeader: [
          {
            prop2: "semester",
            label: "学期",
            value: "",
            type: "input",
            isMust: false,
            isDisable: true,
          },
          {
            prop2: "teachingSituation",
            label: "任教状况",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            rules: [
              { required: true, message: '请选择任教状况', trigger: 'blur' },
            ],
            opt: [{
              name:'任教'
            },
            {
              name:'未任教'
            }],
            sName: {},
          },
          {
            prop2: "partJob",
            label: "兼任工作",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            // rules: [
            //   { required: true, message: '请选择授课日期', trigger: 'blur' },
            // ],
            opt: [],
            sName: {},
          },
          {
            prop2: "hour",
            label: "课时",
            value: "",
            type: "number",
            isMust: false,
            isDisable: false,
            rules: [
              { required: true, validator:teacherAgeLimit_regular, trigger: 'change' },
            ],
          },
          {
            prop2: "section",
            label: "任教学段",
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择任教学段', trigger: 'blur' },
            ],
            opt: [],
            sName: {},
          },
          {
            prop2: "course",//第二级
            label: "任教课程",
            value: "",
            type: "select2",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择授课日期', trigger: 'blur' },
            ],
            classNum:{
              value1:'',
              value2:''
            },
            opt: [],//第一级
            opt2: [],//第二级
          },
          
          {
            prop2: "classType",
            label: "任教班级类型",
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择任教班级类型', trigger: 'blur' },
            ],
            opt: [],
            sName: {},
          },
          {
            prop2: "jointClass",
            label: "任教班级",
            // isClass: true,
            value: "",
            type: "addFunction",
            isMust: false,
            isDisable: false,
            rules: [
              { required: true, message: '请选择任教班级', trigger: 'blur' },
            ],
            addPush:
              {   
               prop2: "grade",
               value1: "",
               value2: "",
             },
             remMsg:{},//年级
             classMsg:{},//班级
             opt: [],//年级
            gradeList:[],//班级
          },
         
          {

            prop2: "compile",
            label: "操作",
            value: "",
            type: "compile",
            isMust: false,
            isDisable: false,
          },
        ],
        tableContent: [],
        // allPage:Number,

      },
      {
        info: '承担公开课等情况',
        isOperate: true,
        isBtn: true,
        isAnnex: true,
        allPage:0,
        number : 1,
        size : 10,
        tableHeader: [
          {
            prop2: "lectureDate",
            label: "授课日期",
            value: "",
            type: "date",
            isMust: true,
            isDisable: false,
            width:'150px',
            rules: [
              { required: true, message: '请选择授课日期', trigger: 'blur' },
            ],
            time: 'time',
          },
          {
            prop2: "teachingCourseTitle",
            label: "讲授课程名称",
            width:'150px',
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入讲授课程名称', trigger: 'blur' },
            ],
          },
          {
            prop2: "teachingObject",
            label: "授课对象",
            width:'150px',
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入授课对象', trigger: 'blur' },
            ],
          },
          {
            prop2: "studentNumber",
            label: "学生数",
            width:'150px',
            value: 0,
            type: "number",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true,validator:studentNumber_regular, trigger: 'change' },
            ],
          },
          {
            prop2: "organizationUnit",
            label: "组织单位",
            width:'150px',
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入组织单位', trigger: 'blur' },
            ],
            opt:[]
          },
          {
            prop2: "attachment",
            label: "附件",
            width:'150px',
            value:"",
            type:"upload",
          },
        ],
        tableContent: [
        ],
      },
      {
        info: '承担市外支教任务情况',
        isOperate: true,
        isAnnex: true,
        allPage:0,
        number : 1,
        size : 10,
        isBtn: true,
        tableHeader: [
          {
            prop2: "supportEducationUnit",
            label: "支教学校/单位",
            value: "",
            type: "input",
            isMust: true,
            width:'150px',
            isDisable: false,
            rules: [
              { required: true, message: '请输入承担市外支教任务情况', trigger: 'blur' },
            ],
          },
          {
            prop2: "supportEducationStart",
            label: "支教开始时间",
            value: "",
            width:'150px',
            type: "date",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true,validator:startTime_2, trigger: 'change' },
            ],
            time: "time",
          },
          {
            prop2: "supportEducationEnd",
            label: "支教结束时间",
            value: "",
            type: "date",
            width:'150px',
            isMust: false,
            isDisable: false,
            rules: [
              { required: false,validator:endTime_2, trigger: 'change' },
            ],
            time: "time",
          },
          {
            prop2: "supportEducationOrganization",
            label: "支教组织单位",
            value: "",
            type: "input",
            width:'150px',
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入支教组织单位', trigger: 'blur' },
            ],
          },
        ],
        tableContent: [],
      },
    ]
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