// 枚举
//教师基本信息有图片
export const teacherPersonalInfoENUM = [
  {
    label: '姓名',
    value: "唐小倩",
    id: 0
  },
  {
    label: '曾用名',
    value: "",
    id: 1
  },
  {
    label: '性别',
    value: "女",
    id: 2
  },
  {
    label: '国籍/地区',
    value: "中国",
    id: 3
  }, {
    label: '姓名拼音',
    value: "TangXiaoTang",
    id: 4
  }, {
    label: '政治面貌',
    value: "中共党员",
    id: 5
  }, {
    label: '出生地',
    value: "浙江省绍兴市诸暨市",
    id: 6
  }, {
    label: '婚姻',
    value: "未婚",
    id: 7
  }, {
    label: '毕业院校',
    value: "四川师范大学",
    id: 8
  }, {
    label: '最高学历',
    value: "硕士研究生毕业",
    id: 9
  }, {
    label: '年龄',
    value: 34,
    id: 10
  }, {
    label: '性别',
    value: "女",
    id: 11
  }, {
    label: '手机号',
    value: 13900000001,
    id: 12
  }, {
    label: '名族',
    value: "汉族",
    id: 13
  }, {
    label: '入党时间',
    value: "2007-06-19",
    id: 14
  }, {
    label: '籍贯',
    value: "浙江省绍兴市诸暨市",
    id: 15
  }, {
    label: '健康状况',
    value: "健康或良好",
    id: 16
  }, {
    label: '所学专业',
    value: "现代教育技术",
    id: 17
  }, {
    label: '出生日期',
    value: "1988-06-14",
    id: 18
  }, {
    label: '个人邮箱',
    value: "12345678@qq.com",
    id: 19
  }, {
    label: '照片',
    value: "照片",
    id: 20
  }, {
    label: '从教开始时间',
    value: "2008-06-14",
    id: 21}]
 
