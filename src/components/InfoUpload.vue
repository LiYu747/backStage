<template>
  <div>
    <el-dialog v-model="Visible" align-center :title="title" width="50%" center>
      <div class="">上传文件</div>
      <el-upload
        class="upload-demo"
        ref="upload"
        :on-remove="handleRemove"
        :auto-upload="false"
        @change="uploadChange"
        :before-upload="() => {}"
        drag
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :limit="1"
        v-model:file-list="fileList"
        :show-file-list="false"
        :on-exceed="handleExceed"
      >
        <div v-if="!fileList.length" class="el-upload__text">
          点击上传或拖动至此处
        </div>
        <template v-else>
          <div class="custom-preview">
            <!-- 自定义文件预览区域 -->
            <div v-for="file in fileList" :key="file.uid" class="preview-item">
              <!-- 显示文件名 -->
              <div>{{ file.name }}</div>
              <!-- 显示文件大小 -->
              <div>{{ getFileSize(file.size) }}</div>
              <!-- 显示文件类型 -->
              <div>{{ file.type }}</div>
            </div>
          </div>
        </template>
        <template #tip>
          <div class="el-upload__tip">
            <el-button
              link
              type="primary"
              v-show="isUpload"
              class="el-upload__lift"
              @click="checkButton"
              >校验</el-button
            >
            <el-button
              link
              type="primary"
              class="el-upload__reigth"
              @click="uploadPSD"
              >下载模板文件</el-button
            >
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="Visible = false">取消</el-button>
          <el-button @click="submit" type="primary"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="checking"
      align-center
      title="数据校验"
      width="70%"
      center
    >
      <el-table
        :data="checkData"
        height="600"
        v-loading="isLoading"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(122, 122, 122, 0.8)"
      >
        <el-table-column
          v-for="(row, index) in headerData"
          :fixed="index === 0 ? 'left' : false"
          :key="index"
          :width="
            row?.key == 'name'
              ? '80'
              : row?.key == 'sex'
              ? '80'
              : row?.key == 'idType'
              ? '150'
              : row?.key == 'idNumber'
              ? '200'
              : row?.key == 'birthplaceProvince'
              ? '100'
              : row?.key == 'birthplaceCity'
              ? '100'
              : row?.key == 'birthplaceDistrict'
              ? '100'
              : row?.key == 'address'
              ? '200'
              : row?.key == 'marriage'
              ? '100'
              : row?.key == 'phone'
              ? '150'
              : row?.key == 'nation'
              ? '100'
              : row?.key == 'area'
              ? '100'
              : row?.key == 'politicsStatus'
              ? '150'
              : row?.key == 'staffJoinTime'
              ? '150'
              : row?.key == 'birthTime'
              ? '150'
              : row?.key == 'email'
              ? '200'
              : row?.key == 'teachTime'
              ? '150'
              : row?.key == 'authorizedStrengthState'
              ? '100'
              : row?.key == 'authorizedStrengthJoinTime'
              ? '150'
              : row?.key == 'authorizedStrengthType'
              ? '100'
              : row?.key == 'workName'
              ? '200'
              : row?.key == 'organizationUnit'
              ? '300'
              : '300'
          "
          :label="
            row?.key == 'name'
              ? '姓名'
              : row?.key == 'sex'
              ? '性别'
              : row?.key == 'idType'
              ? '证件类型'
              : row?.key == 'idNumber'
              ? '证件号码'
              : row?.key == 'birthplaceProvince'
              ? '出生地省'
              : row?.key == 'birthplaceCity'
              ? '出生地市'
              : row?.key == 'birthplaceDistrict'
              ? '出生地区'
              : row?.key == 'address'
              ? '详细地址'
              : row?.key == 'marriage'
              ? '婚姻状况'
              : row?.key == 'phone'
              ? '手机号'
              : row?.key == 'nation'
              ? '民族'
              : row?.key == 'area'
              ? '国家和地区'
              : row?.key == 'politicsStatus'
              ? '政治面貌'
              : row?.key == 'staffJoinTime'
              ? '入党时间'
              : row?.key == 'birthTime'
              ? '出生日期'
              : row?.key == 'email'
              ? '个人邮箱'
              : row?.key == 'teachTime'
              ? '从教开始时间'
              : row?.key == 'authorizedStrengthState'
              ? '编制状态'
              : row?.key == 'authorizedStrengthJoinTime'
              ? '入编时间'
              : row?.key == 'authorizedStrengthType'
              ? '编制类型'
              : row?.key == 'workName'
              ? '工作单位'
              : row?.key == 'organizationUnit'
              ? '编制单位(用工单位)'
              : '隶属集团'
          "
        >
          <!-- {{ row?.value }} -->
          <template #default="scope">
            <!-- {{scope.row[row?.key]  }} -->

            <div v-if="scope.row[row.key].pass">
              {{ scope.row[row.key].value }}
            </div>
            <div v-else>
              <div>{{ scope.row[row.key].value }}</div>
              <div class="colorRed">
                {{ scope.row[row.key].failResult }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>


<script setup>
import * as XLSX from "xlsx";
import { UploadFilled } from "@element-plus/icons-vue";
import { uploadHandler } from "@/utils/filesUpload/qiniuUpload";
import { ElLoading, ElMessage, genFileId } from "element-plus";
import { findByAsyncTaskId, importList, listVerification } from "@/api/roster";
import { downloadFile, getLocalStorage } from "@/utils";
import { asyncTask } from "@/api/apply";
import { downloadFileBySaveAs } from "@/views/backlogList/components/Examine";

const target = ref(false);
const data = reactive({});
const isLoading = ref(true);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const props = defineProps({
  title: {
    type: String,
    default: "导入数据",
  },
});
const emit = defineEmits(["upBack"]);
const fileList = ref([]);

const upload = ref();
const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
//确定
const submit = async () => {
  let data = new FormData();
  data.append("file", file.value);
  let { code, result } = await importList(data);
  console.log(code, result);
  if (code === 0 && result) {
    const { id, complete, success } = result;
    console.log("result: ", result);
    console.log("导入", id, complete, success);
    const { pause, resume, isActive } = useIntervalFn(() => {
      let params = {
        id,
      };
      console.log("params: ", params);
      asyncTask(params).then(async (res) => {
        const { code, result } = res;
        console.log("getAsyncTask- 异步任务", code, result);
        const { id, complete, success, resData } = result;
        console.log(success);
        if (code === 0 && complete) {
          pause();
          if (success) {
            console.log(JSON.parse(resData));
            let uploadlist = JSON.parse(resData)
            let uoloading = uploadlist.result
            ElMessage.success(uploadlist.msg);
            ElMessage({
              message: "Warning, this is a warning message.",
              type: "warning",
            });
            Visible.value = false;
          } else {
            ElMessage.error(JSON.parse(resData).msg);
          }
        }
      });
    }, 1000);
  } else {
    ElMessage.error("导入失败");
  }
  // let list = [];
  // fileList.value.map((item) => {
  //   list.push(item.raw);
  // });
  // console.log(fileList.value);

  // let resArr = await Promise.all(
  //   list.map(async (item) => {
  //     let res = await uploadHandler(item, {});
  //     return res;
  //   })
  // );
  // console.log(resArr);
  // resArr.map((item) => {
  //   item.fileType = checkUrlType(item.url);
  // });
  // emit("upBack", resArr);
  // Visible.value = false;
};

const checking = ref(false);
const checkData = ref([]);
const headerData = ref([]);

const uploadFile = ref();

const checkButton = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "校验中...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  console.log("校验", file.value);
  let data = new FormData();
  data.append("file", file.value);
  let { code, result } = await listVerification(data);
  console.log(code, result);

  if (code === 0 && result) {
    const { id, complete, success } = result;
    console.log("result: ", result);
    console.log("校验", id, complete, success);
    const { pause, resume, isActive } = useIntervalFn(() => {
      let params = {
        id,
      };
      console.log("params: ", params);
      asyncTask(params).then(async (res) => {
        const { code, result } = res;
        console.log("getAsyncTask- 异步任务", code, result);
        const { id, complete, success, resData } = result;
        console.log(success);
        if (code === 0 && complete) {
          pause();
          if (success) {
            ElMessage.success("校验成功");
            isLoading.value = false;
            // loadingExport.value = false;
            // const { fileUrl, fileName } = result;
            // downloadFile(fileUrl, fileName);
            let { code, result = [] } = await findByAsyncTaskId({
              asyncTaskId: id,
            });
            console.log(" 校验成功", code, result);
            headerData.value = result.length > 0 ? result[0] : [];
            checkData.value = result.map((item) => {
              const tempObj = {};
              item.forEach((item2) => {
                tempObj[item2.key] = item2;
              });
              return tempObj;
            });
            console.log("checkData.value", checkData.value);
            checking.value = true;
            loading.close();
          } else {
            ElMessage.error(JSON.parse(resData).msg + ",请重试!");
          }
        }
      });
    }, 1000);
  } else {
    ElMessage.error("导出失败");
  }
};

