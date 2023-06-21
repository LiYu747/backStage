<script setup>
// 表格信息展示
import { ref, reactive, onMounted } from 'vue'
onMounted(() => {
    console.log(List, "List");
})
const Add = () => {
    console.log("新增");
}
const Submitted = () => {
    console.log("报送");
}
const Edit = (value) => {
    console.log(value, "编辑");
}
const props = defineProps({
    //子组件接收父组件传递过来的值
    info: {
        type: String
    },
    // 表头数据
    columns: {
        type: Array,
        default: () => [],
    },
    //表格数据
    List: {
        type: Array,
        default: () => [],
    },
    // 控制操作列是否显示
    isOperate: {
        type: Boolean,
        default: function () {
            return false;
        },
    },
    // 控制附件下载列是否显示
    isAnnex: {
        type: Boolean,
        default: function () {
            return false;
        },
    },
})

//使用父组件传递过来的值
const { info, List, columns,isOperate,isAnnex } = toRefs(props)
</script>


<template>
    <div class="info_box">
        <div class="personal_personalInfo_title">{{ info }}</div>
        <div>
            <el-button @click="Add">新增</el-button>
            <el-button @click="Submitted">报送</el-button>
        </div>
    </div>
    <div class="personal_table">
        <el-table :data="List" border style="width: 100%">
            <!-- 表格业务内容列 -->
            <template v-for="(item, index) in columns" :key="index">
                <el-table-column v-if="item.isClass" :prop="item.prop" :label="item.label" header-align="center"
                    align="center">
                    <template #default="scope">
                        <div class="isClass">
                            <div class="m_r1" v-for="(v, i) in scope.row[item.prop]" :key="i">
                                <el-button type="primary" size="small"> {{ v }}</el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-else :prop="item.prop" :label="item.label" header-align="center" align="center">
                </el-table-column>
            </template>
            <!-- 表格附件下载列 -->
            <el-table-column label="附件" v-if="isAnnex" align="center">
                <template #default="scope">
                    <el-button link type="primary" @click="Edit(scope.row)">下载</el-button>
                </template>
            </el-table-column>
            <!-- 表格操作列 -->
            <el-table-column label="操作" v-if="isOperate" align="center">
                <template #default="scope">
                    <el-button link type="primary" @click="Edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang='less' scoped>
.info_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .personal_personalInfo_title {
        position: relative;
        margin-left: 22px;
        font-size: 16px;
    }

    .personal_personalInfo_title::before {
        position: absolute;
        content: "";
        left: -10px;
        top: 4px;
        width: 3px;
        height: 14px;
        background-color: #666;
    }
}

.personal_table {
    margin-top: 10px;

    .isClass {
        display: flex;

        .m_r1 {
            margin-right: 10px;
        }
    }
}
</style>