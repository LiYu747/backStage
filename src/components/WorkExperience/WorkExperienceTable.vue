<script setup>
import { ref, reactive, onMounted } from 'vue'
import { transitionDate, transitionDateYear, transitionDateMonth } from "@/utils/handleData/handleData.js";//使用封装函数

onMounted(() => {
    // console.log(tableData,"tableData");
})
const tableListData = reactive({
    isShow: false,
    formDate: []
})
const form = ref(null)
const isShowEdit = ref(false)
const dialogType = ref("add")
// const dialogTypes = ref(false)
const content = ref(null)
let index2 = ref(null)
//新增
const Add = (idx, name) => {
    dialogType.value = name
    form.value[idx]?.upLose()
    index2.value = idx
}
const Submitted = () => {
    console.log("报送");
}
//编辑
const Edit = (idx, value,name) => {
    // isShowEdit.value = true
    dialogType.value = name//编辑
    content.value = value//编辑的内容
    // dialogTypes.value = type//控制组件
    form.value[idx]?.upLose()//打开组件
    console.log(value, "编辑");
}
const Download = (value) => {
    console.log(value, "下载");
}
const Upload = (value) => {
    console.log(value, "上传");
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
    // 控制新增按钮是否显示
    isAddBtn: {
        type: Boolean,
        default: function () {
            return true;
        },
    },
})
//使用父组件传递过来的值
const { title, tableData } = toRefs(props)
//默认第几页
const currentPage4 = ref(1)
// 每页显示条目个数
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(true)
const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
}
</script>
<template>
    <div class="personal_baseInfo">
        <div class="personal_baseInfo_title" :id="title">{{ title }}</div>
        <div v-for="(item1, index1) in tableData" :key="index1">
            <div class="info_box">
                <div class="personal_personalInfo_title">{{ item1.info }}</div>
                <div>
                    <el-button v-if="item1.isBtn" @click="Add(index1,'add')">新增</el-button>
                    <el-button @click="Submitted">报送</el-button>
                </div>
            </div>
            <div class="personal_table">
                <el-table :data="item1.tableContent" border>
                    <!-- 表格业务内容列 -->
                    <template v-for="(item, index) in item1.tableHeader" :key="index">
                        <!--是对象 -->
                        <el-table-column v-if="item.opt" :prop="item.prop2" :label="item.label" header-align="center"
                            align="center">
                            <template #default="scope">
                                {{ scope.row[item.prop2]}}
                            </template>
                        </el-table-column>
                        <!-- 是时间(年月日)-->
                        <el-table-column v-else-if="item.time" :prop="item.prop2" :label="item.label" header-align="center"
                            align="center">
                            <template #default="scope">
                                {{ transitionDate(scope.row[item.prop2]) }}
                            </template>
                        </el-table-column>
                        <!-- 是时间(年月)-->
                        <el-table-column v-else-if="item.time2" :prop="item.prop2" :label="item.label" header-align="center"
                            align="center">
                            <template #default="scope">
                                {{ transitionDateMonth(scope.row[item.prop2]) }}
                            </template>
                        </el-table-column>
                        <!-- 是时间(年)-->
                        <el-table-column v-else-if="item.time3" :prop="item.prop2" :label="item.label" header-align="center"
                            align="center">
                            <template #default="scope">
                                {{ transitionDateYear(scope.row[item.prop2]) }}
                            </template>
                        </el-table-column>
                        <!-- 是字符串 -->
                        <el-table-column v-else :prop="item.prop2" :label="item.label" header-align="center" align="center">
                        </el-table-column>
                    </template>
                    <!-- 表格附件下载列 -->
                    <!-- <el-table-column label="下载附件" v-if="item1.isAnnex" align="center">
                        <template #default="scope">
                            <el-button link type="primary" @click="Download(scope.row)">下载</el-button>
                        </template>
                    </el-table-column> -->
                    <!-- 表格附件上传列 -->
                    <!-- <el-table-column label="上传附件" align="center">
                        <template #default="scope">
                            <el-button link type="primary" @click="Upload(scope.row)">上传</el-button>
                        </template>
                    </el-table-column> -->
                    <!-- 表格操作列 -->
                    <el-table-column label="操作" v-if="item1.isOperate" align="center">
                        <template #default="scope">
                            <el-button link type="primary"
                                @click="Edit(index1, scope.row,'edit')">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="table_page">
                <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                    :page-sizes="[5, 10, 15, 20]" :small="small" :background="background"
                    layout="total,  prev, pager, next, jumper" :total="item1.tableContent.length"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <FormList  :dialogType="dialogType" :content="content" :formIndex="index2" :title="item1.info" ref="form" :formHeader="item1.tableHeader" />
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

        // .isObject {
        //     display: flex;

        //     .m_r1 {
        //         margin-right: 10px;
        //     }
        // }
    }

    .table_page {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
}
</style>