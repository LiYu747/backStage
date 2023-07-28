<template>
  <div>
    <div class="rosterBox flex">
      <!-- 左边内容 -->
      <div class="leftBox">
        <el-input
          class="ipt"
          v-model="input"
          placeholder="搜索节点"
          :prefix-icon="Search"
          clearable
        />
        <div class="m-t1">
          <el-tree
            :data="data"
            getCurrentKey
            highlight-current
            accordion
            @current-change="organization"
            :props="defaultProps"
            :height="208"
          />
        </div>
      </div>
      <!-- 右边内容 -->
      <div class="rightBox" :style="{ width: clientWidth + 'px' }">
        <div class="m-b1">{{ title }}</div>
        <div class="screenBox">
          <RosterLy ref="vail" isDisabled :formData="newSearchTil">
            <div class="m-l3">
              <el-button type="primary" @click="searchAll">搜索</el-button>
            </div>
          </RosterLy>
        </div>
        <div class="flex al-center :deep(.el-dropdown-menu__item){ }-t1">
          <span class="m-r2">筛选条件方案</span>
          <el-dropdown trigger="click">
            <div class="el-dropdown-link cur-p">
              <div class="value">{{ value_name }}</div>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <div
                  v-if="List.length"
                  style="min-width: 80px"
                  class="planItem"
                >
                  <el-dropdown-item
                    v-for="(item, index) in List"
                    :key="index"
                    @click="menuAdd(item)"
                  >
                    {{ item.name }}
                    <el-button
                      @click.stop="deleteItem(item, index)"
                      type="danger"
                      :icon="Delete"
                      circle
                      size="small"
                    />
                  </el-dropdown-item>
                  <el-dialog v-model="isDialog" title="提示" width="30%">
                    <span>确认是否删除当前方案</span>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click.stop="isDialog = false"
                          >取消</el-button
                        >
                        <el-button type="primary" @click="submit(dialogS)">
                          确认
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
                <el-dropdown-item v-else>
                  <p style="color: #3c3c3c3c; font-size: 14px">暂无方案数据</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="flex al-center">
            <div class="moreText cur-p" @click="moreAdd">
              <el-button type="primary" plain>更多筛选条件</el-button>
            </div>
            <el-button @click="open" type="primary">
              <span>保存当前筛选条件</span>
            </el-button>
          </div>
        </div>

        <ScreenForm
          ref="reference"
          @getList="getList"
          :arr="arr"
          :selectedData="selectedData"
        ></ScreenForm>
        <ListForm
          :currentPage4="currentPage4"
          @currentChange="currentChange"
          :listData="listData"
          :title="title"
          :rawData="rawData"
        ></ListForm>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { USERINFO } from "../../utils/filterData.js";
import { SELECTOPT } from "../../utils/select.js";
import { Search, ArrowDown } from "@element-plus/icons-vue";
import {
  findAllRoster,
  findRegion,
  organizationTree,
  rosterFindBy,
  queryPlanSave,
  findByTeacherId,
  deleteById,
} from "../../api/roster.js";
import { Delete } from "@element-plus/icons-vue";
import ScreenForm from "../roster/components/ScreenForm.vue";
import ListForm from "../roster/components/ListForm.vue";
import RosterLy from "./components/Roster-ly.vue";
import { findDictionaries } from "@/api/apply.js";
const isDialog = ref(false);
const input = ref("");
const isload = ref(false);
const defaultProps = ref({
  children: "children",
  label: "title",
});

const currentPage4 = ref(1);

const value_name = ref("");
const List = ref([]);
const selectedData = ref([]);
const rawData = ref({});

