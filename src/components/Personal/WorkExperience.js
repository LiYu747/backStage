
//标准时间转时间戳
const transitionJab = (val) => {
  const date = new Date(val) * 1
  return date
}

/* 工作经历 */
const startTime_1 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[0].tableHeader[1].value
  let end = educationAndTraining.value.children[0].tableHeader[2].value
  if (value === '' || value === null) {
    callback(new Error('请选择开始日期'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('开始日期不能大于结束日期')
      educationAndTraining.value.children[0].tableHeader[1].value = 'blank'
    } else {
      callback()
    }

  }
}

const endTime_1 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[0].tableHeader[1].value
  let end = educationAndTraining.value.children[0].tableHeader[2].value
  if (value === '' || value === null) {
    callback(new Error('请选择结束日期'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('结束日期不能大于开始日期')
      educationAndTraining.value.children[0].tableHeader[2].value = 'blank'
    } else {
      callback()
    }
  }
}
/* 交流轮岗 */
const startTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[1].tableHeader[1].value
  let end = educationAndTraining.value.children[1].tableHeader[2].value
  if (value === '' || value === null) {
    callback(new Error('请选择开始日期'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('开始日期不能大于结束日期')
      educationAndTraining.value.children[1].tableHeader[1].value = 'blank'
    } else {
      callback()
    }

  }
}

const endTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[1].tableHeader[1].value
  let end = educationAndTraining.value.children[1].tableHeader[2].value
  if (value === '' || value === null) {
    callback(new Error('请选择结束日期'))
  } else {
    if (transitionJab(start) > transitionJab(end)) {
      callback('结束日期不能大于开始日期')
      educationAndTraining.value.children[1].tableHeader[2].value = 'blank'
    } else {
      callback()
    }
  }
}


const isDecimal = (num) => {
  return num % 1 !== 0;
};


//班主任年限正则
const teacherAgeLimit_regular = (rule, value, callback) => {
  console.log('value: ', value);
  if (value === '' || value === null) {
    callback(new Error('请填写班主任年限'))
  } else if (value < 0 || value + '' === '-0') {
    callback('班主任年限不能低于0');
    educationAndTraining.value.children[0].tableHeader[8].value = 'blank'
  } else if (isDecimal(value)) {
    callback('请输入整数');
    educationAndTraining.value.children[0].tableHeader[8].value = 'blank'
  }else{
    callback();
  }
}


export const educationAndTraining = ref(
  {
    title: '工作经历',
    children: [
      {
        info: '工作经历',
        isOperate: true,
        isBtn: true,
        isAnnex: true,
        allPage: 0,
        tableHeader: [
          {
            width: "107px",
            prop2: "employerName",
            new: 'top',
            label: "任职单位名称",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入任职单位名称', trigger: 'blur' },
            ],
          },
          {
            width: "107px",
            prop2: "officeStart",
            label: "任职开始年月",
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
            time: "time",
          },
          {
            width: "107px",
            prop2: "officeEnd",
            label: "任职结束年月",
            value: "",
            type: "date",
            isMust: false,
            isDisable: false,
            rules: [
              {
                required: true,
                validator: endTime_1,
                trigger: 'change'
              },
            ],
            time: "time",
          },
          {
            width: "107px",
            prop2: "unitNature",
            label: "单位性质类别",
            value: "",
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择单位性质类别', trigger: 'blur' },
            ],
            opt: [],
            sName: {},
          },
          {
            width: "107px",
            prop2: "position",
            label: "任职岗位",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入任职岗位', trigger: 'blur' },
            ],
          },
          {
            width: "107px",
            prop2: "certifier",
            label: "证明人",
            value: "",
            type: "input",
            isMust: false,
            isDisable: false,
          },
          {
            width: "107px",
            prop2: "rewardsPunishment",
            label: "奖惩情况",
            value: "",
            type: "input",
            isMust: false,
            isDisable: false,
          },
          {
            width: "107px",
            prop2: "isNewest",
            label: "是否最新",
            value: "",
            // type: "select",
            type: "input",
            isMust: false,
            isDisable: true,
            // opt: [],
            // sName: {},
          },
          {
            width: "107px",
            prop2: "teacherAgeLimit",
            label: "班主任年限",
            value: "",
            type: "number",
            isMust: false,
            isDisable: false,
            rules: [
              {
                required: false,
                validator: teacherAgeLimit_regular,
                trigger: 'change'
              },
            ],
          },
          {
            width: "107px",
            prop2: "isCountry",
            label: "是否农村",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            opt: [{ name: '是' }, { name: '否' }],
            sName: {},
          },
          // {
          //   prop: "uploadResume",
          //   label: "上传简历",
          //   value:"",
          //   type:"upload",
          // },
        ],
        tableContent: [],
      },
      {
        info: '交流轮岗',
        isOperate: true,
        isBtn: true,
        isAnnex: true,
        allPage: 0,
        tableHeader: [
          {
            width: "135px",
            prop2: "employerName",
            label: "交流轮岗类型",
            value: "",
            new: 'top',
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择交流轮岗类型', trigger: 'blur' },
            ],
            opt: [],
            sName: {},
          },
          {
            width: "135px",
            prop2: "startTime",
            label: "开始年月",
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
            time: "time",
          },
          {
            width: "135px",
            prop2: "endTime",
            label: "结束年月",
            value: "",
            type: "date",
            rules: [
              {
                required: true,
                validator: endTime_2,
                trigger: 'change'
              },
            ],
            isMust: false,
            isDisable: false,
            time: "time",
          },
          {
            width: "135px",
            prop2: "oldUnitName",
            label: "原单位名称",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入原单位名称', trigger: 'blur' },
            ],
          },
          {
            width: "135px",
            prop2: "workShiftName",
            label: "交流轮岗单位名称",
            value: "",
            type: "input",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入交流轮岗单位名称', trigger: 'blur' },
            ],
          },
          {
            width: "135px",
            prop2: "isTransfer",
            label: "是否调动人事关系",
            value: "",
            type: "select",
            isMust: false,
            isDisable: false,
            opt: [{ name: '是' }, { name: '否' }],
            sName: {},
          },
        ],
        tableContent: [],
      },
    ]
  },
)