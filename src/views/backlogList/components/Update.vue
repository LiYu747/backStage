<template>
  <div>
    <!-- <backlog ref="vail" title="人员" :formData="personnel"></backlog> -->
    <Personnel ref="vailss"  :formData="personnel"></Personnel>

    <div v-if="targetName == 'educationTeaching'">
      <formUpdate :tableContent="tableContent"></formUpdate>
    </div>
    <div v-else>
      <upDateLog v-if="targetId" :title="title" :attachment="originalUrl" :formData="formData"></upDateLog>
    </div>
    <div v-if="targetId" class="changeText">变更为</div>
    <div v-else class="changeText"> 新增</div>
    <div v-if="targetName == 'educationTeaching'">
      <formUpdate ref="refFormUpdate" :tableContent="changeCon"></formUpdate>
    </div>
    <div v-else>
      <upDateLog ref="vail" :title="title" :attachment="attachment" :formData="changeData"></upDateLog>
    </div>
  </div>
</template>
<script setup>
import backlog from './backlog.vue'
import Personnel from './personnel.vue'
import upDateLog from './upDateLog.vue'
import formUpdate from './formUpdate.vue'
import lodash from 'lodash'
import { findTeacherSimpleByTeacherId } from '@/api/personal'
import {
  findByTeacherId,
  findById,
  formByTeacherId
} from '../../../api/apply.js'
import {
  getType
} from './updata.js'
import {
  timestampToTime
} from './Examine.js'
import { transitionDate, transitionDateYear, transitionDateMonth, transitionJab } from "@/utils/handleData/handleData.js";//使用封装函数
import { useRoute } from 'vue-router'
const route = useRoute()
const changeData = ref([])
const originalUrl = ref('')
const formData = ref([])
const title = ref('')
//获取信息
const getFindByTeacherId = async (type, teacherId, id) => {
  let info = getType(type)
  // console.log('type: ', type);
  let res = await findByTeacherId(type, {
    teacherId: teacherId
  })
  // console.log('res2000000: ', res);
  res.result.address = res.result.birthplaceProvince + res.result.birthplaceCity + res.result.birthplaceDistrict;//出生地
  res.result.nativePlace = res.result.nativePlaceProvince + res.result.nativePlaceCity + res.result.nativePlaceDistrict;//籍贯
  let result = res.result
  if (!result) return
  info.showHeader.map(item => {
    item.value = dataProcessing(item.prop, result, item.type)
  })

  changeData.value = JSON.parse(JSON.stringify(info.showHeader))
  title.value = info.info
  formData.value = info.showHeader
  getFindById(id)
}
const dataProcessing = (prop, result, type) => {
  if (!result[prop]) return ''
  let str
  str = result[prop]

  if (type == 'date' && str) {
    str = timestampToTime(str)
  } else if (type == 'dateYear' && str) {
    str = transitionDateYear(str)
  }
  return str
}
const refFormUpdate = ref(null)
const vail = ref(null)
const getFindById = async (id) => {
  let res = await findById({
    id: id
  })
  if (!res.result) return
  let variables = JSON.parse(res.result.variables);
  if (variables.attachment) {
    attachment.value = variables.attachment
  }
  if (targetName.value == 'educationTeaching') { //当为教育教学时
    changeCon.value.map((item, index) => {
      item.hour = variables.hour
      item.teachingSituation = variables.teachingSituation
      item.partJob = variables.partJob
      variables.schoolClassSaveVOS.forEach(opt => {
        if (item.id == opt.id) {
          item.isNew = true
          item.section = opt.schoolGradeSaveVO.section
          item.course = opt.course
          item.classType = opt.classType
          item.jointClass = opt.name
          return
        }

      })
    })
    variables.schoolClassSaveVOS.forEach(opt => {
      if (!opt.id) {
        let arr = {
          semester: variables.semester,
          hour: variables.hour,
          teachingSituation: variables.teachingSituation,
          partJob: variables.partJob,
          isNew: true,
          section: opt.schoolGradeSaveVO.section,
          course: opt.course,
          classType: opt.classType,
          jointClass: opt.name
        }
        changeCon.value.push(arr)
        refFormUpdate.value.exportAdd()
      }
    })

    return
  }
  if (variables.birthplaceProvince) {
    variables.address = variables.birthplaceProvince + variables.birthplaceCity + variables.birthplaceDistrict;//出生地
  }
  if (variables.birthplaceProvince) {
    variables.nativePlace = variables.nativePlaceProvince + variables.nativePlaceCity + variables.nativePlaceDistrict;//籍贯
  }
  console.log('variables: ', variables);
  changeData.value.map(item => {
    for (let obj in variables) {
      if (item.prop == obj) {
        item.isNew = true
        item.value = dataProcessing(item.prop, variables, item.type)
      }
    }
  })
  vail.value?.add()
  console.log(changeData.value);
}
//新增
const attachment = ref('')
const newGetFindById = async (id, type) => {
  let info = getType(type)
  // console.log(info);
  let res = await findById({
    id: id
  })
  if (!res.result) return
  let variables = JSON.parse(res.result.variables)
  console.log('variables: ', variables);
  if (variables.attachment) {
    attachment.value = variables.attachment
  }
  info.showHeader.map(item => {
    item.value = dataProcessing(item.prop, variables, item.type)
  })
  changeData.value = JSON.parse(JSON.stringify(info.showHeader))

  title.value = info.info
}
//表格
const tableContent = ref([]) //教育教学数据
const changeCon = ref([]) //改变后的数据
const getFormUpdate = async (name, id, byId) => {
  let info = getType(name)
  let res = await formByTeacherId(name, {
    id: id
  })
  //  getFindById(byId)/////////////////修改后的数据
  let result = res.result
  console.log('result:原来数据 ', res);
  if (!result) return
  if (targetName.value == 'educationTeaching') { //当为教育教学时
    let arr = []
    let str = {
      hour: result.hour,
      partJob: result.partJob,
      semester: result.semester,
      teachingSituation: result.teachingSituation
    }
    result.classModels.map(opt => {
      opt.class = opt.gradeModel.name
      opt.section = opt.gradeModel.section
      opt.arr = { ...str, ...opt }
      arr.push(opt.arr)
    })
    arr.map(item => {
      item.jointClass = item.name
    })
    tableContent.value = arr
    changeCon.value = lodash.cloneDeep(arr)
    getFindById(byId)
    return
  }
  info.showHeader.map(item => {
    item.value = dataProcessing(item.prop, result, item.type)
  })
  if (result.attachment) {
    originalUrl.value = result.attachment
  }
  changeData.value = JSON.parse(JSON.stringify(info.showHeader))
  title.value = info.info
  formData.value = info.showHeader
  getFindById(byId)
}
const targetId = ref(null)
const targetName = ref('')
onMounted(() => {
  targetId.value = route.query.targetId
  targetName.value = route.query.targetName
  let arr = ["staff", "authorizedStrength", "inAuthorizedStrength", "notAuthorizedStrength", "elseMessage"]
  let flag = arr.includes(route.query.targetName)
  if (!route.query.targetId) { //新增
    newGetFindById(route.query.id, route.query.targetName)
  }
  else {
    if (flag) {
      getFindByTeacherId(route.query.targetName, route.query.teacherId, route.query.id)
    } else {
      getFormUpdate(route.query.targetName, route.query.targetId, route.query.id)
    }
  }
  getteach()
});
//根据teacherId查询个人简单信息
const vailss = ref(null)
const getteach = async () => {
  const { result, code } = await findTeacherSimpleByTeacherId({ teacherId: route.query.teacherId })
  if (code == 0) {
    personnel.value.forEach(item => {
      const key = item.prop;
      if (key in result) {
        item.value = result[key];
      }
    });
    vailss.value?.add()
  }
}


