<template>
    <div class="">
        <div class="title">{{title}}</div>
        <div class="flex">
            <div v-for="(item,index) in data.option" class="flex al-center m-r1" :key="item.id">
                <span class="m-r1 m-l1">{{item.name}}</span>
                <div class="iptBox" v-if="item.type == 'ipt'">
                    <el-input v-model="item.value" placeholder="" />
                </div>
                <div v-if="item.type == 'opt'">
                    <el-dropdown trigger="click">
                        <div class="el-dropdown-link cur-p flex al-center ju-between">
                            <div class="value">{{item.value}}</div>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <div v-for="items in item.opt" @click="menuAdd(items,index)" :key="items.id">
                                    <el-dropdown-item>{{items}}</el-dropdown-item>
                                </div>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="timeBox" v-if="item.type == 'time'">
                    <el-date-picker v-model="item.value" type="date" placeholder="选择时间" class="cur-p" />
                </div>
            </div>
            <div>
                <el-button type="primary" @click="searchBtn">搜索</el-button>
            </div>
            <div v-if="isOutstanding" class="m-l1">
                <el-button type="primary" @click="batchApproval">批量审批</el-button>
            </div>
        </div>
        <div class="m-t2 ">
            <el-table ref="multipleTableRef" :data="tableData" border empty-text="暂无数据" style="width: 98%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" v-if="isOutstanding" width="40" />
                <el-table-column label="教职工" width="230">
                    <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="流程名称" width="230">
                    <template #default="scope"><span class="cur-p "
                            @click="gotoInfo">{{ scope.row.name }}</span></template>
                </el-table-column>
                <el-table-column header-align="center" align="center"  property="address" label="环节" width="230"
                    show-overflow-tooltip />
                <el-table-column header-align="center" align="center"  property="worker" label="状态" width="180" show-overflow-tooltip />
                <el-table-column header-align="center" align="center"  property="station" label="发送人" width="180"
                    show-overflow-tooltip />
                <el-table-column header-align="center" align="center"  property="group" label="发送时间" width="200"
                    show-overflow-tooltip />
                <el-table-column header-align="center" align="center"  property="organizationUnit" label="审批时间" width="200"
                    show-overflow-tooltip />
                <el-table-column header-align="center" align="center"  label="操作" show-overflow-tooltip>
                    <template #default="scope">
                        <el-button type="primary" v-if="isOutstanding" size="small" @click="examineBtn(scope)">审批</el-button>
                        <el-button type="primary" v-else size="small" @click="editBtn(scope)"> 编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex m-t2 ju-center">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :small="small" :background="background"
                layout="total,  prev, pager, next, jumper" :total="60" 
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script setup>
    import {
        Search,
        ArrowDown,
    } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const props = defineProps({
        title:{
            type:String,
            default:'标题'
        },
        isOutstanding:{ 
            type:Boolean,
            default:false
        }
    })
    //默认第几页
    const currentPage4 = ref(1)
    // 分页器配置
    // 每页显示条目个数
    const pageSize4 = ref(20)
    //第几页
    const page = ref(1)
    const small = ref(false)
    const background = ref(true)
     //点击第几页
     const handleCurrentChange = (val) => {
        console.log(`current page: ${val}`)
    }
    //编辑
    const editBtn = (val) => {
        // console.log(val);
        router.push({ 
            path:"/finisDetails",
            query:{id:0}
        })
    }
    //审批
    const examineBtn = (val) => {
        // console.log(val);
        router.push({ 
            path:"/backlogDetail",
            query:{id:0}
        })
    }
    //批量
    const batchApproval = () => {
        
    }
    //选项选择
    const menuAdd = (item,index) => {
        data.option[index].value = item
    }
    const handleSelectionChange = (item,index) => {

    }
    //搜索
    const searchBtn = () => {
        console.log(data.option);
    }
    const tableData = ref([{
        date: '赵国章(208371)',
        name: '教师离退',
        address: '局管理审批',
        worker: '已完成',
        station: '毛雅婷',
        group: '2023-05-03',
        organizationUnit: '2023-05-10',
        edit: '编辑'
    }, 
    {
        date: '黄荣 (208344)',
        name: '入职',
        address: '局管理审批',
        worker: '已完成',
        station: '毛雅婷',
        group: '2023-05-03',
        organizationUnit: '2023-05-10',
        edit: '编辑'
    },
    {
        date: '俞永梁(107237)',
        name: '长病假', 
        address: '局管理审批',
        worker: '已完成',
        station: '毛雅婷',
        group: '2023-05-03',
        organizationUnit: '2023-05-10',
        edit: '编辑'
    }])
    const data = reactive({
        option: [{
                name: "状态",
                type: "opt",
                value: "全部",
                opt: [
                    '全部',
                    '进行中',
                    '已完成',
                    '被终止',
                    '被拒绝'
                ]
            },
            {
                name: "教职工",
                type: "ipt",
                value: "",
            },
            {
                name: "流程名称",
                type: "opt",
                value: "全部",
                opt: [
                    '全部',
                    '入职',
                    '调动',
                    '借调',
                    '离退',
                    '长病假',
                    '产假'
                ]
            },
            {
                name: "开始时间",
                type: "time",
                value: "",
            },
            {
                name: "结束时间",
                type: "time",
                value: "",
            },
        ]
    });
    onMounted(() => {});
</script>



<style lang="less" scoped>
    .title {
        font-weight: 700;
        font-size: 20px;
        margin: 20px 0;
    }

    .iptBox {
        width: 130px;
    }

    .el-dropdown-link {
        width: 110px;
        padding: 0 10px;
        height: 28px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        display: flex;
    }

    :deep(.el-date-editor) {
        width: 130px;
    }
</style>