const menuAdd = (item) => {
  // console.log(item, "5555555555555555555555555555555555");
  value_name.value = item.name;
  List.value.forEach((v) => {
    if (item.name == v.name) {
      newSearchTil.value = v.content;
      newSearchTil.value.map(async (item2) => {
        if (item2.type == "select") {
          if (item2.name == "任教年级") {
            item2.opt = [
              { name: "小班" },
              { name: "中班" },
              { name: "大班" },
              { name: "一年级" },
              { name: "二年级" },
              { name: "三年级" },
              { name: "四年级" },
              { name: "五年级" },
              { name: "六年级" },
              { name: "七年级" },
              { name: "八年级" },
              { name: "九年级" },
              { name: "高一" },
              { name: "高二" },
              { name: "高三" },
            ];
          } else if (item2.name == "任教班级") {
            item2.opt = [
              { name: "01班" },
              { name: "02班" },
              { name: "03班" },
              { name: "04班" },
              { name: "05班" },
              { name: "06班" },
              { name: "07班" },
              { name: "08班" },
              { name: "09班" },
              { name: "10班" },
              { name: "11班" },
              { name: "12班" },
              { name: "13班" },
              { name: "14班" },
              { name: "15班" },
              { name: "16班" },
              { name: "17班" },
            ];
          } else {
            selectArr.map(async (item3) => {
              if (item3.name == item2.name) {
                console.log("item3.node_id", item3.node_id);
                const { result } = await findDictionaries({
                  parentId: item3.node_id,
                });
                item2.opt = result;
                console.log("---------result----------", result);
              }
            });
          }
        } else if (item2.type == "cascader") {
          if (item2.name == "出生地" || item2.name == "籍贯") {
            const { result } = await findRegion({
              token: localStorage.getItem("dslToken"),
            });
            result.province.map((item) => {
              item.children.map((item2) => {
                item2.children.map((item3) => {
                  item3.children = null;
                });
              });
            });
            item2.opttitle = "one";
            item2.opt = result.province;
          } else if (item2.name == "年级") {
          } else {
            const { result } = await organizationTree({
              idCard: "330602196710200015",
              token: localStorage.getItem("dslToken"),
              selectType: 1,
            });
            item2.opttitle = "two";
            item2.opt = result.list;
          }
        }
      });
      const selectedDataMap = {};
      v.content.forEach((v) => {
        selectedDataMap[v.name] = true;
      });
      arr.value.forEach((item2) => {
        item2.children.forEach((item3) => {
          if (item3.id) {
            item3.id = false;
          }
          if (selectedDataMap[item3.name]) {
            item3.id = true;
          }
        });
      });

      selectedData.value = arr.value;
    }
  });

  // console.log("🚀 ~ file: roster.vue:127 ~ newSearchTil===========:", newSearchTil.value);
};
//   })
// }
const flag = ref(false);
const selectArr = SELECTOPT;
const key = ref(null);
const listData = ref([]);
const organization = async (e, X) => {
  if (localStorage.getItem("mykey") != X.data.key) {
    currentPage4.value = 1;
  }
  localStorage.setItem("mykey", X.data.key);
  console.log("X: ", X);
  if (X.data.key === 3033765311453249) {
    key.value = X.data.key;
    let params = {
      page: currentPage4.value - 1,
      size: 10,
      staff: {},
      supplement: {},
    };
    rawData.value = params;
    let { code, result } = await getFindArr(params);
    console.log(result);
    if (code == 0 && result) {
      listData.value = result;
    } else {
      listData.value = [];
    }
    title.value = X.data.hierarchyTitle;
  } else {
    flag.value = false;
    // console.log("🚀 ~ file: roster.vue:87 ~ organization ~ e, X:", X);
    // console.log("X: ", X.data.key);
    key.value = X.data.key;
    let params = {
      supplement: {
        authorizedStrength: {
          organizationUnitKey: X.data.key,
        },
      },
      page: currentPage4.value - 1,
      size: 10,
    }
    rawData.value = params;
    let { result } = await rosterFindBy(params);
    listData.value = result;
    // console.log("🚀 ~ file: roster.8888888888:", result);

    title.value = X.data.hierarchyTitle;
    // console.log('title.value: ', title.value);
    dataArr.value = [];
  }
};
const currentChange = async (val) => {
  currentPage4.value = val;
  if (flag.value) {
    searchAll(--val);
  } else {
    let params = {};
    console.log(key.value);
    if (key.value === 3033765311453249) {
      params = {
        page: --val,
        size: 10,
        sort: "createdAt,desc",
        staff: {},
        supplement: {},
      };
    } else {
      params = {
        page: --val,
        size: 10,
        sort: "createdAt,desc",
        supplement: {
          authorizedStrength: {
            organizationUnitKey: key.value,
          },
        },
      };
    }
    rawData.value = params;
    let { result } = await rosterFindBy(params);
    listData.value = result;
  }
};

