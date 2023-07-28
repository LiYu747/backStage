//教师基本信息展示列表
export const baseInfoList = ref([
  {
    info: "个人信息",
    type:'staff',
    showHeader: [
      {
        label: "姓名",
        value: "",
        prop: "name",
      },
      {
        label: "曾用名",
        value: "",
        prop: "beforeName",
      },
      {
        label: "性别",
        value: "",
        prop: "sex",
      },
      {
        label: "年龄",
        value: "",
        prop: "age",
      },
      {
        label: "民族",
        value: "",
        prop: "nation"
      },
      {
        label: "出生地",
        value: "",
        prop: "address",
      },
      {
        label: "籍贯",
        value: "",
        prop: "nativePlace",
      },
      {
        label: "教龄",
        value: "",
        prop: "teachAge",
      },
     
      {
        label: "毕业院校",
        value: "",
        prop: "graduateSchool",
      },
      {
        label: "手机号",
        value: "",
        prop: "phone",
      },
    
      {
        label: "所学专业",
        value: "",
        prop: "specialty",
      },
      {
        label: "入党时间",
        value: "",
        prop: "joinTime",
        type:'date',
      },
    
      {
        label: "健康状况",
        value: "",
        prop: "physicalCondition",
      },
      {
        label: "婚姻状况",
        value: "",
        prop: "marriage",
      },
     
     
    {
      label: "姓名拼音",
      value: "",
      prop: "spellName",
    },
    {
      label: "个人邮箱",
      value: "",
      prop: "email",
    },
  
      {
        label: "政治面貌",
        value: "",
        prop: "politicsStatus",
      },
      {
        label: "出生日期",
        value: "",
        prop: "birthTime",
        type:'date',
      },
      {
        label: "最高学历",
        value: "",
        prop: "tallEducation",
      },
     
     
      {
        label: "国家和地区",
        value: "",
        prop: "area",
      },
      {
        label: "照片",
        value: "",
        prop: "headImg",
        type:'img',
      },
      {
        label: "从教开始时间",
        value: "",
        prop: "teachTime",
        type:'date',
      },
    ],
  },
  {
    info: "编制信息",
    type:'authorizedStrength',
    showHeader: [
      {
        label: "工作单位",
        value: "",
        prop: "workName",
      },
      {
        label: "隶属集团",
        value: "",
        prop: "affiliationWork",
      
      },
      {
        label: "入编时间",
        value: "",
        prop: "joinTime",
        type:'date',
      },
      
      {
        label: "编制单位(用工单位)",
        value: "",
        prop: "organizationUnit",
        width:'180px',
        iptWid:'467px'
      },
      {
        label: "编制状态",
        value: "",
        prop: "authorizedStrengthState",
      },
      {
        label: "人员状态",
        value: "",
        prop: "personState",
      },
      {
        label: "编制类型",
        value: "",
        prop: "authorizedStrengthType",
      },
    
    ],
  },
  {
    info: "在编信息",
    info2: "在编",
    type:'inAuthorizedStrength',
    showHeader: [
      {
        label: "教职工来源",
        value: "",
        prop: "teacherSource", 
      },
      {
        label: "进入本校日期",
        value: "",
        prop: "joinTime",
        type:'date',
      },
      {
        label: "参加工作日期",
        value: "",
        prop: "joinWorkTime",
        type:'date',
      },
      {
        label: "用人形式",
        value: "",
        prop: "choosePerson",
      },
      {
        label: "签订合同情况",
        value: "",
        prop: "workName",
      },
    ],
  },
  {
    info: "非编信息",
    info2: "非编",
    type:'notAuthorizedStrength',
    showHeader: [
      {
        label: "岗位分类",
        value: "",
        prop: "jobClassify",
      },
      {
        label: "人员类别",
        value: "",
        prop: "personnelCategory",
      },
      {
        label: "用工方式",
        value: "",
        prop: "employmentMode",
      },
      {
        label: "签订合同情况",
        value: "",
        prop: "contractType",
      },
      {
        label: "劳务派遣机构",
        value: "",
        prop: "serviceAgency",
      },
      {
        label: "进入本单位年月",
        value: "",
        prop: "joinTime",
        type:'date',
      },
      {
        label: "合同期起",
        value: "",
        prop: "contractStartTime",
        type:'date',
      },
      {
        label: "合同期止",
        value: "",
        prop: "contractEndTime",
        type:'date',
      },
      {
        label: "经费来源",
        value: "",
        prop: "moneySource",
      },
      {
        label: "是否人事代理",
        value: "",
        prop: "workName",
      },
      {
        label: "是否退休返聘",
        value: "",
        prop: "workName",
      },
    ],
  },
  {
    info: "其他信息",
    type:'elseMessage',
    showHeader: [
      {
        label: "信息技术应用能力",
        value: "",
        prop: "capacity",
        width:'195px'
      },
      {
        label: "是否受过特教专业培养培训",
        value: "",
        prop: "isTrain",
        width:'190px'
      },
      {
        label: "是否县级以上骨干教师",
        value: "",
        prop: "isCoreTeacher",
        width:'195px'
      },
      {
        label: "是否有特殊教育从业证书",
        value: "",
        prop: "isCertificate",
        width:'215px'
      },
     
      
      {
        label: '是否"双师型"教师',
        value: "",
        prop: "isDoubleTeacher",
        width:'195px'
      },
      {
        label: "是否全日制师范类专业毕业",
        value: "",
        prop: "isPreschoolEducation",
        width:'190px'
      },
      {
        label: "是否心理健康教育教师",
        value: "",
        prop: "isMentalHealthTeacher",
        width:'195px'
      },
      {
        label: "是否属于免费（公费）师范生",
        value: "",
        prop: "isPublicExpense",
        width:'215px'
      },
      {
        label: "是否特级教师",
        value: "",
        prop: "isSuperfineTeacher",
        width:'195px'
      },
      {
        label: "是否全日制学前教育专业毕业",
        value: "",
        prop: "isPreschoolEducation",
        width:'195px'
      },
      {
        label: "是否参加基层服务项目",
        value: "",
        prop: "isJoinBasicLevel",
        width:'195px'
      },
 
      {
        label: "是否受过学前教育专业培养培训",
        value: "",
        prop: "isTeacherTraining",
        width:'215px'
      },
    ],
  },
  {
    info: '教育教学',
    type:'educationTeaching',
    showHeader: [
      {
        prop: "semester",
        label: "学期",
        value: "",
      },
      {
        prop: "teachingSituation",
        label: "任教状况",
        value: "",
      },
      {
        prop: "teachingSection",
        label: "任教学段",
        value: "",
      },
      {
        prop: "teachingCourse",//第二级
        label: "任教课程",
        value: "",
      },
      {
        prop: "partJob",
        label: "兼任工作",
        value: "",
      },
      {
        prop: "teachingClassType",
        label: "任教班级类型",
        value: "",
      },
      {
        prop: "teachingGrade",
        label: "任教年级",
        value: "",
      },
      {
        prop: "teachingClass",
        label: "任教班级",
        value: "",
      },
      {
        prop2: "hour",
        label: "课时",
        value: "",
      }
    ],
  },
  {
    info: '承担公开课等情况',
    type:'openClass',
    showHeader: [
      {
        prop: "lectureDate",
        label: "授课日期",
        value: "",
        type: "date",
      },
      {
        prop: "teachingCourseTitle",
        label: "讲授课程名称",
        value: "",
      },
      {
        prop: "teachingObject",
        label: "授课对象",
        value: "",
      },
      {
        prop: "organizationUnit",
        label: "组织单位",
        value: "",
        iptWid:"460px"
      },
      {
        prop: "studentNumber",
        label: "学生数",
        value: 0,
        iptWid:"200px"
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      },
    ],
    tableContent: [
    ],
  },
  {
    info: '承担市外支教任务情况',
    type:"supportEducation",
    showHeader: [
      {
        prop: "supportEducationUnit",
        label: "支教学校/单位",
        value: "",
      },
      {
        prop: "supportEducationStart",
        label: "支教开始时间",
        value: "",
        type: "date",
      },
      {
        prop: "supportEducationEnd",
        label: "支教结束时间",
        value: "",
        type: "date",
      },
      {
        prop: "supportEducationOrganization",
        label: "支教组织单位",
        value: "",
      },
    ],
    tableContent: [],
  },
  {
    info: '学习经历',
    type:'studyExperience',
    showHeader: [
      {
        prop: "entranceTime",
        label: "入学年月",
        value: "",
        type:'date',
         width:'160px'
      },
      {
        prop: "graduateTime",
        label: "毕业年月",
        value: "",
        type:'date',
        width:'160px'
      },
      {
        prop: "learningStyle",
        label: "学习方式",
        value: "",
        width:'160px'
      },
      {
        prop: "unitCategory",
        label: "在学单位类别",
        value: "",
        width:'160px'
      },
      {
        prop: "educationBackground",
        label: "学历",
        value: "",
        width:'160px'
      },
      {
        prop: "getEducationBackgroundNation",
        label: "获得学历的国家(地区)",
        value: "",
        width:'160px'
      },
      {
        prop: "getDegreeNaAcademy",
        label: "获得学历的院校或机构",
        value: "",
        width:'160px'
      },
      {
        prop: "major",
        label: "专业名称",
        value: "",
        width:'160px'
      },
      {
        prop: "elseMajor",
        label: "其他专业",
        value: "",
         width:'160px'
      },
      {
        prop: "gradation",
        label: "学位层次",
        value: "",
        width:'160px'
      },
      {
        prop: "degreeLevel",
        label: "学位名称",
        value: "",
        width:'160px'
      },
      {
        prop: "getDegreeNation",
        label: "获得学位的国家(地区)",
        value: "",
        width:'160px'
      },
      {
        prop: "getEducationBackgroundAcademy",
        label: "获得学位的院校或机构",
        value: "",
        width:'160px'
      },
      {
        prop: "awardTime",
        label: "学位授予年月",
        value: "",
        type:'date',
        width:'160px'
      },
      {
        prop: "isTeacherTraining",
        label: "是否师范类专业",
        value: "",
        width:'160px'
      },
      {
        prop: "highestEducation",
        label: "最高学历标识",
        value: "",
        width:'160px'
      },
      {
        prop: "firstEducation",
        label: "第一学历标识",
        value: "",
        width:'160px'
      },
    ],
  
  },
  {
    info: '国内培训',
    type:'domesticTraining',
    showHeader: [
      {
        prop: "trainingName",
        label: "培训项目名称",
        value: "",
      },
      {
        prop: "trainingYear",
        label: "培训年度",
        value: "",
        type:'dateYear',
      },
      {
        prop: "trainingCategory",
        label: "培训类别",
        value: "",
      },
      {
        prop: "trainingOrganization",
        label: "培训机构名称",
        value: "",
      },
      {
        prop: "cultivateWay",
        label: "培训方式",
        value: "",
      },
      {
        prop: "period",
        label: "培训获得学时",
        value: "",
      },
      {
        prop: "credit",
        label: "培训获得学分",
        value: "",
      },
      {
        prop: "trainStart",
        label: "培训开始日期",
        value: "",
        type:'date',
      },
      {
        prop: "trainEnd",
        label: "培训结束日期",
        value: "",
        type:'date',
      },
    ],
    tableContent: [],
  },
  {
    info: '海外研修',
    type:'studyAbroad',
    showHeader: [
      {
        prop: "cultivateYear",
        label: "培训年度",
        value: "",
        type: "dateYear", 
      },
 
      {
        prop: "area",
        label: "国家(地区)",
        value: "",
      },
      {
        prop: "organizationName",
        label: "研修(访学)机构名称",
        value: "",
        width:'160px'
      },
      {
        prop: "projectName",
        label: "项目名称",
        value: "",
        width:'150px',
      },

    
      {
        prop: "startTime",
        label: "开始日期",
        value: "",
        type: "date",

      },
      {
        prop: "endTime",
        label: "结束日期",
        value: "",
        type: "date",
      },
      
      {
        prop: "unitName",
        label: "项目组织单位名称",
        value: "",
        iptWid:'370px',
        width:'160px'
      },
    ],
    tableContent: [],
  },
  {
    info: '工作经历',
    type:'workExperience',
    showHeader: [
      {
        prop: "employerName",
        label: "任职单位名称",
        value: "",
      },
      {
        prop: "officeStart",
        label: "任职开始年月",
        value: "",
        type: "date", 
      },
      {
        prop: "officeEnd",
        label: "任职结束年月",
        value: "",
        type: "date", 
      },
      {
        prop: "unitNature",
        label: "单位性质类别",
        value: "",
      },
      {
        prop: "position",
        label: "任职岗位",
        value: "",
      },
      {
        prop: "certifier",
        label: "证明人",
        value: "",
      },
      {
        prop: "rewardsPunishment",
        label: "奖惩情况",
        value: "",
      },
      {
        prop: "isNewest",
        label: "是否最新",
        value: "",
      },
      {
        prop: "teacherAgeLimit",
        label: "班主任年限",
        value: "",
      },
      {
        prop: "isCountry",
        label: "是否农村",
        value: "",
      },
    ],
    tableContent: [],
  },
  {
    info: '交流轮岗',
    type:'workShift',
    showHeader: [
      {
        prop: "employerName",
        label: "交流轮岗类型",
        value: "",
        width:'160px'
      },
      {
        prop: "startTime",
        label: "开始年月",
        value: "",
        type: "date", 
        width:'150px'
      },
      {
        prop: "endTime",
        label: "结束年月",
        value: "",
        type: "date", 
      },
      {
        prop: "oldUnitName",
        label: "原单位名称",
        value: "",
      },
      {
        prop: "workShiftName",
        label: "交流轮岗单位名称",
        value: "",
        width:'150px'
      },
      {
        prop: "isTransfer",
        label: "是否调动人事关系",
        value: "",
        width:'150px'
      },
    ],
    tableContent: [],
  },
  {
    info: '岗位聘任',
    type:'positionRecruitment',
    showHeader: [
      {
        prop: "additionalJobCategory",
        label: "岗位类别",
        value: "",
      },
      {
        prop: "jobGrade",
        label: "岗位等级",
        value: "",
      },
      {
        prop: "hireTime",
        label: "聘任开始日期",
        value: "",
        type: "date", 
      },
      {
        prop: "additionalJobCategory",
        label: "兼任岗位类别",
        value: "",
      },
      {
        prop: "additionalJobGrade",
        label: "兼任岗位等级",
        value: "",
      },
      {
        prop: "administrativeDuty",
        label: "行政职务",
        value: "",
      },
      {
        prop: "dministrativeRank",
        label: "行政职级",
        value: "",
      },
      {
        prop: "affiliationDepartment",
        label: "所属部门(科室)",
        value: "",
      },
      {
        prop: "officeStart",
        label: "任职开始年月",
        value: "",
        type: "date", 
      },
    ],
    tableContent: [],
  },
  {
    info: '专业技术职务聘任',
    type:'technicalAppointment',
    showHeader: [
      {
        prop: "engageJob",
        label: "聘任专业技术职务",
        value: "",
        width:'150px'
      },
      {
        prop: "engageStart",
        label: "聘任开始日期",
        value: "",
        type: "date", 
      },
      {
        prop: "engageEnd",
        label: "聘任结束日期",
        value: "",
        type: "date", 
      },
      {
        prop: "engageName",
        label: "聘任单位名称",
        value: "",
      },
      {
        prop: "advantage",
        label: "熟悉专业有何专长",
        value: "",
        width:'140px'
      },
      
    ],
    tableContent: [],
  },
  {
    info: '担任培训专家情况',
    type:'expertSituation',
    showHeader: [
      {
        prop: "activityName",
        label: "活动名称",
        value: "",
      },
      {
        prop: "cultivateTheme",
        label: "培训主题",
        value: "",
      },
      {
        prop: "cultivateRank",
        label: "培训级别",
        value: "",
      },
      {
        prop: "cultivateTime",
        label: "培训时间",
        value: "",
        type: "date", 
      },
      {
        prop: "organization",
        label: "组织单位",
        value: "",
      },
      
    ],
    tableContent: [],
  },
  {
    info: '担任评审专家情况',
    type:'assessmentExperts',
    showHeader: [
      {
        prop: "activityName",
        label: "活动名称",
        value: "",
      },
      {
        prop: "activityLevel",
        label: "评审活动级别",
        value: "",
      },
      {
        prop: "reviewTime",
        label: "评审时间",
        value: "",
        type: "date", 
      },
      {
        prop: "organization",
        label: "组织单位",
        value: "",
      },
      
    ],
    tableContent: [],
  },
  {
    info: '名师工作室负责人情况',
    type:'teacherWorkRoom',
    showHeader: [
      {
        prop: "teacherWorkRoomName",
        label: "名师工作室名称",
        value: "",
      },
      {
        prop: "workRoomCount",
        label: "工作室人数",
        value: "",
      },
      {
        prop: "startTime",
        label: "组建开始时间",
        value: "",
        type: "date", 
        iptWid:'220px'
      },
      {
        prop: "endTime",
        label: "结束时间",
        value: "",
        type: "date", 
        iptWid:'220px'
      },
      {
        prop: "workRoomRank",
        label: "工作室级别",
        value: "",
        iptWid:'380px'
      },
      {
        prop: "achievement",
        label: "典型成果",
        value: "",
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      },
      
    ],
    tableContent: [],
  },
  {
    info: '承担特色课程领衔教师',
    type:'characteristicCourseTeacher',
    showHeader: [
      {
        prop: "courseName",
        label: "学校特色课程名称",
        value: "",
        width:'160px'
      },
      {
        prop: "actAsTime",
        label: "担任时间",
        value: "",
        type: "date", 
      },
      {
        prop: "isLeanTeacher",
        label: "是否领衔教师",
        value: "",
      },
      {
        prop: "hour",
        label: "课时",
        value: "",
      },    
    ],
    tableContent: [],
  },
  {
    info: '年度考核结果',
    type:'annualAssessment',
    showHeader: [
      {
        prop: "assessmentTime",
        label: "考核年度",
        value: "",
        type: "date", 
      },
      {
        prop: "assessmentUnitName",
        label: "考核单位名称",
        value: "",
      },
      {
        prop: "assessmentResult",
        label: "考核结果",
        value: "",
      },
      {
        prop: "confirmationDate",
        label: "考核确认日期",
        value: "",
        type: "date", 
      },    
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      },
    ],
    tableContent: [],
  },
  {
    info: '教师资格',
    type:'teacherCertification',
    showHeader: [
      {
        prop: "certificationKind",
        label: "资格证种类",
        value: "",
      },
      {
        prop: "authenticationStudying",
        label: "认证学段",
        value: "",
      },
      {
        prop: "authenticationSubject",
        label: "认证学科",
        value: "",
      },
      {
        prop: "issueOrganization",
        label: "颁发机构",
        value: "",
      },    
      {
        prop: "firstRegisterTime",
        label: "首次注册日期",
        value: "",
        type: "date", 
      },    
      {
        prop: "regularRegisterTime",
        label: "定期注册日期",
        value: "",
        type: "date", 
      },    
      {
        prop: "teacherCertificationID",
        label: "教师资格证号码",
        value: "",
      },    
      {
        prop: "issuingCertificatesTime",
        label: "证书颁发日期",
        value: "",
        type: "date", 
      },    
      {
        prop: "firstRegisterConclusion",
        label: "首次注册结论",
        value: "",
      },    
      {
        prop: "regularRegisterConclusion",
        label: "定期注册结论",
        value: "",
      },   
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      }, 
    ],
    tableContent: [],
  },
  {
    info: '教师资格证认定信息',
    type:'teacherCertificationAffirm',
    showHeader: [
      {
        prop: "certificateState",
        label: "证照状态",
        value: "",
      },
      {
        prop: "releaseDate",
        label: "证书签发日期",
        value: "",
        type: "date", 
      },
      {
        prop: "qualificationKind",
        label: "资格种类",
        value: "",
      },
      {
        prop: "organizationName",
        label: "认证机构名称",
        value: "",
      },    
      {
        prop: "affirmBatch",
        label: "认定批次",
        value: "",
      },    
      {
        prop: "certificateId",
        label: "证书编号",
        value: "",
      },    
      {
        prop: "teacherCertificationId",
        label: "教师资格证编号",
        value: "",
      },    
    ],
    tableContent: [],
  },
  {
    info: '培训学时记录',
    type:'trainingHours',
    showHeader: [
      {
        prop: "trainStartTime",
        label: "培训开始时间",
        value: "",
      },
      {
        prop: "trainEndTime",
        label: "培训结束时间",
        value: "",
        type: "date", 
      },
      {
        prop: "trainingHours",
        label: "教师培训学时",
        value: "",
      },
      {
        prop: "trainOrganizationName",
        label: "组织培训单位",
        value: "",
      },     
    ],
    tableContent: [],
  },
  {
    info: '证书信息',
    type:'certificateInformation',
    showHeader: [
      {
        prop: "certificateType",
        label: "证书类型",
        value: "",
      },
      {
        prop: "certificateId",
        label: "证书编号",
        value: "",
      },
      {
        prop: "certificateName",
        label: "证书名称",
        value: "",
      },
      {
        prop: "languageCertificateName",
        label: "语言证书名称",
        value: "",
        iptWid:"450px"
      },     
      {
        prop: "getCertificateTime",
        label: "发证年月",
        value: "",
        type: "date", 
      },     
      {
        prop: "getCertificateUnit",
        label: "发证单位",
        value: "",
      },     
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      }, 
    ],
    tableContent: [],
  },
  {
    info: '社会体育指导员证书',
    type:'societySportsGuidanceCertificate',
    showHeader: [
      {
        prop: "certificateGrade",
        label: "证书类型",
        value: "",
      },
      {
        prop: "getCertificateTime",
        label: "发证时间",
        value: "",
        type: "date", 
      },
      {
        prop: "guidanceProject",
        label: "指导项目",
        value: "",
      },
      {
        prop: "guidanceSite",
        label: "指导站点",
        value: "",
      },     
      {
        prop: "certificateId",
        label: "证书编号",
        value: "",
      },     
      {
        prop: "getCertificateUnit",
        label: "发证单位",
        value: "",
      },     
    ],
    tableContent: [],
  },
  {
    info: '社会体育指导员技术等级培训信息',
    type:'societySportsGuidanceTrainMessage',
    showHeader: [
      {
        prop: "issueUnit",
        label: "发证单位",
        value: "",
      },
      {
        prop: "issueTime",
        label: "发证时间",
        value: "",
        type: "date", 
      },
      {
        prop: "trainScore",
        label: "成绩",
        value: "",
      },
      {
        prop: "nation",
        label: "民族",
        value: "",
      },     
      {
        prop: "guidanceProject",
        label: "指导项目",
        value: "",
      },     
      {
        prop: "certificateId",
        label: "证书编号",
        value: "",
      },     
      {
        prop: "guidanceSite",
        label: "指导站点",
        value: "",
      },     
    ],
    tableContent: [],
  },
  {
    info: '等级裁判员信息',
    type:'refereeInformation',
    showHeader: [
      {
        prop: "project",
        label: "项目",
        value: "",
      },
      {
        prop: "judgeGrade",
        label: "裁判等级",
        value: "",
      },
      {
        prop: "ratifyTime",
        label: "批准日期",
        value: "",
        type: "date", 
      },
      {
        prop: "relationPhone",
        label: "联系手机",
        value: "",
      },     
      {
        prop: "comment",
        label: "备注",
        value: "",
      },     
      {
        prop: "receptionTime",
        label: "接收时间",
        value: "",
        type: "date", 
      },        
    ],
    tableContent: [],
  },
  {
    info: '国家医药证书',
    type:'nationMedicineCertificate',
    showHeader: [
      {
        prop: "nationMedicineCertificateName",
        label: "国家医药证书",
        value: "",
      },
      {
        prop: "certificateId",
        label: "证书(批件)号",
        value: "",
        width:'180px'
      },
      {
        prop: "selfRole",
        label: "本人角色",
        value: "",
      },
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'180px',
        iptWid:"465px"
      },  
      {
        prop: "ratifyTime",
        label: "颁布或批准时间",
        value: "",
        type: "date", 
      },     
      {
        prop: "inDateTime",
        label: "有效期",
        value: "",
        type: "date", 
      },     
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'180px'
      }, 
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      },        
    ],
    tableContent: [],
  },
  {
    info: '国家标准或行业标准',
    type:'governmentStandard',
    showHeader: [
      {
        prop: "standardId",
        label: "标准号",
        value: "",
        width:'180px'
      },
      {
        prop: "selfRole",
        label: "本人角色",
        value: "",
      },
      {
        prop: "releaseTime",
        label: "发布日期",
        value: "",
        type: "date", 
      },
      {
        prop: "releaseUnit",
        label: "发布单位",
        value: "",
      },     
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'180px'
      },  
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      },     
    ],
    tableContent: [],
  },
  {
    info: '语言能力',
    type:'languageCapacity',
    showHeader: [
      {
        prop: "language",
        label: "语种",
        value: "",
      },
      {
        prop: "masteryDegree",
        label: "掌握程度",
        value: "",
      },
        
    ],
    tableContent: [],
  },
  {
    info: '项目（课题）',
    type:'projectTopic',
    showHeader: [
      {
        prop: "projectType",
        label: "项目类型",
        value: "",
      },
      {
        prop: "projectName",
        label: "项目名称",
        value: "",
        width:'120px'
      },
      {
        prop: "projectRatifyId",
        label: "项目批准号",
        value: "",
      },
      {
        prop: "subjectAmbit",
        label: "学科领域",
        value: "",
        width:'175px'
      },
      {
        prop: "expenditureLimit",
        label: "项目经费额度",
        value: "",
      },
      {
        prop: "startTime",
        label: "开始年月",
        value: "",
        type: "date", 
      },
      {
        prop: "endTime",
        label: "结束年月",
        value: "",
        type: "date", 
        width:'120px'
      },
      {
        prop: "selfRole",
        label: "项目中本人角色",
        value: "",
        width:'175px'
      },
      {
        prop: "selfRanking",
        label: "本人排名",
        value: "",
      },
      {
        prop: "entrustUnit",
        label: "项目委托单位",
        value: "",
      },
      {
        prop: "projectSource",
        label: "项目来源",
        value: "",
      },
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'175px'
      },
      {
        prop: "workDescribe",
        label: "本人工作描述",
        value: "",
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      },  
    ],
    tableContent: [],
  },
  {
    info: '骨干教师情况',
    type:'backboneTeacher',
    showHeader: [
      {
        prop: "backboneTeacherType",
        label: "骨干教师类型",
        value: "",
      },
      {
        prop: "backboneTeacherRank",
        label: "骨干教师级别",
        value: "",
      },
      {
        prop: "backboneTeacherName",
        label: "骨干称号名称",
        value: "",
      },
      {
        prop: "getBackboneTeacherTime",
        label: "获得骨干教师称号时间",
        value: "",
        type: "date", 
        width:'185px',
      },
    ],
    tableContent: [],
  },
  {
    info: '指导学生参加获奖',
    type:'instructStudentsAward',
    showHeader: [
      {
        prop: "getAwardName",
        label: "获奖名称",
        value: "",
      },
      {
        prop: "selfRole",
        label: "本人角色",
        value: "",
        width:'160px'
      },
      {
        prop: "getAwardGrade",
        label: "获奖等级",
        value: "",
      },
      {
        prop: "getAwardRank",
        label: "获奖级别",
        value: "",
      },
      {
        prop: "getAwardTime",
        label: "获奖年月",
        value: "",
        type: "date", 
      },
      {
        prop: "jobDescription",
        label: "本人承担工作描述",
        value: "",
        width:'160px'
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      },  
    ],
    tableContent: [],
  },
  {
    info: '奖励',
    type:'award',
    showHeader: [
      {
        prop: "awardCategory",
        label: "奖励类别",
        value: "",
      },
      {
        prop: "getAwardTime",
        label: "获奖年月",
        value: "",
        type: "date", 
      },
      {
        prop: "awardName",
        label: "奖励名称",
        value: "",
      },
      {
        prop: "awardRank",
        label: "获奖级别",
        value: "",
        width:'130px'
      },
      {
        prop: "awardGrade",
        label: "奖励等级",
        value: "",
      },
      {
        prop: "awardElseGrade",
        label: "奖励其他等级",
        value: "",
      },
      {
        prop: "selfRanking",
        label: "本人排名",
        value: "",
      },
      {
        prop: "area",
        label: "授权国家（地区）",
        value: "",
        width:'130px'
      },
      {
        prop: "awardPrizeUnit",
        label: "授奖单位",
        value: "",
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      }, 
    ],
    tableContent: [],
  },
  {
    info: '荣誉称号',
    type:'honoraryTitle',
    showHeader: [
      {
        prop: "honorName",
        label: "荣誉称号",
        value: "",
      },
      {
        prop: "getHonorTime",
        label: "获得称号时间",
        value: "",
        type: "date", 
      },
      {
        prop: "getHonorRank",
        label: "荣誉称号级别",
        value: "",
      },
      {
        prop: "signatureUnit",
        label: "签章单位",
        value: "",
      },
     
    ],
    tableContent: [],
  },
  {
    info: '班主任荣誉',
    type:'classTeacherHonor',
    showHeader: [
      {
        prop: "honorName",
        label: "荣誉名称",
        value: "",
      },
      {
        prop: "getAwardTime",
        label: "获奖时间",
        value: "",
        type: "date", 
      },
      {
        prop: "signatureUnit",
        label: "签章单位",
        value: "",
      },
    ],
    tableContent: [],
  },
  {
    info: '先进班集体荣誉',
    type:'advancedClass',
    showHeader: [
      {
        prop: "honorClass",
        label: "荣誉班级",
        value: "",
      },
      {
        prop: "classCondition",
        label: "班集体情况",
        value: "",
      },
      {
        prop: "signatureTime",
        label: "获奖时间",
        value: "",
        type: "date", 
      },
      {
        prop: "getAwardRank",
        label: "获奖级别",
        value: "",
      },
      {
        prop: "signatureUnit",
        label: "签章单位",
        value: "",
      },
    ],
    tableContent: [],
  },
  {
    info: '入选人才项目',
    type:'talentProject',
    showHeader: [
      {
        prop: "talentProjectName",
        label: "入选人才项目名称",
        value: "",
        width: "160px",
      },
      {
        prop: "talentProjectTime",
        label: "入选年份",
        value: "",
        type: "date", 
      },
    ],
    tableContent: [],
  },
  {
    info: '著作',
    type:'production',
    showHeader: [
      {
        prop: "productionType",
        label: "著作类别 ",
        value: "",
        width:'150px'
      },
      {
        prop: "productionName",
        label: "著作名称",
        value: "",
        width:'70px'
      },
      {
        prop: "subjectAmbit",
        label: "学科领域",
        value: "",
      },
      {
        prop: "publicationTime",
        label: "出版日期",
        value: "",
        type: "date", 
      },
      {
        prop: "pressName",
        label: "出版社名称",
        value: "",
        width:'150px'
      },
      {
        prop: "publicationId",
        label: "出版号",
        value: "",
        width:'170px'
      },
      {
        prop: "inProductionSelfRole",
        label: "著作中本人角色",
        value: "",
      },
      {
        prop: "wordNumber",
        label: "总字数（字）",
        value: "",
      },
      {
        prop: "selfWrite",
        label: "本人撰写字数（字）",
        value: "",
        width:'150px'
      },
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'170px'
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      }, 
    ],
    tableContent: [],
  },
  {
    info: '论文案例',
    type:'thesisCase',
    showHeader: [
      {
        prop: "paperCaseName",
        label: "论文案例名称 ",
        value: "",
      },
      {
        prop: "paperCaseRank",
        label: "论文案例级别",
        value: "",
        width:'150px'
      },
      {
        prop: "issueJournalsName",
        label: "发表刊物名称",
        value: "",
      },
      {
        prop: "issueJournalsRank",
        label: "发表刊物级别",
        value: "",
        width:'175px'
      },
      {
        prop: "isCoreJournal",
        label: "是否核心期刊",
        value: "",
      },
      {
        prop: "coreJournalType",
        label: "核心期刊类别",
        value: "",
        width:'150px'
      },
      {
        prop: "publishTime",
        label: "发表年月",
        value: "",
        type: "date",
      },
      {
        prop: "reelId",
        label: "卷号",
        value: "",
        width:'175px'
      },
      {
        prop: "expectId",
        label: "期号",
        value: "",
      },
      {
        prop: "startPage",
        label: "起始页码",
        value: "",
        width:'150px'
      },
      {
        prop: "endPage",
        label: "结束页码",
        value: "",
      },
      {
        prop: "selfRole",
        label: "本人角色",
        value: "",
        width:'175px'
      },
      {
        prop: "ambit",
        label: "学科领域",
        value: "",
      },
      {
        prop: "publicationId",
        label: "论文案例收录情况",
        value: "",
        width:'150px'
      },
      {
        prop: "isPublic",
        label: "是否发表",
        value: "",
      },
      {
        prop: "isGetAward",
        label: "是否获奖",
        value: "",
        width:'175px'
      },
      {
        prop: "getAwardTime",
        label: "获奖年月",
        value: "",
        type: "date",
      },
      {
        prop: "awardPrizeUnit",
        label: "授奖单位",
        value: "",
        width:'150px'
      },
      {
        prop: "awardName",
        label: "奖励名称",
        value: "",
      },
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'175px'
      },
      {
        prop: "awardGrade",
        label: "奖励等级",
        value: "",
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
        width:'150px'
      }, 
    ],
    tableContent: [],
  },
  {
    info: '文艺作品',
    type:'literaryWorks',
    showHeader: [
      {
        prop: "literaryWorksType",
        label: "文艺作品类别",
        value: "",
      },
      {
        prop: "literaryWorksName",
        label: "文艺作品名称",
        value: "",
      },
      {
        prop: "selfRole",
        label: "本人角色",
        value: "",
        width:'170px'
      },
      {
        prop: "accomplishTime",
        label: "完成时间",
        value: "",
        type: "date",
      },
      {
        prop: "accomplishPlace",
        label: "完成地点",
        value: "",
      },
      {
        prop: "workDescribe",
        label: "本人工作描述",
        value: "",
      },
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'170px'
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      }, 
    ],
    tableContent: [],
  },
  {
    info: '专利或软件著作权',
    type:'patent',
    showHeader: [
      {
        prop: "patentType",
        label: "专利或软件著作权类型",
        value: "",
        width:'155px'
      },
      {
        prop: "patentName",
        label: "专利或软件著作权名称",
        value: "",
        width:'175px'
      },
      {
        prop: "subjectAmbit",
        label: "学科领域",
        value: "",
        width:'175px'
      },
      {
        prop: "ratifyTime",
        label: "批准日期",
        value: "",
        type: "date",
      },
      {
        prop: "selfRole",
        label: "本人角色",
        value: "",
        width:'155px'
      },
      {
        prop: "workDescribe",
        label: "本人工作描述",
        value: "",
      },
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'175px'
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      }, 
    ],
    tableContent: [],
  },
  {
    info: '咨询报告或研究报告',
    type:'studyReport',
    showHeader: [
      {
        prop: "reportTitle",
        label: "报告题目",
        value: "",
        width:'80px'
      },
      {
        prop: "selfRole",
        label: "本人角色",
        value: "",
      },
      {
        prop: "reportTime",
        label: "报告时间",
        value: "",
        type: "date",
      },
      {
        prop: "client",
        label: "委托方",
        value: "",
      },
      {
        prop: "isRepresentativeAchievement",
        label: "是否是代表性成果和项目",
        value: "",
        width:'175px'
      },
      {
        prop: "attachmentName",
        label: "附件",
        value:"",
        type:"upload",
      }, 
    ],
    tableContent: [],
  },
  {
    info: '家庭成员及重要社会关系',
    type:'familyTies',
    showHeader: [
      {
        prop: "appellation",
        label: "称谓",
        value: "",
      },
      {
        prop: "name",
        label: "姓名",
        value: "",
        width:'150px'
      },
      {
        prop: "age",
        label: "年龄",
        value: "",
        width:'150px'
      },
      {
        prop: "politicsStatus",
        label: "政治面貌",
        value: "",
      },
      {
        prop: "organizationWork",
        label: "工作单位及职务",
        value: "",
      },
      {
        prop: "isZJTeacher",
        label: "是否诸暨市教师",
        value: "",
        width:'150px'
      },
      {
        prop: "isInVillage",
        label: "是否在农村学校任教",
        value: "",
        width:'150px'
      },
      {
        prop: "teachAge",
        label: "教龄",
        value: "",
      },
    ],
    tableContent: [],
  },
  {
    info: '师德考核',
    type:'teacherMeritAssess',
    showHeader: [
      {
        prop: "teacherMeritAssessTime",
        label: "师德考核时间",
        value: "",
        type: "date",
        
      },
      {
        prop: "teacherMeritAssessResult",
        label: "师德考核结论",
        value: "",
      },
      {
        prop: "teacherMeritAssessUnitName",
        label: "师德考核单位名称",
        value: "",
        width:'150px'
      },
      {
        prop: "recordHonorDescription",
        label: "荣誉记录描述",
        value: "",
      },
      {
        prop: "honorHappenTime",
        label: "荣誉发生日期",
        value: "",
        type: "date",
      },
      {
        prop: "isZJTeacher",
        label: "荣誉级别",
        value: "",
      },
      {
        prop: "conferUnitName",
        label: "荣誉授予单位名称",
        value: "",
        width:'150px'
      },
      {
        prop: "honoraryTitle",
        label: "获得荣誉称号",
        value: "",
      },
    ],
    tableContent: [],
  },
  {
    info: '处分信息',
    type:'disciplinaryInformation',
    showHeader: [
      {
        prop: "disciplinaryInformationType",
        label: "处分类型",
        value: "",
      },
      {
        prop: "deregulationContent",
        label: "违规内容",
        value: "",
      },
      {
        prop: "notificationTime",
        label: "通报时间",
        value: "",
        type: "date",
      },
      {
        prop: "reportingUnit",
        label: "通报单位",
        value: "",
      },
    ],
    tableContent: [],
  },
]);
export const getType = (type) => {
 let arr = []
 baseInfoList.value.map( item => {
    if(item.type === type) {
        arr = item
    }
 })
 return arr
}
 