


//标准时间转时间戳
const transitionJab = (val) => {
  const date = new Date(val) * 1
  return date
}

function isTimestamp(value) {
  const timestamp = parseInt(value);
  if (isNaN(timestamp)) {
    return false;
  }
  const date = new Date(timestamp);
  return date.getTime() === timestamp;
}


/* 岗位聘任 */
const startTime_1 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[0].tableHeader[2].value;
  console.log('start: ', start);
  if (isTimestamp(start)) {
    start = new Date(start);
  }
  if (start) {
    const year = start.getFullYear(); // 获取年份（例如：2023）
    console.log('year: ', year);
    const month = start.getMonth() + 1; // 获取月份（注意：月份从0开始计数，所以需要加1）
    start = new Date(year, month - 1, 1);
  }
  let end = educationAndTraining.value.children[0].tableHeader[8].value
  if (value === '' || value === null) {
    callback(new Error('请选择聘任开始日期'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('聘任开始日期不能大于结束日期')
      educationAndTraining.value.children[0].tableHeader[2].value = 'blank'
    } else {
      callback()
    }

  }
}

const endTime_1 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[0].tableHeader[2].value;
  if (isTimestamp(start)) {
    start = new Date(start);
  }
  if (start) {
    const year = start.getFullYear(); // 获取年份（例如：2023）
    const month = start.getMonth() + 1; // 获取月份（注意：月份从0开始计数，所以需要加1）
    start = new Date(year, month - 1, 1);
  }
  let end = educationAndTraining.value.children[0].tableHeader[8].value
  if (value === '' || value === null) {
    callback(new Error('请选择任职开始年月'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('任职开始年月不能大于聘任开始日期')
      educationAndTraining.value.children[0].tableHeader[8].value = 'blank'
    } else {
      callback()
    }
  }
}


/* 专业技术职务聘任 */
const startTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[1].tableHeader[1].value;
  let end = educationAndTraining.value.children[1].tableHeader[2].value
  if (value === '' || value === null) {
    callback(new Error('请选择聘任开始日期'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('聘任开始日期不能大于聘任结束日期')
      educationAndTraining.value.children[1].tableHeader[1].value = 'blank'
    } else {
      callback()
    }

  }
}
const endTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[1].tableHeader[1].value;
  let end = educationAndTraining.value.children[1].tableHeader[2].value
  if (value === '' || value === null) {
    callback(new Error('请选择聘任结束日期'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('聘任结束日期不能大于聘任开始日期')
      educationAndTraining.value.children[1].tableHeader[2].value = 'blank'
    } else {
      callback()
    }
  }
}


/* 名师工作室负责人情况 */
const startTime_3 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[4].tableHeader[2].value
  let end = educationAndTraining.value.children[4].tableHeader[3].value
  if (value === '' || value === null) {
    callback(new Error('请选择组建开始时间'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('组建开始时间不能大于结束时间')
      educationAndTraining.value.children[4].tableHeader[2].value = 'blank'
    } else {
      callback()
    }

  }
}

const endTime_3 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[4].tableHeader[2].value
  let end = educationAndTraining.value.children[4].tableHeader[3].value
  if (value === '' || value === null) {
    callback(new Error('请选择结束时间'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('结束时间不能大于组建开始时间')
      educationAndTraining.value.children[4].tableHeader[3].value = 'blank'
    } else {
      callback()
    }
  }
}


const isDecimal = (num) => {
  return num % 1 !== 0;
};


//工作室人数正则
// const workRoomCount_regular = (rule, value, callback) => {
//   console.log('value: ', value);
//   if (value === '' || value === null) {
//     callback(new Error('请填写班主任年限'))
//   } else if (value < 0 || value + '' === '-0') {
//     callback('班主任年限不能低于0');
//     educationAndTraining.value.children[4].tableHeader[1].value = 'blank'
//   } else if (isDecimal(value)) {
//     callback('请输入整数');
//     educationAndTraining.value.children[4].tableHeader[1].value = 'blank'
//   }
// }



