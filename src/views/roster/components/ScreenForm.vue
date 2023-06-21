<script setup>
    import {
        USERINFO
    } from '../../../utils/filterData.js'
    import {
        Search,
    } from '@element-plus/icons-vue'
    const data = reactive({});
    const value = ref('')
    const props = defineProps({

    })
    const Visible = ref(false)
    defineExpose({
        add() {
            Visible.value = !Visible.value
        }
    })
    const arr = ref(USERINFO)
    const subitm = () => {
        console.log(arr);
    }
    onMounted(() => {});
</script>
<template>
    <div>
        <el-dialog v-model="Visible" align-center title="更多筛选条件" width="50%" center>
            <el-input v-model="value" placeholder="" :suffix-icon="Search" />
            <div class="dialogBox">
                <div v-for="item in arr" class="m-t1" :key="item.id">
                    <div class="label m-b1">{{item.label}}</div>
                    <div class="flex flex-w">
                        <div v-for="itemC in item.children" class="m-r1" :key="itemC.id">
                            <el-checkbox v-model="itemC.id"  :label="itemC.name" size="large" />
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="Visible = false">取消</el-button>
                    <el-button type="primary" @click="subitm">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>



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

    :deep(.el-checkbox){
        height: 30px;
    }

    .label{
        font-size: 16px;
    }
</style>