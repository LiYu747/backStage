<template>
  <el-card>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange" v-loading="loading" :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for="(item, index) in headerData" :key="index" :prop="item.prop" :label="item.label">
        <template slot-scope="scope">
          <div>
            <span v-if="item.prop !== 'img' && item.prop !== 'status' && item.prop !== 'operation'">{{
              scope.row[item.prop] }}</span>
            <!-- 如果需要渲染图片 -->
            <div v-else-if="item.prop === 'img'" class="img-box"><el-image :src="scope.row[item.prop]"></el-image></div>
            <!-- 根据状态判断显示颜色 -->
            <span :class="scope.row[item.prop] === '开启' ? 'status-open' : 'status-close'"
              v-else-if="item.prop === 'status'">
              {{ scope.row[item.prop] }}
            </span>
            <el-button-group v-else>
              <el-button type="text" style="margin-right: 15px" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
            </el-button-group>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"></el-pagination>
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps({
  //子组件接收父组件传递过来的值
  info: String,
  List: {
    type: Array,
    default: () => [],
  },
      headerData: {
      type: Array,
      default: () => [],
    },
})
//使用父组件传递过来的值
const { info, List } = toRefs(props)
// export default {
//   props: {
//     tableData: {
//       type: Array,
//       default: () => [],
//     },
//     headerData: {
//       type: Array,
//       default: () => [],
//     },
//     pageNum: {
//       type: Number,
//       default: 1,
//     },
//     pageSize: {
//       type: Number,
//       default: 10,
//     },
//     pageTotal: {
//       type: Number,
//       default: 0,
//     },
//     loading: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   data() {
//     return {};
//   },

//   methods: {
//     handleSelectionChange(val) {
//       console.log(val);
//     },
//     handleEdit(row) {
//       this.$emit('edit', row);
//     },
//     handleDel(row) {
//       this.$emit('del', row);
//     },
//     handleSizeChange(size) {
//       console.log(size);
//     },
//     handleCurrentChange(page) {
//       console.log(page);
//     },
//   },
// };
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}

.buttons {
  margin-bottom: 20px;
  text-align: center;
}

.status-open {
  color: blue;
}

.status-close {
  color: red;
}

.img-box {
  width: 150px;
  height: 50px;
}
</style>
