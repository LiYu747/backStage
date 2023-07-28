export const teacherMeritAssessTable = reactive([
    {
        title: '师德信息',
        children: [
          {
            info: '师德考核',
            isOperate: true,
            isBtn: true,
            isAnnex: true,
            tableHeader: [
              {
                prop2: "teacherMeritAssessTime",
                label: "师德考核时间",
                value: "",
                type: "dateYear",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "teacherMeritAssessResult",
                label: "师德考核结论",
                value: "",
                type: "select",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "teacherMeritAssessUnitName",
                label: "师德考核单位名称",
                value: "",
                type: "input",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "recordHonorDescription",
                label: "荣誉记录描述",
                value: "",
                type: "input",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "honorHappenTime",
                label: "荣誉发生日期",
                value: "",
                type: "date",
                isMust: false,
                isDisable: false,
              },
              {
                prop2: "honorRank",
                label: "荣誉级别",
                value: "",
                type: "select",
                isMust: false,
                isDisable: false,
              },
              {
                prop2: "conferUnitName",
                label: "荣誉授予单位名称",
                value: "",
                type: "input",
                isMust: false,
                isDisable: false,
              },
              {
                prop2: "honoraryTitle",
                label: "获得荣誉称号",
                value: "",
                type: "input",
                isMust: false,
                isDisable: false,
              },
            ],
            tableContent: [
            //   {
            //     id: 1,
            //     teacherVirtueTime: "师德考核时间",
            //     teacherVirtueConclusion: "师德考核结论",
            //     teacherVirtueName: '师德考核单位名称',
            //     HonorRecordDescription: '荣誉记录描述',
            //     HonorOccurrenceDate: '荣誉发生日期',
            //     HonorLevel: '荣誉级别',
            //     HonorAwardingUnit: '荣誉授予单位名称',
            //     getHonor: '获得荣誉称号',
            //   }
            ],
          },
          {
            info: '处分信息',
            isOperate: true,
            isAnnex: true,
            isBtn: true,
            tableHeader: [
              {
                prop2: "disciplinaryInformationType",
                label: "处分类型",
                value: "",
                type: "select",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "deregulationContent",
                label: "违规内容",
                value: "",
                type: "input",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "notificationTime",
                label: "通报时间",
                value: "",
                type: "date",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "reportingUnit",
                label: "通报单位",
                value: "",
                type: "input",
                isMust: true,
                isDisable: false,
              },
  
            ],
            tableContent: [
            //   {
            //     id: 1,
            //     PunishmentType: '处分类型',
            //     ViolationContent: "违规内容",
            //     NotificationTime: '通报时间',
            //     NotificationUnit: '通报单位',
            //   }
            ],
          },
        ]
      },
])