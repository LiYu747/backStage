
<template>
  <div>
    <el-dialog v-model="Visible" align-center title="更多筛选条件" width="50%" center>
      <el-input v-model="inputValue" placeholder="" :suffix-icon="Search" @input="search" />
      <div ref="ruleFormRef" class="dialogBox">
        <div v-for="(item,index) in  flag ?  searchResults : selectedData ? arr : selectedData" class="m-t1" :key="index">
          <div class="label m-b1">{{item.label}}</div>
          <div class="flex flex-w">
            <div v-for="(itemC,index) in item.children" class="m-r1" :key="index">
              <el-checkbox v-model="itemC.id" :label="itemC.name" size="large" />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="Visible = false">取消</el-button>
          <el-button type="primary" @click="submit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  USERINFO
} from '../../../utils/filterData.js'
import {
  Search,
} from '@element-plus/icons-vue'
const data = reactive({});
const inputValue = ref('')
const props = defineProps({
  arr: {
    type: Array
  },
  selectedData: {
    type: Array
  }
})
const flag = ref(false)
// watch(() => props.selectedData, (newValue, oldValue) => {
//   console.log('侦听的数据发生变化时执行', newValue, oldValue);
// }, { deep: true });
const emit = defineEmits(['getList'])
const Visible = ref(false)
defineExpose({
  add() {
    Visible.value = !Visible.value
  }
})
const ruleFormRef = ref(null)
// const arr = ref(USERINFO)
const submit = () => {
  let list = []
  props.arr.forEach(item => {
    item.children.forEach(opt => {
      if (opt.id == true) {
        let found = false; // 添加一个变量来标记是否找到相同的 title
        list.forEach((item2) => {
          if (item2.title == item.title) {
            item2.children.push(opt);
            found = true; // 找到了相同的 title
          }
        })
        if (!found) { // 如果没找到相同的 title，就将新的数据添加到 list 中
          list.push({ title: item.title, children: [opt] })
        }
      }
    })
  })
  console.log('list: ', list);
  emit('getList', list)
  Visible.value = !Visible.value
}
const searchResults = ref([]);
//搜索
const search = () => {
  if (inputValue.value !== '') {
    flag.value = true;
    searchResults.value = [];

    props.arr.forEach((item) => {
      let matchedChildren = item.children.filter((item2) => {
        return item2.name.includes(inputValue.value);
      });

      if (matchedChildren.length > 0) {
        let obj = { ...item, children: matchedChildren };
        searchResults.value.push(obj);
      }
    });

    console.log("🚀 ~ searchResults.value:", searchResults.value);
  } else {
    flag.value = false;
  }
};

onMounted(() => { });
</script>


<style lang="less" scoped>
.dialogBox {
  margin-top: 10px;
  width: 100%;
  height: 500px;
  overflow: auto;
}

.dialogBox::-webkit-scrollbar {
  width: 4px;
}

.dialogBox::-webkit-scrollbar-thumb {
  background-color: #d1e1ff;
  border-radius: 2px;
}

:deep(.el-dialog--center) {
  padding: 0 20px;
}

:deep(.el-checkbox) {
  height: 30px;
}

.label {
  font-size: 16px;
}
</style>