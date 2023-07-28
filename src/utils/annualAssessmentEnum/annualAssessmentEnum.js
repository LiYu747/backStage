export const annualAssessmentTable= reactive([
    {
        title: '考核信息',
        children: [
          {
            info: '年度考核结果',
            isOperate: true,
            isAnnex: true,
            isBtn: true,
            tableHeader: [
              {
                prop: "assessmentTime",
                label: "考核年度",
                value: "",
                type: "dateYear",
                isMust: true,
                isDisable: false,
              },
              {
                prop: "assessmentName",
                label: "考核单位名称",
                value: "",
                type: "input",
                isMust: true,
                isDisable: false,
              },
              {
                prop: "assessmentResult",
                label: "考核结果",
                value: "",
                type: "select",
                isMust: true,
                isDisable: false,
              },
              {
                prop: "confirmationDate",
                label: "考核确认日期",
                value: "",
                type: "date",
                isMust: false,
                isDisable: false,
              },
              // {
              //   prop: "annex",
              //   label: "附件",
              // },
            ],
            tableContent: [
            //   {
            //     id: 0,
            //     assessmentYear: "2023年",
            //     assessmentName: '四川大学',
            //     assessmentResult: '通过',
            //     assessmentConfirmTime: "2023-06-31",
            //     // annex: "附件",
            //   }
            ],
          },
        ]
      },  
])