const timeVal = ref("");

const data = ref([]); //左侧组织架构数组
const title = ref(""); //左侧组织架构数组
const page = ref(0); //默认页数
const size = ref(10); //默认条数

//初始筛选条件
const theInitial_Arr = [
  { name: "姓名" },
  { name: "性别" },
  { name: "手机号" },
  { name: "证件号码" },
];

//获取花名册
const getFindArr = async (params) => {
  let { code, result } = await rosterFindBy(params);
  console.log(result);
  return { code, result };
};

const newSearchTil = ref([]);
const dataArr = ref([]);
const arr = ref(USERINFO);
//获取条件渲染
const getList = (val) => {
  newSearchTil.value = [];
  isload.value = true;
  val.map(async (item) => {
    item.children.map(async (item2) => {
      if (!item2.hasOwnProperty("value")) {
        item2.value = "";
      }
      if (item2.type == "select") {
        selectArr.map(async (item3) => {
          if (item2.name == "任教年级") {
            item2.opt = [
              { name: "小班" },
              { name: "中班" },
              { name: "大班" },
              { name: "一年级" },
              { name: "二年级" },
              { name: "三年级" },
              { name: "四年级" },
              { name: "五年级" },
              { name: "六年级" },
              { name: "七年级" },
              { name: "八年级" },
              { name: "九年级" },
              { name: "高一" },
              { name: "高二" },
              { name: "高三" },
            ];
          }
          if (item2.name == "任教班级") {
            item2.opt = [
              { name: "01班" },
              { name: "02班" },
              { name: "03班" },
              { name: "04班" },
              { name: "05班" },
              { name: "06班" },
              { name: "07班" },
              { name: "08班" },
              { name: "09班" },
              { name: "10班" },
              { name: "11班" },
              { name: "12班" },
              { name: "13班" },
              { name: "14班" },
              { name: "15班" },
              { name: "16班" },
              { name: "17班" },
              { name: "18班" },
              { name: "19班" },
              { name: "20班" },
            ];
          }
          if (item3.name == item2.name) {
            console.log("item3.node_id", item3.node_id);
            const { result } = await findDictionaries({
              parentId: item3.node_id,
            });
            result = result.filter((item) => item.name != "未知");
            console.log("---------result--------00--", result);
            item2.opt = result;
          }
        });
      } else if (item2.type == "cascader") {
        if (item2.name == "出生地" || item2.name == "籍贯") {
          const { result } = await findRegion({
            token: localStorage.getItem("dslToken"),
          });
          result.province.map((item) => {
            item.children.map((item2) => {
              item2.children.map((item3) => {
                item3.children = null;
              });
            });
          });
          item2.opttitle = "one";
          item2.opt = result.province;
        } else {
          const { result } = await organizationTree({
            idCard: "330602196710200015",
            token: localStorage.getItem("dslToken"),
            selectType: 1,
          });
          item2.opttitle = "two";
          item2.opt = result.list[0].children;
        }
      }
    });
  });
  // console.log("🚀 ~ file: roster.vue:135 ~ getList ~ val:", val);

  val.map((item) => {
    item.children = item.children.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    item.children.map((opt) => {
      newSearchTil.value.push(opt);
    });
  });
  dataArr.value = val;
  console.log("val: ", dataArr.value);
  console.log("newSearchTil: ", newSearchTil.value);
};

// 获取选择数据

//获取左侧组织机构
const getOrganizationTree = async () => {
  let { result } = await organizationTree({
    idCard: "330602196710200015",
    token: localStorage.getItem("dslToken"),
    selectType: 1,
  });

  data.value = addHierarchyTitle(result.list);
  let X = {
    data: {
      key: result?.list[0].key,
      hierarchyTitle: result?.list[0].hierarchyTitle,
    },
  };
  organization("", X);
};