export const educationAndTraining = ref(
  {
    title: '岗位聘任信息',
    children: [
      {
        info: '岗位聘任',
        isOperate: true,
        isBtn: true,
        isAnnex: true,
        allPage: 0,
        tableHeader: [
          {
            width: "107px",
            prop2: "jobCategory",
            label: "岗位类别",
            new: 'top',
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择岗位类别', trigger: 'change' },
            ],
            opt: [],
          },
          {
            width: "107px",
            prop2: "jobGrade",
            label: "岗位等级",
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择岗位等级', trigger: 'change' },
            ],
            opt: [],
          },
          {
            width: "107px",
            prop2: "hireTime",
            label: "聘任开始日期",
            value: "",
            type: "date",
            isMust: true,
            isDisable: false,
            rules: [
              {
                required: true,
                validator: startTime_1,
                trigger: 'change'
              },
            ],
          },
          {
            width: "107px",
            prop2: "additionalJobCategory",
            label: "兼任岗位类别",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            opt: [],
          },
          {
            width: "107px",
            prop2: "additionalJobGrade",
            label: "兼任岗位等级",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            opt: [],
          },
          {
            width: "107px",
            prop2: "administrativeDuty",
            label: "行政职务",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            opt: [],
          },
          {
            width: "107px",
            prop2: "administrativeRank",
            label: "行政职级",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            opt: [],
          },
          {
            width: "107px",
            prop2: "affiliationDepartment",
            label: "所属部门(科室)",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            opt: [],
          },
          {
            width: "107px",
            prop2: "officeStart",
            label: "任职开始年月",
            value: "",
            type: "dateMonth",
            isMust: false,
            isDisable: false,
            rules: [
              {
                required: true,
                validator: endTime_1,
                trigger: 'change'
              },
            ],
          },
        ],
        tableContent: [
          // {
          //   id: 0,
          //   jobCategory: "普通",
          //   positionLevel: '一级',
          //   appointmentStartTime: '2023-07',
          //   partTime: "无",
          //   partTimeLevel: '高级',
          //   administrativePosition: "无",
          //   administrativeRank: "无",
          //   department: "学科部",
          //   employmentStartTime: "2023-07",
          // }
        ],
      },
      {
        info: '专业技术职务聘任',
        isOperate: true,
        isBtn: true,
        isAnnex: true,
        allPage: 0,
        tableHeader: [
          {
            width: "135px",
            prop2: "engageJob",
            label: "聘任专业技术职务",
            new: 'top',
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择聘任专业技术职务', trigger: 'change' },
            ],
            opt: [],
          },
          {
            width: "135px",
            prop2: "engageStart",
            label: "聘任开始日期",
            value: "",
            type: "date",
            isMust: true,
            isDisable: false,
            rules: [
              {
                required: true,
                validator: startTime_2,
                trigger: 'change'
              },
            ],
          },
          {
            width: "135px",
            prop2: "engageEnd",
            label: "聘任结束日期",
            value: "",
            type: "date",
            isMust: false,
            isDisable: false,
            rules: [
              {
                required: true,
                validator: endTime_2,
                trigger: 'change'
              },
            ],
          },
          {
            width: "135px",
            prop2: "engageName",
            label: "聘任单位名称",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入聘任单位名称', trigger: 'change' },
            ],
          },
          {
            width: "135px",
            prop2: "advantage",
            label: "熟悉专业有何专长",
            value: "",
            type: "input",
            isMust: false,
            isDisable: false,
          },
        ],
        tableContent: [
          // {
          //   id: 0,
          //   appointmentTechnology: "高数",
          //   appointmentStartTime: '2023-07',
          //   appointmentEndTime: "2025-07",
          //   appointmentName: '四川大学',
          //   specialSkill: "跳舞",
          // }
        ],
      },
      {
        info: '担任培训专家情况',
        isOperate: true,
        isAnnex: true,
        isBtn: true,
        allPage: 0,
        tableHeader: [
          {
            width: "80px",
            prop2: "activityName",
            label: "活动名称",
            new: 'top',
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'change' },
            ],
          },
          {
            width: "80px",
            prop2: "cultivateTheme",
            label: "培训主题",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入培训主题', trigger: 'change' },
            ],
          },
          {
            width: "80px",
            prop2: "cultivateRank",
            label: "培训级别",
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            // rules: [
            //   { required: true, message: '请选择培训级别', trigger: 'change' },
            // ],
            opt: [],
          },
          {
            width: "80px",
            prop2: "cultivateTime",
            label: "培训时间",
            value: "",
            type: "date",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择培训时间', trigger: 'change' },
            ],
          },
          {
            width: "80px",
            prop2: "organization",
            label: "组织单位",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入组织单位', trigger: 'change' },
            ],
          },
        ],
        tableContent: [
          // {
          //   id: 0,
          //   activityName: "庆祝国庆",
          //   trainingTheme: '自由',
          //   trainingLevel: "高级",
          //   trainingTime: '1月',
          //   organizationalUnit: "四川大学",
          // }
        ],
      },
      {
        info: '担任评审专家情况',
        isOperate: true,
        isAnnex: true,
        isBtn: true,
        allPage: 0,
        tableHeader: [
          {
            width: "96px",
            prop2: "activityName",
            label: "活动名称",
            new: 'top',
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'change' },
            ],
          },
          {
            width: "96px",
            prop2: "activityLevel",
            label: "评审活动级别",
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            // rules: [
            //   { required: true, message: '请选择评审活动级别', trigger: 'change' },
            // ],
            opt: [],
          },
          {
            width: "96px",
            prop2: "reviewTime",
            label: "评审时间",
            value: "",
            type: "date",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择评审时间', trigger: 'change' },
            ],
          },
          {
            width: "96px",
            prop2: "organization",
            label: "组织单位",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入组织单位', trigger: 'change' },
            ],
          },
        ],
        tableContent: [
          // {
          //   id: 0,
          //   activityName: "庆祝国庆",
          //   reviewLevel: "高级",
          //   reviewTime: '1月',
          //   organizationalUnit: "四川大学",
          // }
        ],
      },
      {
        info: '名师工作室负责人情况',
        isOperate: true,
        isAnnex: true,
        isBtn: true,
        allPage: 0,
        tableHeader: [
          {
            width: "122px",
            prop2: "teacherWorkRoomName",
            label: "名师工作室名称",
            value: "",
            type: "input",
            new: 'top',
            isMust: true,
            isDisable: false,
            // rules: [
            //   {
            //     required: true,
            //     validator: workRoomCount_regular,
            //     trigger: 'change'
            //   },
            // ],
          },
          {
            width: "122px",
            prop2: "workRoomCount",
            label: "工作室人数",
            value: 0,
            type: "number",
            isMust: false,
            isDisable: false,
          },
          {
            width: "122px",
            prop2: "startTime",
            label: "组建开始时间",
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
          },
          {
            width: "122px",
            prop2: "endTime",
            label: "结束时间",
            value: "",
            type: "date",
            isMust: false,
            isDisable: false,
            rules: [
              {
                required: true,
                validator: endTime_3,
                trigger: 'change'
              },
            ],
          },
          {
            width: "122px",
            prop2: "workRoomRank",
            label: "工作室级别",
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            // rules: [
            //   { required: true, message: '请选择工作室级别', trigger: 'change' },
            // ],
            opt: []
          },
          {
            width: "122px",
            prop2: "achievement",
            label: "典型成果",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入典型成果', trigger: 'change' },
            ],
          },
          {
            prop2: "attachment",
            label: "附件",
            width:'122px',
            value:"",
            type:"upload",
          },
        ],
        tableContent: [
        ],
      },
      {
        info: '承担特色课程领衔教师',
        isOperate: true,
        isAnnex: true,
        isBtn: true,
        allPage: 0,
        tableHeader: [
          {
            width: "135px",
            prop2: "courseName",
            label: "学校特色课程名称",
            new: 'top',
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入学校特色课程名称', trigger: 'change' },
            ],
          },
          {
            width: "135px",
            prop2: "actAsTime",
            label: "担任时间",
            value: "",
            type: "dateYear",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择担任时间', trigger: 'change' },
            ],
          },
          {
            width: "135px",
            prop2: "isLeanTeacher",
            label: "是否领衔教师",
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择是否领衔教师', trigger: 'change' },
            ],
            opt: [{ name: '是' }, { name: '否' }],
          },
          {
            width: "135px",
            prop2: "hour",
            label: "课时",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入课时', trigger: 'change' },
            ],
          },
        ],
        tableContent: [

        ],
      },
    ]
  },
)