export const positionRecruitmentTable = reactive([
    {
      title: '岗位聘任信息',
      children: [
        {
          info: '岗位聘任',
          isOperate: true,
          isBtn: true,
          isAnnex: true,
          tableHeader: [
            {
              prop2: "jobCategory",
              label: "岗位类别",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "jobGrade",
              label: "岗位等级",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "hireTime",
              label: "聘任开始日期",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "additionalJobCategory",
              label: "兼任岗位类别",
              value: "",
              type: "select",
              isMust: false,
              isDisable: false,
            },
            {
              prop2: "additionalJobGrade",
              label: "兼任岗位等级",
              value: "",
              type: "select",
              isMust: false,
              isDisable: false,
            },
            {
              prop2: "administrativeDuty",
              label: "行政职务",
              value: "",
              type: "select",
              isMust: false,
              isDisable: false,
            },
            {
              prop2: "administrativeRank",
              label: "行政职级",
              value: "",
              type: "select",
              isMust: false,
              isDisable: false,
            },
            {
              prop2: "affiliationDepartment",
              label: "所属部门(科室)",
              value: "",
              type: "select",
              isMust: false,
              isDisable: false,
            },
            {
              prop2: "officeStart",
              label: "任职开始年月",
              value: "",
              type: "dateMonth",
              isMust: false,
              isDisable: false,
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
          tableHeader: [
            {
              prop2: "engageJob",
              label: "聘任专业技术职务",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "engageStart",
              label: "聘任开始日期",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "engageEnd",
              label: "聘任结束日期",
              value: "",
              type: "date",
              isMust: false,
              isDisable: false,
            },
            {
              prop: "engageName",
              label: "聘任单位名称",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
            },
            {
              prop: "advantage",
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
          tableHeader: [
            {
              prop2: "activityName",
              label: "活动名称",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "cultivateTheme",
              label: "培训主题",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "cultivateRank",
              label: "培训级别",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "cultivateTime",
              label: "培训时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
            },
            {
              prop: "organization",
              label: "组织单位",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
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
          tableHeader: [
            {
              prop2: "activityName",
              label: "活动名称",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "activityLevel",
              label: "评审活动级别",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "reviewTime",
              label: "评审时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "organization",
              label: "组织单位",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
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
          tableHeader: [
            {
              prop2: "teacherWorkRoomName",
              label: "名师工作室名称",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "workRoomCount",
              label: "工作室人数",
              value: "",
              type: "input",
              isMust: false,
              isDisable: false,
            },
            {
              prop2: "startTime",
              label: "组建开始时间",
              value: "",
              type: "date",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "endTime",
              label: "结束时间",
              value: "",
              type: "date",
              isMust: false,
              isDisable: false,
            },
            {
              prop2: "workRoomRank",
              label: "工作室级别",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "achievement",
              label: "典型成果",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
            },
            // {
            //   prop: "annex",
            //   label: "附件",
            // },
          ],
          tableContent: [
            // {
            //   id: 0,
            //   studioName: "四川大学",
            //   studioNumber: '10',
            //   establishmentStartTime: "2012-08",
            //   establishmentEndTime: '无',
            //   studioLevel: "高级",
            //   typicalAchievements: "全国一等奖",
            //   // annex: "上传"
            // }
          ],
        },
        {
          info: '承担特色课程领衔教师',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          tableHeader: [
            {
              prop2: "courseName",
              label: "学校特色课程名称",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "actAsTime",
              label: "担任时间",
              value: "",
              type: "dateYear",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "isLeanTeacher",
              label: "是否领衔教师",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
            },
            {
              prop2: "hour",
              label: "课时",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
            },
          ],
          tableContent: [
            // {
            //   id: 0,
            //   featuredCourseName: "高数",
            //   workTime: '2021-06',
            //   isLeadership: "是",
            //   classHour: '20小时',
            // }
          ],
        },
      ]
    },
])