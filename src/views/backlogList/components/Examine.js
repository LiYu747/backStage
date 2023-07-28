import { saveAs } from "file-saver";
const downloadFileBySaveAs = (url, fileName) => {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      saveAs(blob, fileName);
    })
    .catch((error) => console.error(error));
};
//审核选项
const passOpt = ref([
  {
    name: "是",
    id: true,
  },
  {
    name: "否",
    id: false,
  },
]);

//时间转换
const timestampToTime = (timestamp, isFull) => {
  if(!timestamp) return ''
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  let h =
    (date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours()) +
    ":";
  let m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let str = isFull ? Y + M + D + h + m + s : Y + M + D;
  return str;
};

//判断流程
const judgeProcess = (val) => {
  switch (val) {
    case "START":
      return "起始";
    case "SCHOOL":
      return "校管理审批";
    case "BUREAU":
      return "局管理审批";
    case "END":
      return "结束";
  }
};
//判断状态
const judgeState = (val) => {
  switch (val) {
    case "WAIT":
      return "进行中";
    case "COMPLETE":
      return "已完成";
    case "FAIL":
      return "未通过";
  }
};
 //判断是什么流程
const  judgeProcessText = (val) => {
  if(!val) return "";
    switch (val){
      case 'ENTRY':
        return '审批（入职）'
      case 'TRANSFER'  :
        return '审批（调动）'
      case 'LOAN':
        return '审批（借调）'
      case 'RETIRE':
        return '审批（离退）'
      case 'SICK_LEAVE'  :
        return '审批（长病假）'
      case 'MATERNITY_LEAVE'  :
        return '审批（产假）'
      case 'UPDATE'  :
        return '审批（更新）'
      case 'OUTSIDE_SCHOOL'  :
        return '审批（课外）'
    }
}
const  judgeProcessText2 = (val) => {
  if(!val) return "";
    switch (val){
      case 'ENTRY':
        return '入职'
      case 'TRANSFER'  :
        return '调动'
      case 'LOAN':
        return '借调'
      case 'RETIRE':
        return '离退'
      case 'SICK_LEAVE'  :
        return '长病假'
      case 'MATERNITY_LEAVE'  :
        return '产假'
      case 'UPDATE'  :
        return '变更资料'
      case 'OUTSIDE_SCHOOL'  :
        return '添加课后服务人员'
    }
}