const uploadPSD = () => {
  console.log("下载模板文件");
  downloadFileBySaveAs(
    "https://rbebag-zy-test.strongwind.cn/zhuji/education/cube/five-educations/01203100037610029758.xlsx",
    "教职工导入模板文件.xlsx"
  );
};

const videoRegex = /\.(mp4|avi|wmv|mov|flv|3gp|ogg)$/i;
const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
const wordRegex = /\.docx?$/i;
const pdfRegex = /\.pdf$/i;
const checkUrlType = (url) => {
  // 使用test方法检查URL是否匹配正则表达式
  if (videoRegex.test(url)) {
    return "VIDEO";
  } else if (imageRegex.test(url)) {
    return "PICTURE";
  } else if (wordRegex.test(url)) {
    return "WORD";
  } else if (pdfRegex.test(url)) {
    return "PDF";
  } else {
    return "OTHER";
  }
};
const Visible = ref(false);

const handleRemove = (file) => {
  fileList.value = fileList.value.filter((f) => f.uid !== file.uid);
};

const file = ref();
const getFileSize = (size) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
};

const isUpload = ref(false);

const uploadChange = (e) => {
  console.log(e);

  file.value = e.raw;
  isUpload.value = true;
  // let v = new FormData();
  // v.append("file", 9999999999);
  // console.log(v);
  // // const file = e.target.files[0]
  // const reader = new FileReader();
  // reader.readAsArrayBuffer(file.value);
  // reader.onload = async (ev) => {
  //   let data = ev.target.result;
  //   console.log(data, "这里是文件流");
  //   const workbook = XLSX.read(data, { type: "binary", cellDates: true });
  //   const wsname = workbook.SheetNames[0];
  //   const getData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
  //   console.log(getData, "899");
  // };

  // //   if (e.status !== 'ready') return   // 防止触发两次
  // //   if (e.length <= 0) {
  // //     ElMessage.warning('请选择文件')
  // //   } else if (e.name.split('.')[1] !== 'xlsx') {
  // //     ElMessage.warning('上传格式不正确，请上传xlsx格式')
  // //   } else {

  // //   }
};
defineExpose({
  add() {
    Visible.value = !Visible.value;
  },
});

onMounted(() => {});
</script>

<style lang="less" scoped>
:deep(.el-dialog__body) {
  display: flex;
  justify-content: space-between;
  padding-top: 0;
}
.upload-demo {
  width: 89%;
}
.el-upload__tip {
  display: flex;
  justify-content: space-between;
  position: relative;
  .el-upload__reigth {
    position: absolute;
    right: 0px;
  }
}

:deep(.el-upload-dragger) {
  padding: 0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-preview {
  width: 100%;
  .preview-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
:deep(.el-table .is-group > :first-child) {
  display: none;
}

.colorRed {
  color: red;
}

:deep(.el-table thead) {
  color: black;
}
:deep(.example-showcase .el-loading-mask) {
  z-index: 999;
}
</style>
