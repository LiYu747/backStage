<template>
  <div>
    <div class="titleBox flex">
      <div class="title" v-for="(item, index) in data.titleList" :key="index">
        <el-button type="primary" @click="upAdd(index)">{{ item }}</el-button>
      </div>
    </div>
    <div class="m-t1">
      <el-table
        ref="multipleTableRef"
        :data="listData.content"
        border
        empty-text="暂无数据"
        style="width: 100%"
        :scrollbar-always-on="true"
      >
        <el-table-column property="teacherJobId" label="教职工号" width="90">
          <template #default="scope">{{ scope.row.teacherJobId }}</template>
        </el-table-column>
        <el-table-column label="姓名" width="80">
          <template #default="scope"
            ><span class="cur-p" @click="gotoInfo(scope.row)">{{
              scope.row.name
            }}</span></template
          >
        </el-table-column>
        <el-table-column
          property="sex"
          label="性别"
          width="80"
          show-overflow-tooltip
        />
        <el-table-column
          property="workName"
          label="工作单位"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column
          property="job"
          label="岗位"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          property="affiliationWork"
          label="隶属集团"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column
          property="organizationUnit"
          label="编制单位"
          width="160"
          show-overflow-tooltip
        />
        <el-table-column
          property="authorizedStrengthType"
          label="编制类型"
          sortable
          width="160"
          show-overflow-tooltip
        />
        <el-table-column
          property="authorizedStrengthState"
          label="编制状态"
          width="90"
          show-overflow-tooltip
        />
        <el-table-column
          property="age"
          label="年龄"
          width="60"
          show-overflow-tooltip
        />
        <el-table-column
          property="phone"
          label="联系电话"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          property="idNumber"
          label="证件号码"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          label="操作"
          show-overflow-tooltip
        >
          <template #default="scope">
            <el-button type="primary" size="small" @click="gotoInfo(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flex m-t2 ju-center">
      <el-pagination
        v-model:current-page="props.currentPage4"
        v-model:page-size="pageSize4"
        :small="small"
        :background="background"
        layout="total,  prev, pager, next, jumper"
        :total="listData.totalElements"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <InfoUpload ref="reference" @upBack="upBack"></InfoUpload>
  </div>
</template>
<script setup>
import * as XLSX from "xlsx";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { findAllBy } from "@/api/roster";
const props = defineProps({
  listData: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  currentPage4: {
    type: Number,
    required: true,
  },
  rawData: {
    type: Object,
    required: true,
  },
});
const listData = ref([]);
watch(
  () => props.listData,
  () => {
    listData.value = props.listData;
  },
  {}
);
watch(
  () => props.title,
  () => {
    console.log("🚀 ~ file: 面包屑", props.title);
  },
  {}
);
const router = useRouter();
//默认第几页
// const currentPage4 = ref(1)
// 分页器配置
// 每页显示条目个数
const pageSize4 = ref(10);
//第几页
const page = ref(1);
const small = ref(false);
const background = ref(true);
//点击第几页
const emit = defineEmits(["currentChange"]);
const handleCurrentChange = (val) => {
  emit("currentChange", val);
};
//上传返回的数据
const upBack = (val) => {
  console.log(val);
};
//去个人详情页面
const gotoInfo = (v) => {
  console.log("🚀 ~ file: ListForm.vue:86 ~ gotoInfo ~ v:", v);
  router.push({
    path: "/personal",
    query: { userId: v.teacherId, title: props.title },
  });
};
//选中的数据
const selectionData = ref([]);

//导入数据
const reference = ref(null);
const upAdd = async (idx) => {
  if (idx == 0) {
    reference.value?.add();
  } else {
    // 导出数据
    delete props.rawData.page;
    delete props.rawData.size;
    let params = props.rawData;
    if (Object.keys(params).length === 0) {
      params = {
        staff: {},
        supplement: {},
      };
    }
    let { code, result } = await findAllBy(params);
    console.log(code, result);
    // if (code == 0 && result) {
    //   ElMessage({
    //     message: "请先选择导出的数据",
    //     type: "warning",
    //   });
    //   return;
    // }
    let selected = JSON.parse(JSON.stringify(result));
    selected.map((item) => {
      delete item.edit;
      delete item.createdAt;
      delete item.updatedAt;
      delete item.teacherJobId;
      delete item.teacherId;
    });
    // 创建一个新的工作簿
    const workbook = XLSX.utils.book_new();
    // 创建一个新的工作表
    const worksheet = XLSX.utils.json_to_sheet(selected);
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "教职工号",
          "姓名",
          "性别",
          "工作单位",
          "岗位",
          "隶属集团",
          "编制单位",
          "编制类型",
          "编制状态",
          "年龄",
          "联系电话",
          "证件号码",
        ],
      ],
      {
        origin: "A1",
      }
    );
    // 将工作表附加到工作簿，并将工作表命名为students
    XLSX.utils.book_append_sheet(workbook, worksheet, "students");
    // 导出工作簿，并命名导出文件名为Presidents.xlsx
    XLSX.writeFile(workbook, "教职工花名册.xlsx");
  }
};
const data = reactive({
  titleList: ["信息导入", "导出数据"],
});
onMounted(() => {
  // tableData.value = props.listData
  // console.log(props.listData,'listData');
});
</script>


<style lang="less" scoped>
.titleBox {
  margin-top: 20px;

  .title {
    margin-right: 16px;
  }
}
</style>