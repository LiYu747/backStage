export const familyTiesTable = reactive([
    {
        title: '家庭信息',
        children: [
          {
            info: '家庭成员及重要社会关系',
            isOperate: true,
            isAnnex: true,
            isBtn: true,
            tableHeader: [
              {
                prop2: "appellation",
                label: "称谓",
                value: "",
                type: "select",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "name",
                label: "姓名",
                value: "",
                type: "input",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "age",
                label: "年龄",
                value: "",
                type: "input",
                isMust: false,
                isDisable: false,
              },
              {
                prop2: "politicsStatus",
                label: "政治面貌",
                value: "",
                type: "select",
                isMust: false,
                isDisable: false,
              },
              {
                prop2: "organizationWork",
                label: "工作单位及职务",
                value: "",
                type: "input",
                isMust: true,
                isDisable: false,
              },
              {
                prop2: "isZJTeacher",
                label: "是否诸暨市教师",
                value: "",
                type: "select",
                isMust: false,
                isDisable: false,
              },
              {
                prop2: "isInVillage",
                label: "是否在农村学校任教",
                value: "",
                type: "select",
                isMust: false,
                isDisable: false,
              },
              {
                prop2: "teachAge",
                label: "教龄",
                value: "",
                type: "input",
                isMust: false,
                isDisable: false,
              },
            ],
            tableContent: [
            //   {
            //     id: 1,
            //     title: '称谓',
            //     name: "姓名",
            //     age: '年龄',
            //     PoliticalOutlook: '政治面貌',
            //     WorkUnit: '工作单位及职务',
            //     isZjTeacher: '是否诸暨市教师',
            //     isVillageTeacher: '是否在农村学校任教',
            //     teacherAge: '教龄',
            //   }
            ],
          },
        ]
      },
])