//教师基本信息没有图片
export const organizationENUM = [
  {
    title: "编制信息",
    children: [
      {
        label: '工作单位',
        value: "中山市教育技术中心",
        id: 0
      }, {
        label: '隶属集团',
        value: "",
        id: 1
      }, {
        label: '编制单位(用工单位)',
        value: "中山安华实验学校",
        id: 2
      }, {
        label: '编制类型',
        value: "事业单位人员编制",
        id: 3
      }, {
        label: '编制状态',
        value: "在编",
        id: 4
      }, {
        label: '人员状态',
        value: "在本单位任职",
        id: 5
      }, {
        label: '入编时间',
        value: "2008-06-14",
        id: 6
      }
    ]
  },
  {
    title: "在编信息",
    children: [
      {
        label: '教职工来源',
        value: "应届毕业生",
        id: 0
      }, {
        label: '进入本校日期',
        value: "2013-08-01",
        id: 1
      }, {
        label: '参加工作日期',
        value: "2013-08-01",
        id: 2
      }, {
        label: '用人形式',
        value: "聘用",
        id: 3
      }, {
        label: '签订合同情况',
        value: "聘用合同",
        id: 4
      },
    ]
  },
  {
    title: "非编信息",
    children: [
      {
        label: '岗位分类',
        value: "保安",
        id: 0
      }, {
        label: '人员类别',
        value: "编外聘用人员",
        id: 1
      }, {
        label: '用工方式',
        value: "自聘",
        id: 2
      }, {
        label: '签订合同情况',
        value: "劳动合同",
        id: 3
      }, {
        label: '劳务派遣机构',
        value: "中山新世纪劳务派遣公司",
        id: 4
      }, {
        label: '进入本单位年月',
        value: "2013-08-01",
        id: 5
      }, {
        label: '合同期起',
        value: "2013-08-01",
        id: 6
      }, {
        label: '合同期止',
        value: "2033-08-01",
        id: 7
      }, {
        label: '经费来源',
        value: "政府性基金",
        id: 8
      }, {
        label: '是否人事代理',
        value: "否",
        id: 9
      }, {
        label: '是否退休返聘',
        value: "否",
        id: 10
      },
    ]
  },
  {
    title: "其他信息",
    children: [
      {
        label: '信息技术应能力',
        value: "精通",
        id: 0
      }, {
        label: '是否受过特教专业培养培训',
        value: "否",
        id: 1
      }, {
        label: '是否特级教师',
        value: "否",
        id: 2
      }, {
        label: '是否全日制师范类专业毕业',
        value: "是",
        id: 3
      }, {
        label: '是否受过学前教育专业培养培训',
        value: "否",
        id: 4
      }, {
        label: '是否全日制学前教育专业毕业',
        value: "否",
        id: 5
      }, {
        label: '是否"双师型"教师',
        value: "否",
        id: 6
      }, {
        label: '是否有特殊教育从业证书',
        value: "否",
        id: 7
      }, {
        label: '是否参加基层服务项目',
        value: "否",
        id: 8
      }, {
        label: '是否属于免费（公费）师范生',
        value: "否",
        id: 9
      }, {
        label: '是否县级以上骨干教师',
        value: "否",
        id: 10
      }, {
        label: '是否心理健康教育教师',
        value: "否",
        id: 11
      },
    ]
  },
]
//教育教学表头
export const EducationTeachingENUM = [
  {
    prop: "semester",
    label: "学期",
  },
  {
    prop: "teachCondition",
    label: "任教状况",
  },
  {
    prop: "teachPeriod",
    label: "任教学段"
  },
  {
    prop: "teachSubject",
    label: "任教科目",
  },
  {
    prop: "partTimeJob",
    label: "兼任工作",
  },
  {
    prop: "classType",
    label: "任教班级类型",
  },
  {
    prop: "teachGrade",
    label: "任教年级",
  },
  {
    prop: "teachClass",
    label: "任教班级",
    isClass: true,
  },
  {
    prop: "teachTime",
    label: "课时",
  }
]
//教育教学内容
export const tableDataENUM = [
  {
    id: 1,
    semester: "2022-2023 下学期",
    teachCondition: "未任课",
    teachPeriod: "",
    teachSubject: "",
    partTimeJob: "",
    classType: "",
    teachGrade: "",
    teachClass: "",
    teachTime: "",
  },
  {
    id: 2,
    semester: "2022-2023 上学期",
    teachCondition: "未任课",
    teachPeriod: "",
    teachSubject: "",
    partTimeJob: "",
    classType: "",
    teachGrade: "",
    teachClass: "",
    teachTime: "",
  },
  {
    id: 3,
    semester: "2021-2022 下学期",
    teachCondition: "未任课",
    teachPeriod: "",
    teachSubject: "",
    partTimeJob: "",
    classType: "",
    teachGrade: "",
    teachClass: "",
    teachTime: "",
  },
  {
    id: 4,
    semester: "2021-2022 上学期",
    teachCondition: "任课",
    teachPeriod: "初中",
    teachSubject: "信息技术",
    partTimeJob: "教研组长",
    classType: "行政班",
    teachGrade: "七年级",
    teachClass: ["一班", "二班"],
    teachTime: "10",
  },
  {
    id: 5,
    semester: "2020-2021 下学期",
    teachCondition: "任课",
    teachPeriod: "初中",
    teachSubject: "信息技术",
    partTimeJob: "教研组长",
    classType: "行政班",
    teachGrade: "七年级",
    teachClass: ["一班", "二班"],
    teachTime: "10",
  },
  {
    id: 6,
    semester: "2020-2021 上学期",
    teachCondition: "任课",
    teachPeriod: "初中",
    teachSubject: "信息技术",
    partTimeJob: "教研组长",
    classType: "行政班",
    teachGrade: "七年级",
    teachClass: "",
    teachTime: "10",
  },
  {
    id: 7,
    semester: "2019-2020 下学期",
    teachCondition: "任课",
    teachPeriod: "初中",
    teachSubject: "信息技术",
    partTimeJob: "",
    classType: "行政班",
    teachGrade: "七年级",
    teachClass: "",
    teachTime: "10",
  },
  {
    id: 8,
    semester: "2019-2020 上学期",
    teachCondition: "任课",
    teachPeriod: "初中",
    teachSubject: "信息技术",
    partTimeJob: "",
    classType: "行政班",
    teachGrade: "七年级",
    teachClass: "",
    teachTime: "10",
  },
]
// 承担公开课表格表头
export const openClassENUM = [
  {
    prop: "teachTime",
    label: "授课日期",
  },
  {
    prop: "teachClassName",
    label: "讲授课程名称",
  },
  {
    prop: "teachTarget",
    label: "授课对象",
  },
  {
    prop: "studentNumber",
    label: "学生数",
  },
  {
    prop: "organization",
    label: "组织单位",
  },
]
// 承担公开课表格内容
export const openClassContentENUM = [
  {
    id: 1,
    teachTime: "2021-05-31",
    teachClassName: "生活和算法",
    teachTarget: "初中学生",
    studentNumber: "30",
    organization: "中山市教育研究中心",
  },
  {
    id: 2,
    teachTime: "2021-05-31",
    teachClassName: "生活和算法",
    teachTarget: "初中学生",
    studentNumber: "30",
    organization: "中山市教育研究中心",
  },
]
//承担市外支教任务情况表头
export const SupportingEducationENUM = [
  {
    prop: "SupportingEducationSchool",
    label: "支教学校/单位",
  },
  {
    prop: "SupportingEducationStartTime",
    label: "支教开始时间",
  },
  {
    prop: "SupportingEducationEndTime",
    label: "支教结束时间",
  },
  {
    prop: "SupportingEducationOrganization",
    label: "支教组织单位",
  },
]
//承担市外支教任务情况表格内容
export const SupportingEducationContentENUM = [
  {
    id: 1,
    SupportingEducationSchool: '中山安华实验学校',
    SupportingEducationStartTime: "2022-09-01",
    SupportingEducationEndTime: '2025-08-31',
    SupportingEducationOrganization: '中山市教育研究中心'
  }
]

