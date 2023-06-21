<script setup>
import { ref, reactive, onMounted } from 'vue'
onMounted(() => {
    console.log(tableData, "List");
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
    title: {
        type: String
    },
    info: {
        type: String
    },
    //表格标题内容及表头
    tableData: {
        type: Array,
        default: () => [],
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
const { title, info, List, columns, isOperate, isAnnex, tableData } = toRefs(props)
</script>
<template>
    <div class="personal_baseInfo">
        <div class="personal_baseInfo_title">{{ title }}</div>
        <div v-for="(item1, index1) in tableData" :key="index1">
            <div class="info_box">
                <div class="personal_personalInfo_title">{{ item1.info }}</div>
                <div>
                    <el-button @click="Add">新增</el-button>
                    <el-button @click="Submitted">报送</el-button>
                </div>
            </div>
            <div class="personal_table">
                <el-table :data="item1.tableContent" border style="width: 100%">
                    <!-- 表格业务内容列 -->
                    <template v-for="(item, index) in item1.tableHeader" :key="index">
                        <!-- 是否有多个班级 -->
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
                    <el-table-column label="附件" v-if="item1.isAnnex" align="center">
                        <template #default="scope">
                            <el-button link type="primary" @click="Edit(scope.row)">下载</el-button>
                        </template>
                    </el-table-column>
                    <!-- 表格操作列 -->
                    <el-table-column label="操作" v-if="item1.isOperate" align="center">
                        <template #default="scope">
                            <el-button link type="primary" @click="Edit(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="table_page">
                <el-pagination background layout="prev, pager, next" :total="1000" />
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.personal_baseInfo {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 10px;

    .personal_baseInfo_title {
        margin-left: 6px;
        font-size: 20px;
        font-weight: bold;
    }

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
    .table_page{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
}
</style>