function addHierarchyTitle(data, parentTitle = "") {
  data.forEach((item) => {
    const { title, children, ...rest } = item;
    const modifiedTitle = parentTitle ? `${parentTitle} / ${title}` : title;
    if (children && children.length > 0) {
      rest.children = addHierarchyTitle(children, modifiedTitle);
    }
    rest.hierarchyTitle = modifiedTitle;
    Object.assign(item, rest);
  });
  return data;
}
//中国标准时间转时间戳
const transitionJab = (val) => {
  const date = new Date(val) * 1;
  return date;
};
const vail = ref(null);

//搜索按钮
const searchAll = async (val) => {
  flag.value = true;
  if (!isNaN(val)) {
    page.value = val;
  }

  let params = {
    staff: {},
    supplement: {},
  };
  console.log("371----dataArr.value", dataArr.value);
  console.log("372----newSearchTil", newSearchTil.value);
  if (!dataArr.value.length) {
    newSearchTil.value.map((item) => {
      if (item.type == "date-picker") {
        if (item.value) {
          item.value = transitionJab(item.value);
        } else {
          item.value = "";
        }
      } else if (item.opttitle == "two") {
        if (Array.isArray(item.value)) {
          item.value = item.value[item.value.length - 1];
        }
      }
    });
    let obj = {};
    arr.value.map((item) => {
      item.children.map((item2) => {
        newSearchTil.value.map((item3) => {
          if (item3.name == item2.name) {
            if (item.title == "staff") {
              params.staff[item2.title] = item3.value;
            } else {
              if (item3.name == "任教年级") {
                obj["educationTeaching.schoolClass.schoolGrade"] = {
                  [item3.title]: item3.value,
                };
                params.supplement = obj;
              } else if (item3.name == "任教班级") {
                obj["educationTeaching.schoolClass"] = {
                  [item3.title]: item3.value,
                };
                params.supplement = obj;
              } else {
                obj[item2.title] = item3.value;
                params.supplement[item.title] = obj;
              }
            }
          }
        });
      });
    });
  } else {
    dataArr.value.map((item) => {
      if (item.title == "staff") {
        item.children.map((item2) => {
          if (item2.type == "date-picker") {
            if (item2.value) {
              item2.value = transitionJab(item2.value);
            } else {
              item2.value = "";
            }
          } else if (item2.opttitle == "two") {
            if (Array.isArray(item2.value)) {
              item.value = item.value[item.value.length - 1];
            }
          }
          params.staff[item2.title] = item2.value;
        });
      } else {
        let obj = {};
        item.children.map((item2) => {
          if (item2.type === "date-picker") {
            if (item2.value) {
              item2.value = transitionJab(item2.value);
            } else {
              item2.value = "";
            }
            obj[item2.title] = item2.value;
            params.supplement[item.title] = obj;
          } else if (item2.opttitle == "two") {
            if (Array.isArray(item2.value)) {
              item2.value = item2.value[item2.value.length - 1];
            }
            obj[item2.title] = item2.value;
            params.supplement[item.title] = obj;
          } else if (item2.name == "任教年级") {
            obj["educationTeaching.schoolClass.schoolGrade"] = {
              [item2.title]: item2.value,
            };
            params.supplement = obj;
          } else if (item2.name == "任教班级") {
            obj["educationTeaching.schoolClass"] = {
              [item2.title]: item2.value,
            };
            params.supplement = obj;
          } else {
            obj[item2.title] = item2.value;
            params.supplement[item.title] = obj;
          }
        });
      }
    });
  }

  console.log("表单的值 ", dataArr.value);
  // console.log("🚀 ~ file: roster.vue:251 ~ searchAll ~ params:", params);

  params.page = page.value;
  params.size = size.value;
  if (key.value) {
    // params.supplement = {};
    params.supplement.authorizedStrength = { organizationUnitKey: key.value };
  }
  removeEmptyStrings(params);
  rawData.value = params;
  let { code, result } = await getFindArr(params);
  console.log(result);
  if (code == 0 && result) {
    listData.value = result;
  } else {
    listData.value = [];
  }
};

