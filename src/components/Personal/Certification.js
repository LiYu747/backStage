//标准时间转时间戳
const transitionJab = (val) => {
  const date = new Date(val) * 1
  return date
}
const startTime = (rule, value, callback) => {
  let start = educationAndTraining.value.children[0].tableHeader[4].value
  let end = educationAndTraining.value.children[0].tableHeader[5].value
  if (value === '' || value === null) {
    callback(new Error('首次注册日期'))
  } else {
    if (transitionJab(start) >= transitionJab(end)) {
      callback('首次注册日期不能大于或等于定期注册日期')
      educationAndTraining.value.children[0].tableHeader[4].value = 'blank'
    } else {
      callback()
    }

  }
}

const endTime = (rule, value, callback) => {
  let start = educationAndTraining.value.children[0].tableHeader[4].value
  let end = educationAndTraining.value.children[0].tableHeader[5].value
  if (value === '' || value === null) {
    callback(new Error('请选择定期注册日期'))
  } else {
    if (transitionJab(start) >= transitionJab(end)) {
      callback('定期注册日期不能大于或等于首次注册日期')
      educationAndTraining.value.children[0].tableHeader[5].value = 'blank'
    } else {
      callback()
    }
  }
}

const startTime_1 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[2].tableHeader[0].value
  let end = educationAndTraining.value.children[2].tableHeader[1].value
  if (value === '' || value === null) {
    callback(new Error('培训开始时间'))
  } else {
    if (transitionJab(start) >= transitionJab(end)) {
      callback('培训开始时间不能大于或等于培训结束时间')
      educationAndTraining.value.children[2].tableHeader[0].value = 'blank'
    } else {
      callback()
    }

  }
}

const endTime_1 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[2].tableHeader[0].value
  let end = educationAndTraining.value.children[2].tableHeader[1].value
  if (value === '' || value === null) {
    callback(new Error('培训结束时间'))
  } else {
    if (transitionJab(start) >= transitionJab(end)) {
      callback('培训结束时间不能大于或等于培训开始时间')
      educationAndTraining.value.children[2].tableHeader[1].value = 'blank'
    } else {
      callback()
    }
  }
}

const startTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[6].tableHeader[2].value
  let end = educationAndTraining.value.children[6].tableHeader[5].value
  if (value === '' || value === null) {
    callback(new Error('批准日期'))
  } else {
    if (transitionJab(start) >= transitionJab(end)) {
      callback('批准日期不能大于或等于接收时间')
      educationAndTraining.value.children[6].tableHeader[2].value = 'blank'
    } else {
      callback()
    }

  }
}

