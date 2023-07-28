export const educationAndTraining = ref({
  title: '家庭信息',
  children: [
    {
      info: '家庭成员及重要社会关系',
      isOperate: true,
      isAnnex: true,
      isBtn: true,
      allPage: 0,
      tableHeader: [
        {
          width: "138px",
          prop2: "appellation",
          label: "称谓",
          new:'top',
          value: "",
          type: "select",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择称谓', trigger: 'change' },
          ],
          opt: [],
        },
        {
          width: "138px",
          prop2: "name",
          label: "姓名",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请输入姓名', trigger: 'change' },
          ],
        },
        {
          width: "138px",
          prop2: "age",
          label: "年龄",
          value: "",
          type: "input",
          isMust: false,
          isDisable: false,
        },
        {
          width: "138px",
          prop2: "politicsStatus",
          label: "政治面貌",
          value: "",
          type: "select",
          isMust: false,
          isDisable: false,
        },
        {
          width: "138px",
          prop2: "organizationWork",
          label: "工作单位及职务",
          value: "",
          type: "input",
          isMust: true,
          isDisable: false,
          rules: [
            { required: true, message: '请选择工作单位及职务', trigger: 'change' },
          ],
          opt: [],
        },
        {
          width: "138px",
          prop2: "isZJTeacher",
          label: "是否诸暨市教师",
          value: "",
          type: "select",
          isMust: false,
          isDisable: false,
          opt:[{name:"是"},{name:'否'}]
        },
        {
          width: "138px",
          prop2: "isInVillage",
          label: "是否在农村学校任教",
          value: "",
          type: "select",
          isMust: false,
          isDisable: false,
          opt:[{name:"是"},{name:'否'}]
        },
        {
          width: "138px",
          prop2: "teachAge",
          label: "教龄",
          value: "",
          type: "input",
          isMust: false,
          isDisable: false,
        },
      ],
      tableContent: [
      ],
    },
  ]
})