function removeEmptyStrings(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      } else {
        removeEmptyStrings(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    } else if (obj[key] === "") {
      delete obj[key];
    }
  }
}

//获取筛选条件方案
const saveCondition = async () => {
  let { result } = await findByTeacherId({
    teacherId: JSON.parse(localStorage.getItem("userInfo")).id,
  });
  // console.log("🚀 ~ file: roster.vue:397 ~ saveCondition ~ result:", result);
  List.value = result.map((item) => {
    return {
      name: item.name,
      id: item.id,
      content: JSON.parse(item.content),
    };
  });
  // console.log(
  //   "🚀 ~ file: roster.vue:312 ~ List.value=result.map ~ List.value:",
  //   List.value
  // );
};
const deleteScheme = ref({});
// 删除选项的方法
const deleteItem = (item, index) => {
  isDialog.value = true;
  deleteScheme.value.item = item;
  deleteScheme.value.index = index;
};

//防抖变量
let timer = null;
//防抖
const submit = (item) => {
  let firstClick = !timer;
  if (firstClick) item();
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
  }, 1500);
};

const dialogS = async () => {
  console.log("==============", value_name.value, deleteScheme.value.item.name);
  // return
  let { code } = await deleteById({
    id: deleteScheme.value.item.id,
  });
  if (code === 0) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    List.value.splice(deleteScheme.value.index, 1);
    isDialog.value = false;

    if (value_name.value === deleteScheme.value.item.name) {
      value_name.value = "";
      newSearchTil.value = [];
      arr.value.forEach((item) => {
        item.children.forEach((s) => {
          s.id = false;
          theInitial_Arr.forEach((chil) => {
            if (chil.name == s.name) {
              s.id = true;
              s.value = "";
              newSearchTil.value.push(s);
            }
          });
        });
      });
    }
    if (!List.value.length) {
      value_name.value = "";
    }
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
    isDialog.value = false;
  }
  List.value = List.value;
};

//保存筛选条件
const open = () => {
  console.log(newSearchTil.value, "newSearchTil.value");
  ElMessageBox.prompt("请输入方案名称", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
    inputErrorMessage: "请输入正确的名称",
  })
    .then(async ({ value }) => {
      let params = {
        content: "",
        name: value,
      };
      if (value.length >= 10) {
        ElMessage({
          type: "info",
          message: "超出限制字数10",
        });
      } else {
        if (newSearchTil.value == "") {
          ElMessage({
            type: "warning",
            message: `至少选中一项筛选条件`,
          });
          return;
        } else {
          for (let index = 0; index < newSearchTil.value.length; index++) {
            delete newSearchTil.value[index].opt;
          }
          console.log(newSearchTil.value);
          // return
          params.content = JSON.stringify(newSearchTil.value);
          //   console.log("🚀 ~ file: roster.vue:321 ~ .then ~ params:", params)
          let { code, msg, result } = await queryPlanSave(params);
          console.log("🚀 ~ file: roster.vue:330 ~ .then ~ res:", result);
          if (code == 0) {
            ElMessage({
              type: "success",
              message: `保存成功`,
            });
            value_name.value = value;
            saveCondition();
          } else {
            ElMessage({
              type: "error",
              message: `保存失败,${msg}`,
            });
          }
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消输入",
      });
    });
};

const reference = ref(null);
const moreAdd = () => {
  console.log(newSearchTil.value);
  newSearchTil.value.map((item) => {
    arr.value.map((item2) => {
      item2.children.map((item3) => {
        console.log();
        if (item3.name == item.name) {
          item2 = item;
        }
      });
    });
  });
  reference.value?.add();
  console.log(arr.value);
};

