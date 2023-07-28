
//标准时间转时间戳
const transitionJab = (val) => {
  const date = new Date(val) * 1
  return date
}
/* 学习经历 */
const startTime = (rule, value, callback) => {
  let start = educationAndTraining.value.children[0].tableHeader[0].value
  let end = educationAndTraining.value.children[0].tableHeader[1].value
  if (value === '' || value === null) {
    callback(new Error('请选择入学年月'))
  } else if (transitionJab(start) >= transitionJab(end)) {
    callback('入学年月不能大于或等于毕业年月')
    educationAndTraining.value.children[0].tableHeader[0].value = 'blank'
  } else {
    callback()
  }


}

const endTime = (rule, value, callback) => {
  let start = educationAndTraining.value.children[0].tableHeader[0].value
  let end = educationAndTraining.value.children[0].tableHeader[1].value
  if (value === '' || value === null) {
    callback(new Error('请选择毕业年月'))
  } else if (transitionJab(start) >= transitionJab(end)) {
      callback('毕业年月不能大于或等于入学年月')
      educationAndTraining.value.children[0].tableHeader[1].value = 'blank'
    } else {
      callback()
    }

}

const aDegreeInTime = (rule, value, callback) => {
  let aDegreeIn = educationAndTraining.value.children[0].tableHeader[13].value
  let end = educationAndTraining.value.children[0].tableHeader[1].value
  if (value === '' || value === null) {
    callback(new Error('请选择学位授予年月'))
  } else 
    if (transitionJab(aDegreeIn) < transitionJab(end)) {
      callback('学位授予年月不能在毕业之前')
      educationAndTraining.value.children[0].tableHeader[13].value = 'blank'
    } else {
      callback()
    }
  
}

/* 国内培训 */
const startTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[1].tableHeader[7].value
  let end = educationAndTraining.value.children[1].tableHeader[8].value
  if (value === '' || value === null) {
    callback()
  } else if (transitionJab(start) > transitionJab(end)) {
      callback('开始日期不能大于结束日期')
      educationAndTraining.value.children[1].tableHeader[7].value = 'blank'
    } else {
      callback()
    }
  
}
const endTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[1].tableHeader[7].value
  let end = educationAndTraining.value.children[1].tableHeader[8].value
  if (value === '' || value === null) {
    callback()
  } else  if (transitionJab(start) >= transitionJab(end)) {
      callback('结束日期不能大于开始日期')
      educationAndTraining.value.children[1].tableHeader[8].value = 'blank'
    } else {
      callback()
    }
  
}
const theAnnual_2 = (rule, value, callback) => {
  let year = educationAndTraining.value.children[1].tableHeader[1].value
  // console.log('year: ', year, new Date());
  if (value === '' || value === null) {
    callback(new Error('请选择培训年度'))
  } else if (transitionJab(year) > transitionJab(new Date())) {
      callback('培训年度不能大于当前年份')
      educationAndTraining.value.children[1].tableHeader[1].value = 'blank'
    } else {
      callback()
    }
  
}

/* 海外研修 */
const startTime_3 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[2].tableHeader[1].value
  let end = educationAndTraining.value.children[2].tableHeader[2].value
  if (value === '' || value === null) {
    callback(new Error('请选择开始日期'))
  } else if (transitionJab(start) > transitionJab(end)) {
      callback('开始日期不能大于结束日期')
      educationAndTraining.value.children[2].tableHeader[1].value = 'blank'
    } else {
      callback()
    }
  
}
const endTime_3 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[2].tableHeader[1].value
  let end = educationAndTraining.value.children[2].tableHeader[2].value
  if (value === '' || value === null) {
    callback(new Error('请选择结束日期'))
  } else {
    if (transitionJab(start) >= transitionJab(end)) {
      callback('结束日期不能大于开始日期')
      educationAndTraining.value.children[2].tableHeader[2].value = 'blank'
    } else {
      callback()
    }
  }
}
const theAnnual_3 = (rule, value, callback) => {
  let year = educationAndTraining.value.children[2].tableHeader[0].value
  if (value === '' || value === null) {
    callback(new Error('请选择培训年度'))
  } else {
    if (transitionJab(year) > transitionJab(new Date())) {
      callback('培训年度不能大于当前年份')
      educationAndTraining.value.children[2].tableHeader[0].value = 'blank'
    } else {
      callback()
    }
  }
}


const isDecimal = (num) => {
  return num % 1 !== 0;
};