//基本信息
const formData = ref([
  {
    label: "姓名",
    type: "input",
    prop: "name",
    value: "",
    readonly: true,
    iptWid: "300px",
    // width: "10px",
    rules: [
      {
        required: true,
        trigger: "change",
      },
    ],
  },
  {
    label: "性别",
    type: "input",
    prop: "sex",
    value: "",
    readonly: true,
    iptWid: "300px",
    // width: "10px",
    rules: [
      {
        required: true,
        message: "请选择性别",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    label: "民族",
    type: "input",
    prop: "nation",
    value: "",
    readonly: true,
    iptWid: "300px",
    // width: "10px",
    rules: [
      {
        required: true,
        message: "请选择民族",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    label: "证件类型",
    type: "input",
    prop: "idType",
    value: "",
    readonly: true,
    iptWid: "300px",
    // width: "10px",
    rules: [
      {
        required: true,
        message: "请选择证件类型",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    label: "证件号码",
    type: "input",
    prop: "idCard",
    value: "",
    readonly: true,
    iptWid: "300px",
    // width: "10px",
    rules: [
      {
        required: true,
        message: "请填写证件号码",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    label: "手机号",
    type: "input",
    prop: "phoneNumber",
    value: "",
    readonly: true,
    iptWid: "300px",
    // width: "10px",
    rules: [
      {
        required: true,
        message: "请填写手机号",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    label: "生日",
    type: "input",
    prop: "birthday",
    value: "",
    noIcon: true,
    readonly: true,
    iptWid: "300px",
    // width: "150px",
    rules: [
      {
        required: true,
        message: "请选择生日",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    label: "出生地",
    type: "input",
    prop: "region",
    value: "",
    readonly: true,
    iptWid: "360px",
    // width: "105px",
    rules: [
      {
        required: true,
        message: "请选择省",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    iptWid: "270px",
    width: "10px",
    label: "",
    type: "input",
    prop: "city",
    value: "",
    readonly: true,
    rules: [
      {
        required: true,
        message: "请选择市",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    iptWid: "270px",
    width: "10px",
    label: "",
    type: "input",
    prop: "district",
    value: "",
    readonly: true,
    rules: [
      {
        required: true,
        message: "请选择区",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
  {
    label: "详细地址",
    type: "input",
    prop: "detailedAddress",
    value: "",
    iptWid: "500px",
    readonly: true,
    iptWid: "1500px",
    // width: "300px",
    rules: [
      {
        required: true,
        message: "请填写详细地址",
        trigger: "change",
      },
    ],
    attrs: {
      placeholder: "",
    },
  },
]);
//教职工信息
const infoData = ref([
  {
    label: "工作单位",
    type: "input",
    prop: "workUnit",
    value: "",
    readonly: true,
 
    iptWid:'470px',
    rules: [
      {
        required: true,
        message: "请选择工作单位",
        trigger: "change",
      },
    ],
  },
  {
    label: "岗位",
    type: "input",
    prop: "station",
    value: "",
    readonly: true,
    width:'180px',
    iptWid:'470px',
    rules: [
      {
        required: true,
        message: "请选择岗位",
        trigger: "change",
      },
    ],
  },
  {
    label: "部门",
    type: "input",
    prop: "department",
    value: "",
    readonly: true,
    width:'150px',
    iptWid:'470px',
    rules: [
      {
        required: true,
        message: "请选择部门",
        trigger: "change",
      },
    ],
  },
  {
    label: "隶属集团",
    type: "input",
    prop: "group",
    value: "",
    iptWid:'470px',
    readonly: true,
    rules: [
      {
        required: false,
      },
    ],
  },
  {
    label: "编制单位(用工单位)",
    type: "input",
    prop: "unit",
    value: "",
    width: "180px",
    iptWid:'470px',
    readonly: true,
    rules: [
      {
        required: true,
        message: "请选择编制单位",
        trigger: "change",
      },
    ],
  },
  {
    label: "编制状态",
    type: "input",
    prop: "establishmentStatus",
    value: "",
    readonly: true,
    width:'150px',
    iptWid:'470px',
    rules: [
      {
        required: true,
        message: "请选择编制状态",
        trigger: "change",
      },
    ],
  },
]);
//调动前信息
const priorToTransfer = [
  {
    label: "工号",
    type: "input",
    prop: "teacherJobId",
    value: "",
    readonly: true,
     width: "100px",
     iptWid:'270px',
    rules: [
      {
        required: false,
      },
    ],
  },
  {
    label: "姓名",
    type: "input",
    prop: "name",
    value: "",
    readonly: true,
    width: "100px",
     iptWid:'270px',
    rules: [
      {
        required: false,
      },
    ],
  },
  {
    label: "性别",
    type: "input",
    prop: "sex",
    value: "",
    readonly: true,
    width: "100px",
     iptWid:'270px',
    rules: [
      {
        required: false,
      },
    ],
  },
  {
    label: "证件号码",
    type: "input",
    prop: "idNumber",
    value: "",
    readonly: true,
    iptWid: "300px",
    // width: "100px",
    rules: [
      {
        required: false,
      },
    ],
  },
  {
    label: "编制单位(用工单位)",
    type: "input",
    prop: "organizationUnit",
    value: "",
    width: "170px",
    iptWid:'460px',
    readonly: true,
    rules: [
      {
        required: false,
      },
    ],
  },
  {
    label: "工作单位",
    type: "input",
    prop: "workName",
    value: "",
    width: "100px",
    iptWid:'810px',
    readonly: true,
    rules: [
      {
        required: false,
      },
    ],
  },

];
//调动后
const transferFrom = [
  {
    label: "工作单位",
    type: "input",
    prop: "newWorkName",
    value: "",
    readonly: true,
    iptWid:'400px',
    rules: [
      {
        required: true,
        message: "请选择工作单位",
        trigger: "change",
      },
    ],
  },
  {
    label: "岗位",
    type: "input",
    prop: "newJob",
    value: "",
    readonly: true,
    iptWid: "470px",
    rules: [
      {
        required: true,
        message: "请选择岗位",
        trigger: "change",
      },
    ],
  },
  {
    label: "编制单位(用工单位)",
    type: "input",
    prop: "newOrganizationUnit",
    value: "",
    width: "180px",
    iptWid: "460px",
    readonly: true,
    rules: [
      {
        required: true,
        message: "请选择编制单位",
        trigger: "change",
      },
    ],
  },
  
  {
    label: "隶属集团",
    type: "input",
    prop: "newAffiliationWork",
    value: "",
    readonly: true,
    iptWid:'400px',
    rules: [
      {
        required: false,
      },
    ],
  }, 
  {
    label: "部门",
    type: "input",
    prop: "newAffiliationDepartment",
    value: "",
    readonly: true,
    // width:'180px',
    iptWid: "470px",
    rules: [
      {
        required: true,
        message: "请选择部门",
        trigger: "change",
      },
    ],
  },
  {
    label: "调动时间",
    type: "input",
    prop: "transferTime",
    value: "",
    readonly: true,
    width:'180px',
    iptWid: "460px",
    rules: [
      {
        required: true,
        message: "请选择编制单位",
        trigger: "change",
      },
    ],
  },
 
  {
    label: "调动原因",
    type: "textarea",
    prop: "cause",
    value: "",
    iptWid: "81%",
    readonly: true,
    rules: [
      {
        required: false,
      },
    ],
  },
];
//借调
const second = [
  {
    label: "工作单位",
    type: "input",
    prop: "newWorkName",
    value: "",
    width:'180px',
    iptWid:'420px',
    readonly: true,
    rules: [
      {
        required: true,
        message: "请选择工作单位",
        trigger: "change",
      },
    ],
  },
  {
    label: "岗位",
    type: "input",
    prop: "newJob",
    value: "",
    
    readonly: true,
    rules: [
      {
        required: true,
        message: "请选择岗位",
        trigger: "change",
      },
    ],
  },
  {
    label: "部门",
    type: "input",
    prop: "newAffiliationDepartment",
    value: "",
    readonly: true,
    rules: [
    
    ],
  },
  {
    label: "隶属集团",
    type: "input",
    prop: "newAffiliationWork",
    iptWid:'330px',
    value: "",
    readonly: true,
    rules: [
      {
        required: false,
      },
    ],
  },
  {
    label: "编制单位(用工单位)",
    type: "input",
    prop: "newOrganizationUnit",
    value: "",
    width: "180px",
    iptWid: "420px",
    readonly: true,
    rules: [
    
    ],
  },
  {
    label: "借调开始时间",
    type: "input",
    prop: "loanedPersonnelStartTime",
    value: "",
    readonly: true,
    iptWid: "400px",
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "借调结束时间",
    type: "input",
    prop: "loanedPersonnelEndTime",
    value: "",
    readonly: true,
    iptWid: "400px",
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "调动原因",
    type: "textarea",
    prop: "cause",
    value: "",
    iptWid: "1220px",
    readonly: true,
    rules: [
      {
        required: false,
      },
    ],
  },
]
//离退
const retirement = [
  {
    label: "离退类型",
    type: "input",
    prop: "retireType",
    value: "",
    readonly: true,
    iptWid: "100%",
    inputW: "400px",
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "离退时间",
    type: "input",
    prop: "retireTime",
    iptWid: "100%",
    inputW: "400px",
    value: "",
    readonly: true,
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "离退原因",
    type: "textarea",
    prop: "cause",
    value: "",
    iptWid: "81%",
    inputW: "90%",
    readonly: true,
    rules: [
      {
        required: false,
      },
    ],
  },
];
//病假
const sickLeave = [
  {
    label: "病假开始时间",
    type: "input",
    prop: "retireTime",
    iptWid: "100%",
    inputW: "250px",
    value: "",
    readonly: true,
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "病假原因",
    type: "textarea",
    prop: "cause",
    value: "",
    iptWid: "81%",
    inputW: "90%",
    readonly: true,
    rules: [
      {
        required: false,
      },
    ],
  },
];
//产假
const maternityLeave = [
  {
    label: "产假开始时间",
    type: "input",
    prop: "maternityLeaveStartTime",
    iptWid: "100%",
    inputW: "250px",
    value: "",
    readonly: true,
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "原因",
    type: "textarea",
    prop: "cause",
    value: "",
    iptWid: "81%",
    inputW: "90%",
    readonly: true,
    rules: [
      {
        required: false
      },
    ],
  },
];
export {
  passOpt,
  timestampToTime,
  judgeProcess,
  judgeState,
  downloadFileBySaveAs,
  formData,
  infoData,
  transferFrom,
  priorToTransfer,
  retirement,
  sickLeave,
  maternityLeave,
  second,
  judgeProcessText,
  judgeProcessText2
};
