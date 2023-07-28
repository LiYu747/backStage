//标准时间转时间戳
const transitionJab = (val) => {
  const date = new Date(val) * 1
  return date
}

const startTime_1 = (rule, value, callback) => {
  // console.log( baseInfoList[0].children[3].showHeader[6].value,);
  let start = baseInfoList[0].children[3].showHeader[6].value_other
  let end =baseInfoList[0].children[3].showHeader[7].value_other
  console.log('value: ', value);
  if (value === '' || value === null) {
    // callback(new Error('请选择合同期起时间'))
    callback()
  } else {
    if (start > end) {
      callback('合同期起不能大于合同期止')
      baseInfoList[0].children[3].showHeader[6].value_other = 'blank'
    } else {
      callback()
    }

  }
}

const endTime_1 = (rule, value, callback) => {
  console.log(value);
  let start = baseInfoList[0].children[3].showHeader[6].value_other
  let end =baseInfoList[0].children[3].showHeader[7].value_other
  if (value === '' || value === null) {
    // callback(new Error('请选择合同期止时间'))
    callback()
  } else {
    if (start > end) {
      callback('合同期止不能大于合同期起')
      baseInfoList[0].children[3].showHeader[7].value_other = 'blank'
    } else {
      callback()
    }
  }
}
// 枚举
export const USERINFO = [
  {
    label: '个人信息',
    children: [
      {
        name: "姓名",
        id: "false"
      },
      {
        name: "性别",
        id: "false"
      },
      {
        name: "曾用名",
        id: "false"
      },
      {
        name: "民族",
        id: "false"
      },
      {
        name: "姓名拼音",
        id: "false"
      },
      {
        name: "出生地",
        id: "false"
      },
      {
        name: "国家和地区",
        id: "false"
      },
      {
        name: "籍贯",
        id: "false"
      },
      {
        name: "政治面貌",
        id: "false"
      },
      {
        name: "入党时间",
        id: "false"
      },
      {
        name: "婚姻",
        id: "false"
      },
      {
        name: "健康状况",
        id: "false"
      },
      {
        name: "毕业院校",
        id: "false"
      },
      {
        name: "所学专业",
        id: "false"
      },
      {
        name: "最高学历",
        id: "false"
      },
      {
        name: "出生日期",
        id: "false"
      },
      {
        name: "年龄",
        id: "false"
      },
      {
        name: "个人邮箱",
        id: "false"
      },
      {
        name: "手机号",
        id: "false"
      },
      {
        name: "从教开始时间",
        id: "false"
      },
      {
        name: "教龄",
        id: "false"
      },
    ],
  },
  {
    label: '编制信息',
    children: [
      {
        name: "工作单位",
        id: "false"
      },
      {
        name: "隶属集团",
        id: "false"
      },
      {
        name: "编制单位(用工单位)",
        id: "false"
      },
      {
        name: "编制类型",
        id: "false"
      },
      {
        name: "编制状态",
        id: "false"
      },
      {
        name: "人员状态",
        id: "false"
      },
      {
        name: "入编时间",
        id: "false"
      },
    ],
  },
  {
    label: '在编信息',
    children: [
      {
        name: "教职工来源",
        id: "false"
      },
      {
        name: "进入本校日期",
        id: "false"
      },
      {
        name: "参加工作日期",
        id: "false"
      },
      {
        name: "用人形式",
        id: "false"
      },
      {
        name: "签订合同情况",
        id: "false"
      },
    ],
  },
  {
    label: '非编信息',
    children: [
      {
        name: "岗位分类",
        id: "false"
      },
      {
        name: "人员类别",
        id: "false"
      },
      {
        name: "用工方式",
        id: "false"
      },
      {
        name: "签订合同情况",
        id: "false"
      },
      {
        name: "劳务派遣机构",
        id: "false"
      },
      {
        name: "进入本单位年月",
        id: "false"
      },
      {
        name: "合同期起",
        id: "false"
      },
      {
        name: "合同期止",
        id: "false"
      },
      {
        name: "经费来源",
        id: "false"
      },
      {
        name: "是否人事代理",
        id: "false"
      },
      {
        name: "是否退休返聘",
        id: "false"
      },
    ],
  },
  {
    label: '其他信息',
    children: [
      {
        name: "信息技术应用能力",
        id: "false"
      },
      {
        name: "是否受过特教专业培养培训",
        id: "false"
      },
      {
        name: "是否特级教师",
        id: "false"
      },
      {
        name: "是否全日制师范类专业毕业",
        id: "false"
      },
      {
        name: "是否受过学前教育专业培养培训",
        id: "false"
      },
      {
        name: "是否全日制学前教育专业毕业",
        id: "false"
      },
      {
        name: "是否双师型教师",
        id: "false"
      },
      {
        name: "是否参加基层服务项目",
        id: "false"
      },
      {
        name: "是否属于免费（公费）师范生",
        id: "false"
      },
      {
        name: "是否县级以上骨干教师",
        id: "false"
      },
      {
        name: "是否心理健康教育教师",
        id: "false"
      },
    ],
  },
  {
    label: '教育教学',
    children: [
      {
        name: "学期",
        id: "false"
      },
      {
        name: "任教状况",
        id: "false"
      },
      {
        name: "任教学段",
        id: "false"
      },
      {
        name: "任教课程",
        id: "false"
      },
      {
        name: "兼任工作",
        id: "false"
      },
      {
        name: "任教班级类型",
        id: "false"
      },
      {
        name: "任教年级",
        id: "false"
      },
      {
        name: "任教班级",
        id: "false"
      },
      {
        name: "课时",
        id: "false"
      },
    ],
  },
  {
    label: '承担公开课等情况',
    children: [
      {
        name: "授课日期",
        id: "false"
      },
      {
        name: "讲授课程名称",
        id: "false"
      },
      {
        name: "授课对象",
        id: "false"
      },
      {
        name: "学生数",
        id: "false"
      },
      {
        name: "组织单位",
        id: "false"
      },
    ],
  },
  {
    label: '承担市外支教任务情况',
    children: [
      {
        name: "支教学校/单位",
        id: "false"
      },
      {
        name: "支教开始时间",
        id: "false"
      },
      {
        name: "支教结束时间",
        id: "false"
      },
      {
        name: "支教组织单位",
        id: "false"
      },
    ],
  },
  {
    label: '学习经历',
    children: [
      {
        name: "入学年月",
        id: "false"
      },
      {
        name: "毕业年月",
        id: "false"
      },
      {
        name: "学习方式",
        id: "false"
      },
      {
        name: "在学单位类别",
        id: "false"
      },
      {
        name: "学历",
        id: "false"
      },
      {
        name: "获得学历的国家(地区)",
        id: "false"
      },
      {
        name: "获得学历的院校或机构",
        id: "false"
      },
      {
        name: "专业名称",
        id: "false"
      },
      {
        name: "其他专业",
        id: "false"
      },
      {
        name: "学位层次",
        id: "false"
      },
      {
        name: "学位名称",
        id: "false"
      },
      {
        name: "获得学位的国家(地区)",
        id: "false"
      },
      {
        name: "获得学位的院校或机构",
        id: "false"
      },
      {
        name: "学位授予年月",
        id: "false"
      },
      {
        name: "是否师范类专业",
        id: "false"
      },
      {
        name: "最高学历标识",
        id: "false"
      },
      {
        name: "第一学历标识",
        id: "false"
      },
    ],
  },
  {
    label: '国内培训',
    children: [
      {
        name: "培训项目名称",
        id: "false"
      },
      {
        name: "培训年度",
        id: "false"
      },
      {
        name: "培训类别",
        id: "false"
      },
      {
        name: "培训机构名称",
        id: "false"
      },
      {
        name: "培训方式",
        id: "false"
      },
      {
        name: "培训获得学时",
        id: "false"
      },
      {
        name: "培训获得学分",
        id: "false"
      },
      {
        name: "培训开始日期",
        id: "false"
      },
      {
        name: "培训结束日期",
        id: "false"
      },
    ],
  },
  {
    label: '海外研修',
    children: [
      {
        name: "培训年度",
        id: "false"
      },
      {
        name: "开始日期",
        id: "false"
      },
      {
        name: "结束日期",
        id: "false"
      },
      {
        name: "国家(地区)",
        id: "false"
      },
      {
        name: "研修(访学)机构名称",
        id: "false"
      },
      {
        name: "项目名称",
        id: "false"
      },
      {
        name: "项目组织单位名称",
        id: "false"
      },
    ],
  },
  {
    label: '工作经历',
    children: [
      {
        name: "任职单位名称",
        id: "false"
      },
      {
        name: "任职开始年月",
        id: "false"
      },
      {
        name: "任职结束年月",
        id: "false"
      },
      {
        name: "单位性质类别",
        id: "false"
      },
      {
        name: "任职岗位",
        id: "false"
      },
      {
        name: "证明人",
        id: "false"
      },
      {
        name: "奖惩情况",
        id: "false"
      },
      {
        name: "是否最新",
        id: "false"
      },
      {
        name: "班主任年限",
        id: "false"
      },
      {
        name: "是否农村",
        id: "false"
      },
    ],
  },
  {
    label: '交流轮岗',
    children: [
      {
        name: "交流轮岗类型",
        id: "false"
      },
      {
        name: "开始年月",
        id: "false"
      },
      {
        name: "结束年月",
        id: "false"
      },
      {
        name: "原单位名称",
        id: "false"
      },
      {
        name: "交流轮岗单位名称",
        id: "false"
      },
      {
        name: "是否调动人事关系",
        id: "false"
      },
    ],
  },
  {
    label: '岗位聘任',
    children: [
      {
        name: "岗位类别",
        id: "false"
      },
      {
        name: "岗位等级",
        id: "false"
      },
      {
        name: "聘任开始日期",
        id: "false"
      },
      {
        name: "兼任岗位类别",
        id: "false"
      },
      {
        name: "兼任岗位等级",
        id: "false"
      },
      {
        name: "行政职务",
        id: "false"
      },
      {
        name: "行政职级",
        id: "false"
      },
      {
        name: "所属部门(科室)",
        id: "false"
      },
      {
        name: "任职开始年月",
        id: "false"
      },
    ],
  },
  {
    label: '专业技术职务聘任',
    children: [
      {
        name: "聘任专业技术职务",
        id: "false"
      },
      {
        name: "聘任开始日期",
        id: "false"
      },
      {
        name: "聘任结束日期",
        id: "false"
      },
      {
        name: "聘任单位名称",
        id: "false"
      },
      {
        name: "熟悉专业有何专长",
        id: "false"
      },
    ],
  },
  {
    label: '担任培训专家情况',
    children: [
      {
        name: "活动名称",
        id: "false"
      },
      {
        name: "培训主题",
        id: "false"
      },
      {
        name: "培训级别",
        id: "false"
      },
      {
        name: "培训时间",
        id: "false"
      },
      {
        name: "组织单位",
        id: "false"
      },
    ],
  },
  {
    label: '担任评审专家情况',
    children: [
      {
        name: "活动名称",
        id: "false"
      },
      {
        name: "评审活动级别",
        id: "false"
      },
      {
        name: "评审时间",
        id: "false"
      },
      {
        name: "组织单位",
        id: "false"
      },
    ],
  },
  {
    label: '名师工作室负责人情况',
    children: [
      {
        name: "名师工作室名称",
        id: "false"
      },
      {
        name: "工作室人数",
        id: "false"
      },
      {
        name: "组建开始时间",
        id: "false"
      },
      {
        name: "结束时间",
        id: "false"
      },
      {
        name: "工作室级别",
        id: "false"
      },
      {
        name: "典型成果",
        id: "false"
      },
    ],
  },
  {
    label: '承担特色课程领衔教师',
    children: [
      {
        name: "学校特色课程名称",
        id: "false"
      },
      {
        name: "担任时间",
        id: "false"
      },
      {
        name: "是否领衔教师",
        id: "false"
      },
      {
        name: "课时",
        id: "false"
      },

    ],
  },
  {
    label: '年度考核结果',
    children: [
      {
        name: "考核年度",
        id: "false"
      },
      {
        name: "考核单位名称",
        id: "false"
      },
      {
        name: "考核结果",
        id: "false"
      },
      {
        name: "考核确认日期",
        id: "false"
      },
    ],
  },
  {
    label: '教师资格',
    children: [
      {
        name: "资格证种类",
        id: "false"
      },
      {
        name: "认证学段",
        id: "false"
      },
      {
        name: "认证学科",
        id: "false"
      },
      {
        name: "颁发机构",
        id: "false"
      },
      {
        name: "首次注册日期",
        id: "false"
      },
      {
        name: "定期注册日期",
        id: "false"
      },
      {
        name: "教师资格证号码",
        id: "false"
      },
      {
        name: "证书颁发日期",
        id: "false"
      },
      {
        name: "首次注册结论",
        id: "false"
      },
      {
        name: "定期注册结论",
        id: "false"
      },
    ],
  },
  {
    label: '教师资格证认定信息',
    children: [
      {
        name: "证照状态",
        id: "false"
      },
      {
        name: "证书签发日期",
        id: "false"
      },
      {
        name: "资格种类",
        id: "false"
      },
      {
        name: "认证机构名称",
        id: "false"
      },
      {
        name: "认定批次",
        id: "false"
      },
      {
        name: "证书编号",
        id: "false"
      },
      {
        name: "教师资格证编号",
        id: "false"
      },
    ],
  },
  {
    label: '培训学时记录',
    children: [
      {
        name: "培训开始时间",
        id: "false"
      },
      {
        name: "培训结束时间",
        id: "false"
      },
      {
        name: "教师培训学时",
        id: "false"
      },
      {
        name: "组织培训单位",
        id: "false"
      },
    ],
  },
  {
    label: '证书信息',
    children: [
      {
        name: "证书类型",
        id: "false"
      },
      {
        name: "证书编号",
        id: "false"
      },
      {
        name: "语言证书名称",
        id: "false"
      },
      {
        name: "证书名称",
        id: "false"
      },
      {
        name: "发证年月",
        id: "false"
      },
      {
        name: "发证单位",
        id: "false"
      },
    ],
  },
  {
    label: '社会体育指导员证书',
    children: [
      {
        name: "证书等级",
        id: "false"
      },
      {
        name: "发证时间",
        id: "false"
      },
      {
        name: "指导项目",
        id: "false"
      },
      {
        name: "指导站点",
        id: "false"
      },
      {
        name: "证书编号",
        id: "false"
      },
      {
        name: "发证单位",
        id: "false"
      },
    ],
  },
  {
    label: '社会体育指导员技术等级培训信息',
    children: [
      {
        name: "发证单位",
        id: "false"
      },
      {
        name: "发证时间",
        id: "false"
      },
      {
        name: "成绩",
        id: "false"
      },
      {
        name: "民族",
        id: "false"
      },
      {
        name: "指导项目",
        id: "false"
      },
      {
        name: "证书编号",
        id: "false"
      },
      {
        name: "指导站点",
        id: "false"
      },
    ],
  },
  {
    label: '等级裁判员信息',
    children: [
      {
        name: "项目",
        id: "false"
      },
      {
        name: "裁判等级",
        id: "false"
      },
      {
        name: "批准日期",
        id: "false"
      },
      {
        name: "联系手机",
        id: "false"
      },
      {
        name: "备注",
        id: "false"
      },
      {
        name: "接收时间",
        id: "false"
      },
    ],
  },
  {
    label: '国家医药证书',
    children: [
      {
        name: "国家医药证书名称",
        id: "false"
      },
      {
        name: "证书(批件)号",
        id: "false"
      },
      {
        name: "本人角色",
        id: "false"
      },
      {
        name: "颁布或批准时间",
        id: "false"
      },
      {
        name: "有效期",
        id: "false"
      },
      {
        name: "是否是代表性成果和项目",
        id: "false"
      },
    ],
  },
  {
    label: '国家标准或行业标准',
    children: [
      {
        name: "标准号",
        id: "false"
      },
      {
        name: "本人角色",
        id: "false"
      },
      {
        name: "发布日期",
        id: "false"
      },
      {
        name: "发布单位",
        id: "false"
      },
      {
        name: "是否是代表性成果和项目",
        id: "false"
      },
    ],
  },
  {
    label: '语言能力',
    children: [
      {
        name: "语种",
        id: "false"
      },
      {
        name: "掌握程度",
        id: "false"
      },
    ],
  },
  {
    label: '项目（课题）',
    children: [
      {
        name: "项目类型",
        id: "false"
      },
      {
        name: "项目名称",
        id: "false"
      },
      {
        name: "项目批准号",
        id: "false"
      },
      {
        name: "学科领域",
        id: "false"
      },
      {
        name: "项目经费额度",
        id: "false"
      },
      {
        name: "开始年月",
        id: "false"
      },
      {
        name: "结束年月",
        id: "false"
      },
      {
        name: "项目中本人角色",
        id: "false"
      },
      {
        name: "本人排名",
        id: "false"
      },
      {
        name: "项目委托单位",
        id: "false"
      },
      {
        name: "项目来源",
        id: "false"
      },
      {
        name: "是否是代表性成果和项目",
        id: "false"
      },
      {
        name: "本人工作描述",
        id: "false"
      },
    ],
  },
  {
    label: '骨干教师情况',
    children: [
      {
        name: "骨干教师类型",
        id: "false"
      },
      {
        name: "骨干教师级别",
        id: "false"
      },
      {
        name: "骨干称号名称",
        id: "false"
      },
      {
        name: "获得骨干教师称号时间",
        id: "false"
      },
    ],
  },
  {
    label: '指导学生参加获奖',
    children: [
      {
        name: "获奖名称",
        id: "false"
      },
      {
        name: "本人角色",
        id: "false"
      },
      {
        name: "获奖等级",
        id: "false"
      },
      {
        name: "获奖级别",
        id: "false"
      },
      {
        name: "获奖年月",
        id: "false"
      },
      {
        name: "本人承担工作描述",
        id: "false"
      },
    ],
  },
  {
    label: '奖励',
    children: [
      {
        name: "奖励类别",
        id: "false"
      },
      {
        name: "获奖年月",
        id: "false"
      },
      {
        name: "奖励名称",
        id: "false"
      },
      {
        name: "奖励级别",
        id: "false"
      },
      {
        name: "奖励等级",
        id: "false"
      },
      {
        name: "奖励其他等级",
        id: "false"
      },
      {
        name: "本人排名",
        id: "false"
      },
      {
        name: "授权国家（地区）",
        id: "false"
      },
      {
        name: "授奖单位",
        id: "false"
      },
    ],
  },
  {
    label: '奖励',
    children: [
      {
        name: "奖励类别",
        id: "false"
      },
      {
        name: "获奖年月",
        id: "false"
      },
      {
        name: "奖励名称",
        id: "false"
      },
      {
        name: "奖励级别",
        id: "false"
      },
      {
        name: "奖励等级",
        id: "false"
      },
      {
        name: "奖励其他等级",
        id: "false"
      },
      {
        name: "本人排名",
        id: "false"
      },
      {
        name: "授权国家（地区）",
        id: "false"
      },
      {
        name: "授奖单位",
        id: "false"
      },
    ],
  },
  {
    label: '荣誉称号',
    children: [
      {
        name: "荣誉称号",
        id: "false"
      },
      {
        name: "获得称号时间",
        id: "false"
      },
      {
        name: "荣誉称号级别",
        id: "false"
      },
      {
        name: "签章单位",
        id: "false"
      },
    ],
  },
  {
    label: '班主任荣誉',
    children: [
      {
        name: "荣誉名称",
        id: "false"
      },
      {
        name: "获奖时间",
        id: "false"
      },
      {
        name: "签章单位",
        id: "false"
      },
    ],
  },
  {
    label: '先进班集体荣誉',
    children: [
      {
        name: "班集体情况",
        id: "false"
      },
      {
        name: "获奖时间",
        id: "false"
      },
      {
        name: "获奖级别",
        id: "false"
      },
      {
        name: "签章单位",
        id: "false"
      },
    ],
  },
  {
    label: '入选人才项目',
    children: [
      {
        name: "入选人才项目名称",
        id: "false"
      },
      {
        name: "入选年份",
        id: "false"
      },
    ],
  },
  {
    label: '著作',
    children: [
      {
        name: "著作类别",
        id: "false"
      },
      {
        name: "著作名称",
        id: "false"
      },
      {
        name: "学科领域",
        id: "false"
      },
      {
        name: "出版日期",
        id: "false"
      },
      {
        name: "出版社名称",
        id: "false"
      },
      {
        name: "出版号",
        id: "false"
      },
      {
        name: "著作中本人角色",
        id: "false"
      },
      {
        name: "总字数（字）",
        id: "false"
      },
      {
        name: "本人撰写字数（字）",
        id: "false"
      },
      {
        name: "是否是代表性成果和项目",
        id: "false"
      },
    ],
  },
  {
    label: '论文案例',
    children: [
      {
        name: "论文案例名称",
        id: "false"
      },
      {
        name: "论文案例级别",
        id: "false"
      },
      {
        name: "发表刊物名称",
        id: "false"
      },
      {
        name: "发表刊物级别",
        id: "false"
      },
      {
        name: "是否核心期刊",
        id: "false"
      },
      {
        name: "核心期刊类别",
        id: "false"
      },
      {
        name: "发表年月",
        id: "false"
      },
      {
        name: "卷号",
        id: "false"
      },
      {
        name: "期号",
        id: "false"
      },
      {
        name: "起始页码",
        id: "false"
      },
      {
        name: "结束页码",
        id: "false"
      },
      {
        name: "本人角色",
        id: "false"
      },
      {
        name: "学科领域",
        id: "false"
      },
      {
        name: "论文案例收录情况",
        id: "false"
      },
      {
        name: "是否发表",
        id: "false"
      },
      {
        name: "是否获奖",
        id: "false"
      },
      {
        name: "获奖年月",
        id: "false"
      },
      {
        name: "授奖单位",
        id: "false"
      },
      {
        name: "奖励名称",
        id: "false"
      },
      {
        name: "是否是代表性成果和项目",
        id: "false"
      },
      {
        name: "奖励等级",
        id: "false"
      },
    ],
  },
  {
    label: '文艺作品',
    children: [
      {
        name: "文艺作品类别",
        id: "false"
      },
      {
        name: "文艺作品名称",
        id: "false"
      },
      {
        name: "本人角色",
        id: "false"
      },
      {
        name: "完成时间",
        id: "false"
      },
      {
        name: "完成地点",
        id: "false"
      },
      {
        name: "本人工作描述",
        id: "false"
      },
      {
        name: "是否是代表性成果和项目",
        id: "false"
      },
    ],
  },
  {
    label: '专利或软件著作权',
    children: [
      {
        name: "专利或软件著作权类型",
        id: "false"
      },
      {
        name: "专利或软件著作权名称",
        id: "false"
      },
      {
        name: "学科领域",
        id: "false"
      },
      {
        name: "批准日期",
        id: "false"
      },
      {
        name: "本人角色",
        id: "false"
      },
      {
        name: "本人工作描述",
        id: "false"
      },
      {
        name: "是否是代表性成果和项目",
        id: "false"
      },
    ],
  },
  {
    label: '咨询报告或研究报告',
    children: [
      {
        name: "报告题目",
        id: "false"
      },
      {
        name: "本人角色",
        id: "false"
      },
      {
        name: "报告时间",
        id: "false"
      },
      {
        name: "委托方",
        id: "false"
      },
      {
        name: "是否是代表性成果和项目",
        id: "false"
      },
    ],
  },
  {
    label: '家庭成员及重要社会关系',
    children: [
      {
        name: "称谓",
        id: "false"
      },
      {
        name: "姓名",
        id: "false"
      },
      {
        name: "年龄",
        id: "false"
      },
      {
        name: "政治面貌",
        id: "false"
      },
      {
        name: "工作单位及职务",
        id: "false"
      },
      {
        name: "是否诸暨市教师",
        id: "false"
      },
      {
        name: "是否在农村学校任教",
        id: "false"
      },
      {
        name: "教龄",
        id: "false"
      },
    ],
  },
  {
    label: '师德考核',
    children: [
      {
        name: "师德考核时间",
        id: "false"
      },
      {
        name: "师德考核结论",
        id: "false"
      },
      {
        name: "师德考核单位名称",
        id: "false"
      },
      {
        name: "荣誉记录描述",
        id: "false"
      },
      {
        name: "荣誉发生日期",
        id: "false"
      },
      {
        name: "荣誉级别",
        id: "false"
      },
      {
        name: "荣誉授予单位名称",
        id: "false"
      },
      {
        name: "获得荣誉称号",
        id: "false"
      },
    ],
  },
  {
    label: '处分信息',
    children: [
      {
        name: "处分类型",
        id: "false"
      },
      {
        name: "违规内容",
        id: "false"
      },
      {
        name: "通报时间",
        id: "false"
      },
      {
        name: "通报单位",
        id: "false"
      },
    ],
  },
]
//教师基本信息展示列表
export const baseInfoList = reactive([
  {
    title: "基本信息",
    children: [
      {
        info: "个人信息",
        showHeader: [
          {
            label: '姓名',
            value: "",
            prop2: "name",
            span: 1,
            id: 0,
            type: "input",
            // isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请输入姓名', trigger: 'change' },
            ],
            width: "100px",
          },
          {
            label: '曾用名',
            value: "",
            prop2: "beforeName",
            span: 1,
            id: 1,
            type: "input",
            isMust: false,
            isDisable: false,
            width: "100px",
          },
          {
            label: '性别',
            value: "",
            prop2: "sex",
            span: 1,
            id: 2,
            type: "select",
            // isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择性别', trigger: 'change' },
            ],
            width: "100px",
            opt: [],
            sName: {},
          },
          {
            label: '国家和地区',
            value: "",
            prop2: "area",
            span: 1,
            id: 3,
            type: "select",
            isMust: false,
            isDisable: false,
            width: "100px",
            opt: [],
            sName: {},
          },
          {
            label: '姓名拼音',
            value: "",
            prop2: "spellName",
            span: 1,
            id: 4,
            type: "input",
            isMust: false,
            isDisable: false,
            width: "100px",
          },
          {
            label: '政治面貌',
            value: "",
            prop2: "politicsStatus",
            span: 1,
            id: 5,
            type: "select",
            isMust: false,
            isDisable: false,
            width: "100px",
            opt: [],
            sName: {},
          },
          {
            label: '出生地',
            value: "",
            prop: "birthplaceProvince",
            propArr: "birthPlaceArr",
            province1:"",//省份
            province2:"",//城市
            province3:"",//地区
            span: 1,
            id: 6,
            type: "select3",
            isMust: false,
            isDisable: false,
            width: "100px",
            opt: [],//省份
            opt1: [],//城市
            prop1: "birthplaceCity",
            opt2: [],//地区
            prop2: "birthPlace",
            prop3:"birthplaceDistrict",
            sName: {},
            // birthplace:'birthplace',
          },
          {
            label: '婚姻状况',
            value: "",
            prop2: "marriage",
            span: 1,
            id: 7,
            type: "select",
            isMust: false,
            isDisable: false,
            width: "100px",
            opt: [],
            sName: {},
          },
          {
            label: '毕业院校',
            value: "",
            prop2: "graduateSchool",
            span: 1,
            id: 8,
            type: "select",
            isMust: false,
            isDisable: true,
            width: "100px",
          },
          {
            label: '最高学历',
            value: "",
            prop2: "tallEducation",
            span: 1,
            id: 9,
            type: "select",
            isMust: false,
            isDisable: true,
            width: "100px",
          },
          {
            label: '所学专业',
            value: "",
            prop2: "specialty",
            span: 1,
            id: 10,
            type: "select",
            isMust: false,
            isDisable: true,
            width: "100px",
          },
          {
            label: '年龄',
            span: 1,
            value: "",
            prop2: "age",
            id: 11,
            type: "input",
            isMust: false,
            isDisable: true,
            width: "100px",
          },
          {
            label: '教龄',
            value: "",
            prop2: "teachAge",
            span: 1,
            id: 12,
            type: "input",
            isMust: false,
            isDisable: true,
            width: "100px",
          },
          {
            label: '手机号',
            value: "",
            prop2: "phone",
            span: 1,
            id: 13,
            type: "input",
            isMust: false,
            isDisable: false,
            width: "100px",
          },
          {
            label: '民族',
            value: "",
            prop2: "nation",
            id: 14,
            type: "select",
            // isMust: true,
            isDisable: false,
            placeholder: "请选择名族",
            rules: [
              { required: true, message: '请选择名族', trigger: 'change' },
            ],
            width: "100px",
            opt: [],
            sName: {},
          },
          {
            label: '入党时间',
            value: "",
            prop2: "joinTime",
            span: 1,
            id: 15,
            type: "date",
            isMust: false,
            isDisable: false,
            width: "100px",
            time: "time",
            // prop:"joinTime"
          },
          {
            label: '籍贯',
            value: "",
            prop: "nativePlaceProvince",
            propArr: "nativePlaceArr",
            province1:'',
            province2:'',
            province3:'',
            span: 1,
            id: 16,
            type: "select3",
            isMust: false,
            isDisable: false,
            width: "100px",
            opt: [],//省份
            opt1: [],//城市
            prop1: "nativePlaceCity",
            opt2: [],//地区
            prop2: "nativePlace",
            prop3:'nativePlaceDistrict',
            sName: {},
          },
          {
            label: '健康状况',
            value: "",
            prop2: "physicalCondition",
            span: 1,
            id: 17,
            type: "select",
            isMust: false,
            isDisable: false,
            width: "100px",
            opt: [],
            sName: {},
          },
          {
            label: '出生日期',
            value: "",
            prop2: "birthTime",
            span: 1,
            id: 18,
            type: "date",
            isMust: false,
            isDisable: false,
            width: "100px",
            time: "time",
          },
          {
            label: '个人邮箱',
            value: "",
            prop2: "email",
            span: 1,
            id: 19,
            type: "input",
            isMust: false,
            isDisable: false,
            width: "100px",
          },
          {
            label: '照片',
            value: "",
            prop2: "headImg",
            span: 1,
            id: 20,
            type: "upload",
            // isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请上传照片', trigger: 'change' },
            ],
            width: "100px",
            img: 'img',
          },
          {
            label: '从教开始时间',
            value: "",
            prop2: "teachTime",
            span: 1,
            id: 21,
            type: "date",
            isMust: false,
            isDisable: false,
            width: "100px",
            time: "time",
          }
        ]
      },
      {
        info: "编制信息",
        showHeader: [
          {
            label: '工作单位',
            value: "",
            id: 0,
            type: "input",
            isMust: false,
            isDisable: true,
            prop2: "workName",
            width: "138px",
            rules: [
              { required: true, message: '请选择工作单位', trigger: 'change' },
            ],
          },
          {
            label: '隶属集团',
            value: "",
            id: 1,
            type: "select4",
            isMust: false,
            isDisable: false,
            Any_layer:true,
            prop2: "affiliationWork",
            width: "138px",
            opt: [],
            sName: {},
          },
          {
            label: '编制单位(用工单位)',
            value: "",
            id: 2,
            type: "select4",
            isMust: false,
            isDisable: false,
            Any_layer:true,
            prop2: "organizationUnit",
            opt: [],
            sName: {},
            width: "138px",
          },
          {
            label: '编制类型',
            width: "138px",
            value: "",
            id: 3,
            type: "select",
            isMust: false,
            isDisable: true,
            prop2: "authorizedStrengthType",
            opt: [],
            sName: {},
          },
          {
            label: '编制状态',
            width: "138px",
            value: "",
            id: 4,
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "authorizedStrengthState",
            rules: [
              { required: true, message: '请选择编制状态', trigger: 'change' },
            ],
            opt: [],
            sName: {},
          },
          {
            label: '人员状态',
            width: "138px",
            value: "",
            id: 5,
            type: "input",
            isMust: false,
            isDisable: true,
            prop2: "personState",
            opt: [],
            sName: {},
          },
          {
            label: '入编时间',
            width: "138px",
            value: "",
            id: 6,
            type: "date",
            isMust: false,
            isDisable: false,
            prop2: "joinTime",
            time: "time",
          }
        ],
      },
      {
        info: "在编信息",
        info2: "在编",
        showHeader: [
          {
            label: '教职工来源',
            width: "100px",
            value: "",
            value2: "",
            id: 0,
            type: "select2",
            isMust: false,
            isDisable: false,
            prop2: "teacherSource",
            prop: "teacherSourceSupplement",
            opt: [],//录用
            opt2: [],//录用下一级
            prop1: "employment",//录用
            sName: {},
          }, {
            label: '进入本校日期',
            width: "100px",
            value: "",
            id: 1,
            type: "date",
            isMust: false,
            isDisable: false,
            prop2: "joinTime",
            time: "time"
          }, {
            label: '参加工作日期',
            width: "100px",
            value: "",
            id: 2,
            type: "date",
            isMust: false,
            isDisable: false,
            prop2: "joinWorkTime",
            time: "time"
          }, {
            label: '用人形式',
            width: "100px",
            value: "",
            id: 3,
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "choosePerson",
            opt: [],
            sName: {},
          }, {
            label: '签订合同情况',
            width: "100px",
            value: "",
            id: 4,
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "workName",
            opt: [],
            sName: {},
          },
        ]
      },
      {
        info: "非编信息",
        info2: "非编",
        showHeader: [
          {
            label: '岗位分类',
            width: "130px",
            value: "",
            id: 0,
            value1: "",
            type: "select",
            isMust: true,
            isDisable: false,
            prop2: "jobClassify",
            opt: [],
            sName: {},
            rules: [
              { required: true, message: '请选择岗位分类', trigger: 'change' },
            ],
          }, {
            label: '人员类别',
            width: "130px",
            value: "",
            id: 1,
            value1: "",
            type: "select",
            isMust: true,
            isDisable: false,
            prop2: "personnelCategory",
            opt: [],
            sName: {},
            rules: [
              { required: true, message: '请选择人员类别', trigger: 'change' },
            ],
          }, {
            label: '用工方式',
            width: "130px",
            value: "",
            id: 2,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "employmentMode",
            opt: [],
            sName: {},
          }, {
            label: '签订合同情况',
            width: "130px",
            value: "",
            id: 3,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "contractType",
            opt: [],
            sName: {},
          }, {
            label: '劳务派遣机构',
            width: "130px",
            value: "",
            id: 4,
            value1: "",
            type: "input",
            isMust: false,
            isDisable: false,
            prop2: "serviceAgency",
          }, {
            label: '进入本单位年月',
            width: "130px",
            value: "",
            id: 5,
            value1: "",
            type: "dateMonth",
            isMust: true,
            isDisable: false,
            prop2: "joinTime",
            time: "time",
            rules: [
              { required: true, message: '请选择进入本单位年月', trigger: 'change' },
            ],
          }, {
            label: '合同期起',
            width: "130px",
            value: "",
            value_other: "",
            id: 6,
            value1: "",
            type: "date",
            isMust: false,
            isDisable: false,
            prop2: "contractStartTime",
            time: "time",
            rules: [
              {
                required: true,
                validator: startTime_1,
                trigger: 'change'
              },
            ],
          }, {
            label: '合同期止',
            width: "130px",
            value: "",
            value_other: "",
            id: 7,
            value1: "",
            type: "date",
            isMust: false,
            isDisable: false,
            prop2: "contractEndTime",
            time: "time",
            rules: [
              {
                required: true,
                validator: endTime_1,
                trigger: 'change'
              },
            ],
          }, {
            label: '经费来源',
            width: "130px",
            value: "",
            id: 8,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "moneySource",
            opt: [],
            sName: {},
          }, {
            label: '是否人事代理',
            width: "130px",
            value: "",
            id: 9,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "agency",
            opt: [],
            sName: {},
          }, {
            label: '是否退休返聘',
            width: "130px",
            value: "",
            id: 10,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "retire",
            opt: [],
            sName: {},
          },
        ]
      },
      {
        info: "其他信息",
        showHeader: [
          {
            label: '信息技术应用能力',
            width: "208px",
            value: "",
            id: 0,
            value1: "",
            type: "select",
            isMust: true,
            isDisable: false,
            rules: [
              { required: true, message: '请选择信息技术应用能力', trigger: 'change' },
            ],
            prop2: "capacity",
            opt: [],
            sName: {},
          }, {
            label: '是否受过特教专业培养培训',
            width: "208px",
            value: "",
            id: 1,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isTrain",
            opt: [],
            sName: {},
          }, {
            label: '是否特级教师',
            width: "208px",
            value: "",
            id: 2,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isSuperfineTeacher",
            opt: [],
            sName: {},
          }, {
            label: '是否全日制师范类专业毕业',
            width: "208px",
            value: "",
            id: 3,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "jobClassify",
            opt: [],
            sName: {},
          }, {
            label: '是否受过学前教育专业培养培训',
            width: "208px",
            value: "",
            id: 4,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isTeacherTraining",
            opt: [],
            sName: {},
          }, {
            label: '是否全日制学前教育专业毕业',
            width: "208px",
            value: "",
            id: 5,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isPreschoolEducation",
            opt: [],
            sName: {},
          }, {
            label: '是否"双师型"教师',
            width: "208px",
            value: "",
            id: 6,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isDoubleTeacher",
            opt: [],
            sName: {},
          }, {
            label: '是否有特殊教育从业证书',
            width: "208px",
            value: "",
            id: 7,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isCertificate",
            opt: [],
            sName: {},
          }, {
            label: '是否参加基层服务项目',
            width: "208px",
            value: "",
            id: 8,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isJoinBasicLevel",
            opt: [],
            sName: {},
          }, {
            label: '是否属于免费（公费）师范生',
            width: "208px",
            value: "",
            id: 9,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isPublicExpense",
            opt: [],
            sName: {},
          }, {
            label: '是否县级以上骨干教师',
            width: "208px",
            value: "",
            id: 10,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isCoreTeacher",
            opt: [],
            sName: {},
          }, {
            label: '是否心理健康教育教师',
            width: "208px",
            value: "",
            id: 11,
            value1: "",
            type: "select",
            isMust: false,
            isDisable: false,
            prop2: "isMentalHealthTeacher",
            opt: [],
            sName: {},
          },
        ]
      },
    ]
  }
])
//表格表头及表格内容枚举
export const tableList = reactive(
  [
    {
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
              opt: [],
              sName: {},
            },
            {
              prop2: "teachingSection",
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
              prop2: "teachingCourse",//第二级
              label: "任教课程",
              value: "",
              type: "select2",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择授课日期', trigger: 'blur' },
              ],
              opt: [],//第一级
              opt2: [],//第二级
              prop1: "course",//第一级
              sName: {},
            },
            {
              prop2: "partJob",
              label: "兼任工作",
              value: "",
              type: "select",
              isMust: false,
              isDisable: true,
              // rules: [
              //   { required: true, message: '请选择授课日期', trigger: 'blur' },
              // ],
              opt: [],
              sName: {},
            },
            {
              prop2: "teachingClassType",
              label: "任教班级类型",
              value: "",
              type: "select",
              isMust: true,
              isDisable: true,
              rules: [
                { required: true, message: '请选择任教班级类型', trigger: 'blur' },
              ],
              opt: [],
              sName: {},
            },
            {
              prop2: "teachingGrade",
              label: "任教年级",
              value: "",
              type: "select",
              isMust: true,
              isDisable: true,
              rules: [
                { required: true, message: '请选择任教年级', trigger: 'blur' },
              ],
              opt: [],
              sName: {},
            },
            {
              prop2: "teachingClass",
              label: "任教班级",
              // isClass: true,
              value: "",
              type: "select",
              isMust: false,
              isDisable: true,
              rules: [
                { required: true, message: '请选择任教班级', trigger: 'blur' },
              ],
              opt: [],
              sName: {},
            },
            {
              prop2: "hour",
              label: "课时",
              value: Number,
              type: "number",
              isMust: false,
              isDisable: false,
              rules: [
                { required: true, message: '请选择授课日期', trigger: 'blur' },
              ],
            }
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
              rules: [
                { required: true, message: '请选择授课日期', trigger: 'blur' },
              ],
              time: 'time',
            },
            {
              prop2: "teachingCourseTitle",
              label: "讲授课程名称",
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
              value: Number,
              type: "number",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入学生数', trigger: 'blur' },
              ],
            },
            {
              prop2: "organizationUnit",
              label: "组织单位",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入组织单位', trigger: 'blur' },
              ],
            },
            // {
            //   prop: "annex",
            //   label: "附件",
            //   value:"",
            //   type:"upload",
            // },
          ],
          tableContent: [
            {
              lectureDate: "1",
              teachingCourseTitle: "1",
              teachingObject: "1",
              studentNumber: 1,
              organizationUnit: "1",
            },
            {
              lectureDate: "2",
              teachingCourseTitle: "2",
              teachingObject: "2",
              studentNumber: 2,
              organizationUnit: "2",
            },
            {
              lectureDate: "3",
              teachingCourseTitle: "3",
              teachingObject: "3",
              studentNumber: 3,
              organizationUnit: "3",
            },
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
              isDisable: false,
              rules: [
                { required: true, message: '请输入承担市外支教任务情况', trigger: 'blur' },
              ],
            },
            {
              prop2: "supportEducationStart",
              label: "支教开始时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择支教开始时间', trigger: 'blur' },
              ],
              time: "time",
            },
            {
              prop2: "supportEducationEnd",
              label: "支教结束时间",
              value: "",
              type: "date",
              isMust: false,
              isDisable: false,
              time: "time",
            },
            {
              prop2: "supportEducationOrganization",
              label: "支教组织单位",
              value: "",
              type: "input",
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
    },
   
  
    
    
    
   
    
  
  ]
)
export default {
  baseInfoList,
  tableList,
}