//人员信息
const personnel = ref([
  {
    label: "工号",
    type: "input",
    prop: "teacherJobId",
    value: "",
    readonly: true,
    iptWid: "260px",
    // width: "100px",
  },
  {
    label: "姓名",
    type: "input",
    prop: "name",
    value: "",
    readonly: true,
    iptWid: "260px",
    // width: "100px",
  },
  {
    label: "性别",
    type: "input",
    prop: "sex",
    value: "",
    readonly: true,
    iptWid: "260px",
    // width: "100px",
  },
  {
    label: "证件号码",
    type: "input",
    prop: "idNumber",
    value: "",
    readonly: true,
    iptWid: "290px",
    // width: "100px",
  },
  {
    label: "编制单位(用工单位)",
    type: "input",
    prop: "organizationUnit",
    value: "",
    width: "175px",
    iptWid: '530px',
    readonly: true,
  },
  {
    label: "工作单位",
    type: "input",
    prop: "workName",
    value: "",
    iptWid: '520px',
    readonly: true,
  },

]);

</script>



<style lang="less" scoped>
.changeText {
  font-size: 20px;
  font-weight: bold;
}

.information {
    width: 1500px;
    margin-left: 79px;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;

    .information_box {
        width: 500px;
        line-height: 30px;

        .label {
            // font-weight: 600;
            margin-right: 10px;
        }
    }
}

</style>