//学时正则
const period_regular = (rule, value, callback) => {
  if (value === '' || value === null || value === undefined) {
    callback()
    // callback();
  } else if (value < 0 || value + '' === '-0') {
    callback('获得学时不能低于0');
    educationAndTraining.value.children[1].tableHeader[5].value = 'blank'
  } else if (isDecimal(value)) {
    callback('请输入整数');
    educationAndTraining.value.children[1].tableHeader[5].value = 'blank'
  }else{
    callback();
  }
}

//培训获得学分正则
const credit_regular = (rule, value, callback) => {
  
  if (value === ''  || value === null || value === undefined) {
    // callback(new Error('请输入培训获得学分'))
    callback();
  } else if (value < 0 || value + '' === '-0') {
    callback('获得学分不能低于0');
    educationAndTraining.value.children[1].tableHeader[6].value = 'blank'
  } else if (isDecimal(value)) {
    callback('请输入整数');
    educationAndTraining.value.children[1].tableHeader[6].value = 'blank'
  }else{
    callback();
  }
}




export const educationAndTraining = ref({
  title: '学习经历',
  children: [
    {
      info: '学习经历',
      isOperate: true,
      isAnnex: true,
      isBtn: true,
      tableHeader: [
        {
          width: "165px",
          prop2: "entranceTime",
          new: 'top',
          label: "入学年月",
          value: "",
          type: "dateMonth",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: true,
              validator: startTime,
              //  message: '请选择入学年月', 
              trigger: 'change'
            },
          ],
          time2: "time2",
        },
        {
          width: "165px",
          prop2: "graduateTime",
          label: "毕业年月",
          value: "",
          type: "dateMonth",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: true,
              validator: endTime,
              //  message: '请选择毕业年月', 
              trigger: 'change'
            },
          ],
          time2: "time2",
        },
        {
          width: "165px",
          prop2: "learningStyle",
          label: "学习方式",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: true,
              message: '请选择学习方式',
              trigger: 'change'
            },
          ],
          opt: [],
          sName: {},
        },
        {
          width: "165px",
          prop2: "unitCategory",
          label: "在学单位类别",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择在学单位类别', trigger: 'change' },
          ],
          opt: [],
          sName: {},

        },
        {
          width: "165px",
          prop2: "educationBackground",
          label: "学历",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择学历', trigger: 'change' },
          ],
          opt: [],
          sName: {},
        },
        {
          width: "165px",
          prop2: "getEducationBackgroundNation",
          label: "获得学历的国家(地区)",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '获得学历的国家(地区)', trigger: 'change' },
          ],
          opt: [],
          sName: {},
        },
        {
          prop2: "getDegreeNaAcademy",
          label: "获得学历的院校或机构",
          value: "",
          width: "165px",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入获得学历的院校或机构', trigger: 'blur' },
          ],
        },
        {
          width: "165px",
          prop2: "major",
          label: "专业名称",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: false, message: '请选择专业名称', trigger: 'change' },
          ],
          opt: [{name:"无"},{name:"哲学"}],
          sName: {},
        },
        {
          width: "165px",
          prop2: "elseMajor",
          label: "其他专业",
          value: "",
          type: "input",
          isMust: true,
          isDisable: true,
          rules: [
            { required: false, message: '请输入其他专业', trigger: 'blur' },
          ],
        },
        {
          width: "165px",
          prop2: "gradation",
          label: "学位层次",
          value: "",
          type: "select",
          isMust: false,
          isDisable: false,
          opt: [],
          sName: {},
        },
        {
          width: "165px",
          prop2: "degreeLevel",
          label: "学位名称",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择学位名称', trigger: 'change' },
          ],
          opt: [],
          sName: {},
        },
        {
          width: "165px",
          prop2: "getDegreeNation",
          label: "获得学位的国家(地区)",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择获得学位的国家(地区)', trigger: 'change' },
          ],
          opt: [],
          sName: {},
        },
        {
          width: "165px",
          prop2: "getEducationBackgroundAcademy",
          label: "获得学位的院校或机构",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入获得学位的院校或机构', trigger: 'blur' },
          ],
        },
        {
          width: "165px",
          prop2: "awardTime",
          label: "学位授予年月",
          value: "",
          type: "dateMonth",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: true,
              validator: aDegreeInTime,
              //  message: '请选择学位授予年月',
              trigger: 'change'
            },
          ],
          time2: "time2",
        },
        {
          width: "165px",
          prop2: "isTeacherTraining",
          label: "是否师范类专业",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择是否师范类专业', trigger: 'change' },
          ],
          opt: [{ name: '是' }, { name: '否' }],
          sName: {},
        },
        {
          width: "165px",
          prop2: "highestEducation",
          label: "最高学历标识",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入最高学历标识', trigger: 'blur' },
          ],
          // opt: [],
          // sName: {},
        },
        {
          width: "165px",
          prop2: "firstEducation",
          label: "第一学历标识",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请填写第一学历标识', trigger: 'blur' },
          ],
          // opt: [],
          // sName: {},
        },
      ],
      allPage: 0,
      tableContent: [],
    },
    {
      info: '国内培训',
      isOperate: true,
      isBtn: true,
      isAnnex: true,
      allPage: 0,
      tableHeader: [
        {
          width: "107px",
          prop2: "trainingName",
          label: "培训项目名称",
          new: 'top',
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入培训项目名称', trigger: 'blur' },
          ],
        },
        {
          width: "107px",
          prop2: "trainingYear",
          label: "培训年度",
          value: "",
          type: "dateYear",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: true,
              validator: theAnnual_2,
              // message: '请选择培训年度',
              trigger: 'change'
            },
          ],
        },
        {
          width: "107px",
          prop2: "trainingCategory",
          label: "培训类别",
          value: "",
          type: "input",
          isMust: false,
          isDisable: false,
        },
        {
          prop2: "trainingOrganization",
          label: "培训机构名称",
          width: "107px",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入培训机构名称', trigger: 'blur' },
          ],
        },
        {
          width: "107px",
          prop2: "cultivateWay",
          label: "培训方式",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择培训方式', trigger: 'blur' },
          ],
          opt: [],
          sName: {},
        },
        {
          width: "107px",
          prop2: "period",
          label: "培训获得学时",
          value: '',
          type: "number",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: false,
              validator: period_regular,
              trigger: 'change'
            },
          ],
        },
        {
          width: "107px",
          prop2: "credit",
          label: "培训获得学分",
          value: '',
          type: "number",
          isMust: false,
          isDisable: false,
          rules: [
            {
              required: false,
              validator: credit_regular,
              trigger: 'change'
            },
          ],
        },
        {
          width: "107px",
          prop2: "trainStart",
          label: "培训开始日期",
          value: "",
          type: "date",
          isMust: false,
          isDisable: false,
          rules: [
            {
              required: false,
              validator: startTime_2,
              trigger: 'change'
            },
          ],
          time: "time",
        },
        {
          width: "107px",
          prop2: "trainEnd",
          label: "培训结束日期",
          value: "",
          type: "date",
          isMust: false,
          isDisable: false,
          rules: [
            {
              required: false,
              validator: endTime_2,
              trigger: 'change'
            },
          ],
          time: "time",
        },
      ],
      tableContent: [],
    },
    {
      info: '海外研修',
      isOperate: true,
      isBtn: true,
      isAnnex: true,
      allPage: 0,
      tableHeader: [
        {
          width: "144px",
          prop2: "cultivateYear",
          label: "培训年度",
          new: 'top',
          value: "",
          type: "dateYear",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: true,
              validator: theAnnual_3,
              trigger: 'change'
            },
          ],
          time: "time",
        },
        {
          width: "144px",
          prop2: "startTime",
          label: "开始日期",
          value: "",
          type: "date",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: true,
              validator: startTime_3,
              trigger: 'change'
            },
          ],
          time: "time",
        },
        {
          width: "144px",
          prop2: "endTime",
          label: "结束日期",
          value: "",
          type: "date",
          isMust: true,
          isDisable: false,
          rules: [
            {
              required: true,
              validator: endTime_3,
              trigger: 'change'
            },
          ],
          time: "time",
        },
        {
          width: "144px",
          prop2: "area",
          label: "国家(地区)",
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择国家(地区)', trigger: 'blur' },
          ],
          opt: [],
          sName: {},
        },
        {
          width: "144px",
          prop2: "organizationName",
          label: "研修(访学)机构名称",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入研修(访学)机构名称', trigger: 'blur' },
          ],
        },
        {
          width: "144px",
          prop2: "projectName",
          label: "项目名称",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
        },
        {
          width: "144px",
          prop2: "unitName",
          label: "项目组织单位名称",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入项目组织单位名称', trigger: 'blur' },
          ],
        },
      ],
      tableContent: [],
    },
  ]
})