const clientWidth = ref(0);
onMounted(() => {
  saveCondition();
  getOrganizationTree();
  // console.log(title.value, "5555555555555555555555555555555");
  // const beginArr = ref([]);
  arr.value.map((item) => {
    item.children.map((item2) => {
      if (item2.id == true) {
        item2.value = "";
        newSearchTil.value.push(item2);
      }
    });
  });
  newSearchTil.value.map(async (item2) => {
    if (item2.type == "select") {
      if (item2.name == "任教年级") {
        item2.opt = [
          { name: "小班" },
          { name: "中班" },
          { name: "大班" },
          { name: "一年级" },
          { name: "二年级" },
          { name: "三年级" },
          { name: "四年级" },
          { name: "五年级" },
          { name: "六年级" },
          { name: "七年级" },
          { name: "八年级" },
          { name: "九年级" },
          { name: "高一" },
          { name: "高二" },
          { name: "高三" },
        ];
      } else if (item2.name == "任教班级") {
        item2.opt = [
          { name: "01班" },
          { name: "02班" },
          { name: "03班" },
          { name: "04班" },
          { name: "05班" },
          { name: "06班" },
          { name: "07班" },
          { name: "08班" },
          { name: "09班" },
          { name: "10班" },
          { name: "11班" },
          { name: "12班" },
          { name: "13班" },
          { name: "14班" },
          { name: "15班" },
          { name: "16班" },
          { name: "17班" },
        ];
      } else {
        selectArr.map(async (item3) => {
          if (item3.name == item2.name) {
            console.log("item3.node_id", item3.node_id);
            const { result } = await findDictionaries({
              parentId: item3.node_id,
            });

            let newarr = result.filter((item) => item.name != "未知");
            console.log("---------result------00----", newarr);
            item2.opt = newarr;
          }
        });
      }
    } else if (item2.type == "cascader") {
      if (item2.name == "出生地" || item2.name == "籍贯") {
        const { result } = await findRegion({
          token: localStorage.getItem("dslToken"),
        });
        result.province.map((item) => {
          item.children.map((item2) => {
            item2.children.map((item3) => {
              item3.children = null;
            });
          });
        });
        item2.opttitle = "one";
        item2.opt = result.province;
      } else if (item2.name == "年级") {
      } else {
        const { result } = await organizationTree({
          idCard: "330602196710200015",
          token: localStorage.getItem("dslToken"),
          selectType: 1,
        });
        item2.opttitle = "two";
        item2.opt = result.list[0].children;
      }
    }
  });
  console.log(newSearchTil.value);

  clientWidth.value = document.body.clientWidth - 600;
  window.onresize = () => {
    return (() => {
      //窗口缩放自动获取页面宽高
      window.fullWidth = document.documentElement.clientWidth;
      clientWidth.value = window.fullWidth - 600; //宽
    })();
  };
});
</script>

<style lang="less" scoped>
:deep(.el-overlay) {
  background-color: rgba(0, 0, 0, 0.2);
}

.planItem {
  :deep(.el-icon) {
    padding: 0;
    margin: 0;
  }

  :deep(.el-dropdown-menu__item) {
    justify-content: space-between;
    align-items: center;
  }

  :deep(.el-button--small.is-circle) {
    margin-left: 20px;
  }
}

.rosterBox {
  width: 100%;
  height: 100%;
}

.leftBox {
  width: 260px;
  padding: 0 10px;
  height: calc(100vh - 110px);
  overflow: auto;
  border-right: 1px solid #dcdfe6;

  .ipt {
    margin-top: 10px;
  }
}

:deep(.el-dropdown-menu__item) {
  justify-content: center;
}

.rightBox {
  padding: 20px;
  height: calc(100vh - 150px);
  overflow: auto;
  width: 100%;

  .screenBox {
    width: 100%;
    max-height: 140px;
    overflow: auto;
  }

  .screenIpt {
    width: 140px;
  }

  .link {
    width: 140px;
    height: 30px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
  }

  :deep(.el-date-editor) {
    width: 140px;
  }

  .linkVal {
    width: 110px;
  }

  .moreText {
    margin: 0 30px;
    color: #75b9ff;
  }

  .el-dropdown-link {
    padding: 6px 10px;
    border: 1px solid #666;
    border-radius: 20px;
    display: flex;
  }

  .value {
    min-width: 60px;
    height: 100%;
  }
}
</style>