export const tableList = [
  {
    title: '教育教学',
    children: [
      {
        info: '教育教学',
        isOperate:true,
        isAnnex:false,
        tableHeader: [
          {
            prop: "semester",
            label: "学期",
          },
          {
            prop: "teachCondition",
            label: "任教状况",
          },
          {
            prop: "teachPeriod",
            label: "任教学段"
          },
          {
            prop: "teachSubject",
            label: "任教科目",
          },
          {
            prop: "partTimeJob",
            label: "兼任工作",
          },
          {
            prop: "classType",
            label: "任教班级类型",
          },
          {
            prop: "teachGrade",
            label: "任教年级",
          },
          {
            prop: "teachClass",
            label: "任教班级",
            isClass: true,
          },
          {
            prop: "teachTime",
            label: "课时",
          }
        ],
        tableContent: [
          {
            id: 1,
            semester: "2022-2023 下学期",
            teachCondition: "未任课",
            teachPeriod: "",
            teachSubject: "",
            partTimeJob: "",
            classType: "",
            teachGrade: "",
            teachClass: "",
            teachTime: "",
          },
          {
            id: 2,
            semester: "2022-2023 上学期",
            teachCondition: "未任课",
            teachPeriod: "",
            teachSubject: "",
            partTimeJob: "",
            classType: "",
            teachGrade: "",
            teachClass: "",
            teachTime: "",
          },
          {
            id: 3,
            semester: "2021-2022 下学期",
            teachCondition: "未任课",
            teachPeriod: "",
            teachSubject: "",
            partTimeJob: "",
            classType: "",
            teachGrade: "",
            teachClass: "",
            teachTime: "",
          },
          {
            id: 4,
            semester: "2021-2022 上学期",
            teachCondition: "任课",
            teachPeriod: "初中",
            teachSubject: "信息技术",
            partTimeJob: "教研组长",
            classType: "行政班",
            teachGrade: "七年级",
            teachClass: ["一班", "二班"],
            teachTime: "10",
          },
          {
            id: 5,
            semester: "2020-2021 下学期",
            teachCondition: "任课",
            teachPeriod: "初中",
            teachSubject: "信息技术",
            partTimeJob: "教研组长",
            classType: "行政班",
            teachGrade: "七年级",
            teachClass: ["一班", "二班"],
            teachTime: "10",
          },
          {
            id: 6,
            semester: "2020-2021 上学期",
            teachCondition: "任课",
            teachPeriod: "初中",
            teachSubject: "信息技术",
            partTimeJob: "教研组长",
            classType: "行政班",
            teachGrade: "七年级",
            teachClass: "",
            teachTime: "10",
          },
          {
            id: 7,
            semester: "2019-2020 下学期",
            teachCondition: "任课",
            teachPeriod: "初中",
            teachSubject: "信息技术",
            partTimeJob: "",
            classType: "行政班",
            teachGrade: "七年级",
            teachClass: "",
            teachTime: "10",
          },
          {
            id: 8,
            semester: "2019-2020 上学期",
            teachCondition: "任课",
            teachPeriod: "初中",
            teachSubject: "信息技术",
            partTimeJob: "",
            classType: "行政班",
            teachGrade: "七年级",
            teachClass: "",
            teachTime: "10",
          },
        ],
      },
      {
        info: '承担公开课等情况',
        isOperate:true,
        isAnnex:true,
        tableHeader: [
          {
            prop: "teachTime",
            label: "授课日期",
          },
          {
            prop: "teachClassName",
            label: "讲授课程名称",
          },
          {
            prop: "teachTarget",
            label: "授课对象",
          },
          {
            prop: "studentNumber",
            label: "学生数",
          },
          {
            prop: "organization",
            label: "组织单位",
          },
        ],
        tableContent: [
          {
            id: 1,
            teachTime: "2021-05-31",
            teachClassName: "生活和算法",
            teachTarget: "初中学生",
            studentNumber: "30",
            organization: "中山市教育研究中心",
          },
          {
            id: 2,
            teachTime: "2021-05-31",
            teachClassName: "生活和算法",
            teachTarget: "初中学生",
            studentNumber: "30",
            organization: "中山市教育研究中心",
          },
        ],
      },
      {
        info: '承担市外支教任务情况',
        isOperate:true,
        isAnnex:true,
        tableHeader: [
          {
            prop: "SupportingEducationSchool",
            label: "支教学校/单位",
          },
          {
            prop: "SupportingEducationStartTime",
            label: "支教开始时间",
          },
          {
            prop: "SupportingEducationEndTime",
            label: "支教结束时间",
          },
          {
            prop: "SupportingEducationOrganization",
            label: "支教组织单位",
          },
        ],
        tableContent: [
          {
            id: 1,
            SupportingEducationSchool: '中山安华实验学校',
            SupportingEducationStartTime: "2022-09-01",
            SupportingEducationEndTime: '2025-08-31',
            SupportingEducationOrganization: '中山市教育研究中心'
          }
        ],
      },
    ]
  },
  {
    title: '学习经历',
    children: [
      {
        info: '学习经历',
        isOperate:true,
        isAnnex:true,
        tableHeader: [
          {
            prop: "intake",
            label: "入学年月",
          },
          {
            prop: "graduationTime",
            label: "毕业年月",
          },
          {
            prop: "learningStyle",
            label: "学习方式",
          },
          {
            prop: "organizationCategory",
            label: "在学单位类别",
          },
          {
            prop: "education",
            label: "学历",
          },
          {
            prop: "country",
            label: "获得学历的国家(地区)",
          },
          {
            prop: "institution",
            label: "获得学历的院校或机构",
          },
          {
            prop: "major",
            label: "专业名称",
          },
          {
            prop: "otherMajor",
            label: "其他专业",
          },
          {
            prop: "academicDegree",
            label: "学位层次",
          },
          {
            prop: "academicDegreeName",
            label: "学位名称",
          },
          {
            prop: "academicDegreeCountry",
            label: "获得学位的国家(地区)",
          },
          {
            prop: "getInstitution",
            label: "获得学位的院校或机构",
          },
          {
            prop: "getAcademicDegree",
            label: "学位授予年月",
          },
          {
            prop: "teacherTraining",
            label: "是否师范类专业",
          },
          {
            prop: "highestDegree",
            label: "最高学历标识",
          },
          {
            prop: "firstDegree",
            label: "第一学历标识",
          },
        ],
        tableContent: [
          {
            id: 0,
            intake: "2011-09",
            graduationTime: '2013-07',
            learningStyle: '全脱产（离岗）',
            organizationCategory: "全日制高等学校",
            education: '硕士研究生毕业',
            country: "中国",
            institution: "四川师范大学",
            major: "现代教育技术",
            otherMajor: "",
            academicDegree: "硕士",
            academicDegreeName: "教育学硕士学位",
            academicDegreeCountry: "中国",
            getInstitution: "四川师范大学",
            getAcademicDegree: "2013-07",
            teacherTraining: "否",
            highestDegree: "是",
            firstDegree: ""
          }
        ],
      },
      {
        info: '国内培训',
        isOperate:true,
        isAnnex:true,
        tableHeader: [
          {
            prop: "projectName",
            label: "培训项目名称",
          },
          {
            prop: "projectYear",
            label: "培训年度",
          },
          {
            prop: "projectType",
            label: "培训类别",
          },
          {
            prop: "projectInstitution",
            label: "培训机构名称",
          },
          {
            prop: "projectMethod",
            label: "培训方式",
          },
          {
            prop: "getProjectPeriod",
            label: "培训获得学时",
          },
          {
            prop: "getProjectCredit",
            label: "培训获得学分",
          },
          {
            prop: "projectStart",
            label: "培训开始日期",
          },
          {
            prop: "projectEnd",
            label: "培训结束日期",
          },
        ],
        tableContent: [
          {
            id: 0,
            projectName: "四川师范大学",
            projectYear: "2022",
            projectType: "学习",
            projectInstitution: "四川师范大学",
            projectMethod: "自学",
            getProjectPeriod: "4",
            getProjectCredit: "1",
            projectStart: "2022-09-01",
            projectEnd: "2023-06-30"
          }
        ],
      },
      {
        info: '海外研修',
        isOperate:true,
        isAnnex:true,
        tableHeader: [
          {
            prop: "projectYear",
            label: "培训年度",
          },
          {
            prop: "projectStart",
            label: "开始日期",
          },
          {
            prop: "projectEnd",
            label: "结束日期",
          },
          {
            prop: "projectCountry",
            label: "国家(地区)",
          },
          {
            prop: "projectInstitution",
            label: "研修(访学)机构名称",
          },
          {
            prop: "projectName",
            label: "项目名称",
          },
          {
            prop: "organizationName",
            label: "项目组织单位名称",
          },
        ],
        tableContent: [
          {
            id: 0,
            projectYear: "2022",
            projectStart: "2022-09-01",
            projectEnd: "2023-06-30",
            projectCountry:"中国",
            projectInstitution: "四川师范大学",
            projectName:"四川师范大学",
            organizationName:"四川师范大学"
          }
        ],
      },
    ]
  },
]
export default {
  teacherPersonalInfoENUM,
  organizationENUM,
  EducationTeachingENUM,
  tableDataENUM,
  openClassENUM,
  openClassContentENUM,
  tableList,
}
