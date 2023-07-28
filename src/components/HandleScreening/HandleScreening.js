
//根据字段查找对应文本
const judgeProcess = (val, id) => {
  let str = "";
  val.map((item) => {
    if (item.value == id) {
      str = item.label;
    }
  });
  return str;
};

// 环节判断
const judgeTache = (val) => {
  switch (val) {
    case "WAIT_AUDIT":
      return "校端待审核";
    case "SCHOOL_PASS_AUDIT":
      return "局端待审核";
    case "SCHOOL_FAIL_AUDIT":
      return "校端审核不通过";
    case "BUREAU_PASS_AUDIT":
      return "局端审核通过";
    case "BUREAU_FAIL_AUDIT":
      return "局端审核不通过";
  }
};

//判断是否已经操作过
const judgeOperation = (val) => {
 let result = ["WAIT_AUDIT","SCHOOL_PASS_AUDIT","SCHOOL_FAIL_AUDIT","BUREAU_PASS_AUDIT","BUREAU_FAIL_AUDIT"]
}
export {  judgeProcess ,judgeTache };