const endTime_2 = (rule, value, callback) => {
  let start = educationAndTraining.value.children[6].tableHeader[2].value
  let end = educationAndTraining.value.children[6].tableHeader[5].value
  if (value === '' || value === null) {
    callback(new Error('接收时间'))
  } else {
    if (transitionJab(start) >= transitionJab(end)) {
      callback('接收时间不能大于或等于批准日期')
      educationAndTraining.value.children[6].tableHeader[5].value = 'blank'
    } else {
      callback()
    }
  }
}
export const educationAndTraining = ref(
    {
      title: '资格证',
      children: [
        {
          info: '教师资格',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "122px",
              prop2: "certificationKind",
              label: "资格证种类",
              new:'top',
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
              // rules: [
              //   { required: true, message: '请选择资格证种类', trigger: 'change' },
              // ],
              opt: [],
            },
            {
              width: "122px",
              prop2: "authenticationStudying",
              label: "认证学段",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择认证学段', trigger: 'change' },
              ],
              opt: [],
            },
            {
              width: "122px",
              prop2: "authenticationSubject",
              label: "认证学科",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
              // rules: [
              //   { required: true, message: '请选择认证学科', trigger: 'change' },
              // ],
              opt: [],
            },
            {
              width: "122px",
              prop2: "issueOrganization",
              label: "颁发机构",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择颁发机构', trigger: 'change' },
              ],
       
            },
            {
              width: "122px",
              prop2: "firstRegisterTime",
              label: "首次注册日期",
              value: "",
              type: "date",
              isMust: false,
              isDisable: false,
              rules: [
                {
                  required: true,
                  validator: startTime,
                  trigger: 'change'
                },
              ],
            },
            {
              width: "122px",
              prop2: "regularRegisterTime",
              label: "定期注册日期",
              value: "",
              type: "date",
              isMust: false,
              isDisable: false,
              rules: [
                {
                  required: true,
                  validator: endTime,
                  trigger: 'change'
                },
              ],
            },
            {
              width: "122px",
              prop2: "teacherCertificationID",
              label: "教师资格证号码",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择教师资格证号码', trigger: 'change' },
              ],
  
            },
            {
              width: "122px",
              prop2: "issuingCertificatesTime",
              label: "证书颁发日期",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择证书颁发日期', trigger: 'change' },
              ],
        
            },
            {
              width: "122px",
              prop2: "firstRegisterConclusion",
              label: "首次注册结论",
              value: "",
              type: "select",
              isMust: false,
              isDisable: false,
            },
            {
              width: "122px",
              prop2: "regularRegisterConclusion",
              label: "定期注册结论",
              value: "",
              type: "input",
              isMust: false,
              isDisable: false,
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
          info: '教师资格证认定信息',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "122px",
              prop2: "certificateState",
              label: "证照状态",
              new:'top',
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              width: "122px",
              prop2: "releaseDate",
              label: "证书签发日期",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择证书签发日期', trigger: 'change' },
              ],
            },
            {
              width: "122px",
              prop2: "qualificationKind",
              label: "资格种类",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '', trigger: 'change' },
              ],
            },
            {
              width: "122px",
              prop2: "organizationName",
              label: "认证机构名称",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '', trigger: 'change' },
              ],
            },
            {
              width: "122px",
              prop2: "affirmBatch",
              label: "认定批次",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '', trigger: 'change' },
              ],
            },
            {
              width: "122px",
              prop2: "certificateId",
              label: "证书编号",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '', trigger: 'change' },
              ],
            },
            {
              width: "122px",
              prop2: "teacherCertificationId",
              label: "教师资格证编号",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '', trigger: 'change' },
              ],
            },
          ],
          tableContent: [
          ],
        },
        {
          info: '培训学时记录',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "110px",
              prop2: "trainStartTime",
              label: "培训开始时间",
              value: "",
              new:'top',
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
              width: "110px",
              prop2: "trainEndTime",
              label: "培训结束时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                {
                  required: true,
                  validator: endTime_1,
                  trigger: 'change'
                },
              ],
            },
            {
              width: "110px",
              prop2: "trainingHours",
              label: "教师培训学时",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入教师培训学时', trigger: 'change' },
              ],
            },
            {
              width: "110px",
              prop2: "trainOrganizationName",
              label: "组织培训单位",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入组织培训单位', trigger: 'change' },
              ],
            },
          ],
          tableContent: [
          ],
        },
        {
          info: '证书信息',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "96px",
              prop2: "certificateType",
              label: "证书类型",
              new:'top',
              value: "",
              isMust: true,
              type: "select",
              isDisable: false,
            },
            {
              width: "96px",
              prop2: "certificateId",
              label: "证书编号",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入证书编号', trigger: 'change' },
              ],
            },
            {
              width: "96px",
              prop2: "languageCertificateName",
              label: "语言证书名称",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              width: "96px",
              prop2: "certificateName",
              label: "证书名称",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入证书名称', trigger: 'change' },
              ],
            },
            {
              width: "96px",
              prop2: "getCertificateTime",
              label: "发证年月",
              value: "",
              type: "dateMonth",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择发证年月', trigger: 'change' },
              ],
            },
            {
              width: "96px",
              prop2: "getCertificateUnit",
              label: "发证单位",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入发证单位', trigger: 'change' },
              ],
            },
            {
              prop2: "attachment",
              label: "附件",
              width:'96px',
              value:"",
              type:"upload",
            },
          ],
          tableContent: [
          ],
        },
        {
          info: '社会体育指导员证书',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "81px",
              prop2: "certificateGrade",
              label: "证书等级",
              new:'top',
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              width: "81px",
              prop2: "getCertificateTime",
              label: "发证时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择发证时间', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "guidanceProject",
              label: "指导项目",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入指导项目', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "guidanceSite",
              label: "指导站点",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入指导站点', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "certificateId",
              label: "证书编号",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入证书编号', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "getCertificateUnit",
              label: "发证单位",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入发证单位', trigger: 'change' },
              ],
            },
          ],
          tableContent: [
          ],
        },
        {
          info: '社会体育指导员技术等级培训信息',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "81px",
              prop2: "issueUnit",
              label: "发证单位",
              new:'top',
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入发证单位', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "issueTime",
              label: "发证时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择发证时间', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "trainScore",
              label: "成绩",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入成绩', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "nation",
              label: "民族",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择民族', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "guidanceProject",
              label: "指导项目",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入指导项目', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "certificateId",
              label: "证书编号",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入证书编号', trigger: 'change' },
              ],
            },
            {
              width: "81px",
              prop2: "guidanceSite",
              label: "指导站点",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入指导站点', trigger: 'change' },
              ],
            },
          ],
          tableContent: [
          ],
        },
        {
          info: '等级裁判员信息',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "80px",
              prop2: "project",
              label: "项目",
              new:'top',
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入项目', trigger: 'change' },
              ],
            },
            {
              width: "80px",
              prop2: "judgeGrade",
              label: "裁判等级",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入裁判等级', trigger: 'change' },
              ],
            },
            {
              width: "80px",
              prop2: "ratifyTime",
              label: "批准日期",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                {
                  required: true,
                  validator: startTime_2,
                  message: '请选择批准日期',
                  trigger: 'change'
                },
              ],
            },
            {
              width: "80px",
              prop2: "relationPhone",
              label: "联系手机",
              value: "",
              type: "input",
              isMust: false,
              isDisable: false,
            },
            {
              width: "80px",
              prop2: "comment",
              label: "备注",
              value: "",
              type: "input",
              isMust: false,
              isDisable: false,
            },
            {
              width: "80px",
              prop2: "receptionTime",
              label: "接收时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                {
                  required: true,
                  validator: endTime_2,
                  message: '请选择接收时间',
                  trigger: 'change'
                },
              ],
            },
          ],
          tableContent: [
          ],
        },
        {
          info: '国家医药证书',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "170px",
              prop2: "nationMedicineCertificateName",
              label: "国家医药证书",
              value: "",
              type: "input",
              new:'top',
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入国家医药证书', trigger: 'change' },
              ],
            },
            {
              width: "170px",
              prop2: "certificateId",
              label: "证书(批件)号",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入证书(批件)号', trigger: 'change' },
              ],
            },
            {
              width: "170px",
              prop2: "selfRole",
              label: "本人角色",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              width: "170px",
              prop2: "ratifyTime",
              label: "颁布或批准时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择颁布或批准时间', trigger: 'change' },
              ],
            },
            {
              width: "170px",
              prop2: "inDateTime",
              label: "有效期",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择有效期', trigger: 'change' },
              ],
            },
            {
              width: "170px",
              prop2: "isRepresentativeAchievement",
              label: "是否是代表性成果和项目",
              value: "",
              type: "select",
              isMust: false,
              isDisable: false,
              opt:[{name:"是"},{name:'否'}]
            },
            {
              prop2: "attachment",
              label: "附件",
              width:'170px',
              value:"",
              type:"upload",
            },
          ],
          tableContent: [
          ],
        },
        {
          info: '国家标准或行业标准',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "170px",
              prop2: "standardId",
              label: "标准号",
              new:'top',
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入标准号', trigger: 'change' },
              ],
            },
            {
              width: "170px",
              prop2: "selfRole",
              label: "本人角色",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              width: "170px",
              prop2: "releaseTime",
              label: "发布日期",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请选择发布日期', trigger: 'change' },
              ],
            },
            {
              width: "170px",
              prop2: "releaseUnit",
              label: "发布单位",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入发布单位', trigger: 'change' },
              ],
            },
            {width: "170px",
              prop2: "isRepresentativeAchievement",
              label: "是否是代表性成果和项目",
              value: "",
              type: "select",
              isMust: false,
              isDisable: false,
              opt:[{name:"是"},{name:'否'}]
            },
            {
              prop2: "attachment",
              label: "附件",
              width:'170px',
              value:"",
              type:"upload",
            },
          ],
          tableContent: [
          ],
        },
        {
          info: '语言能力',
          isOperate: true,
          isBtn: true,
          isAnnex: true,
          allPage:0,
          tableHeader: [
            {
              width: "68px",
              prop2: "language",
              label: "语种",
              new:'top',
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              width: "68px",
              prop2: "masteryDegree",
              label: "掌握程度",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
          ],
          tableContent: [
          ],
        },
      ]
    },
)