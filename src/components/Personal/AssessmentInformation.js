//标准时间转时间戳
const transitionJab = (val) => {
  const date = new Date(val) * 1
  return date
}
const theAnnual_2 = (rule, value, callback) => {
  let year = educationAndTraining.value.children[0].tableHeader[0].value
  console.log('year: ', year, new Date());
  if (value === '' || value === null) {
    callback(new Error('请选择考核年度'))
  } else {
    if (transitionJab(year) > transitionJab(new Date())) {
      callback('考核年度不能大于当前年份')
      educationAndTraining.value.children[0].tableHeader[0].value = 'blank'
    } else {
      callback()
    }
  }
}
export const educationAndTraining = ref(
    {
      title: '考核信息',
      children: [
        {
          info: '年度考核结果',
          isOperate: true,
          isAnnex: true,
          isBtn: true,
          allPage:0,
          tableHeader: [
            {
              width: "107px",
              prop2: "assessmentTime",
              label: "考核年度",
               new:'top',
              value: "",
              type: "dateYear",
              isMust: true,
              isDisable: false,
              rules: [
                {
                  required: true,
                  validator: theAnnual_2,
                  trigger: 'change'
                },
              ],
            },
            {
              width: "107px",
              prop2: "assessmentUnitName",
              label: "考核单位名称",
              value: "",
              type: "input",
              isMust: true,
              isDisable: false,
              rules: [
                { required: true, message: '请输入考核单位名称', trigger: 'change' },
              ],
            },
            {
              width: "107px",
              prop2: "assessmentResult",
              label: "考核结果",
              value: "",
              type: "select",
              isMust: true,
              isDisable: false,
              // rules: [
              //   { required: true, message: '请选择考核结果', trigger: 'change' },
              // ],
              opt:[]
            },
            {
              width: "107px",
              prop2: "confirmationDate",
              label: "考核确认日期",
              value: "",
              type: "date",
              isMust: false,
              isDisable: false,
            },
            {
              prop2: "attachment",
              label: "附件",
              width:'107px',
              value:"",
              type:"upload",
            },
          ],
          tableContent: [
          ],
        },
      ]
    }
)